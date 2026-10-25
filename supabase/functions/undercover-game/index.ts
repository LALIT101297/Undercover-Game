import { createClient } from "npm:@supabase/supabase-js@2.57.0";

const URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};
const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: cors });
const clean = (v: unknown, max = 60) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

async function getUser(req: Request) {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("Sign in required");
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new Error("Session expired. Reconnect and try again.");
  return data.user;
}
async function roomFor(code: string) {
  const { data, error } = await admin.from("game_rooms").select("*").eq("room_code", code).gt("expires_at", new Date().toISOString()).maybeSingle();
  if (error || !data) throw new Error("Room not found or expired.");
  return data;
}
async function isMember(roomId: string, userId: string) {
  const { data } = await admin.from("game_room_members").select("display_name").eq("room_id", roomId).eq("user_id", userId).maybeSingle();
  return data;
}
function publicState(state: any, userId: string, _hostId: string) {
  const copy = structuredClone(state);
  if (copy.status === "playing") {
    // The host is a player too: never send every role/word to the host client.
    const isImposter = (copy.imposterIds || []).includes(userId);
    copy.imposterIds = isImposter ? [userId] : [];
    copy.majorityWord = isImposter ? "" : copy.majorityWord;
    copy.imposterWord = isImposter ? copy.imposterWord : "";
  }
  return copy;
}
async function saveRoom(room: any, state: any, status = state.status) {
  // Compare-and-set prevents two devices overwriting a newer room state.
  const { data, error } = await admin.from("game_rooms")
    .update({ state, status, updated_at: new Date().toISOString() })
    .eq("id", room.id)
    .eq("updated_at", room.updated_at)
    .select("id")
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("This room changed on another device. Refresh and try again.");
}
async function finishRound(room: any, state: any) {
  const counts: Record<string, number> = {};
  for (const p of state.players) if (p.voteId) counts[p.voteId] = (counts[p.voteId] || 0) + 1;
  let top = ""; let max = 0;
  for (const [id, count] of Object.entries(counts)) if (count > max) { top = id; max = count; }
  state.topSuspectId = top;
  const caught = (state.imposterIds || []).includes(top);
  for (const p of state.players) {
    const imp = state.imposterIds.includes(p.id);
    if (caught && !imp) p.wins = (p.wins || 0) + 1;
    if (!caught && imp) p.wins = (p.wins || 0) + 1;
  }
  state.status = "result";
  await saveRoom(room, state, "result");
  // Persist each player's result once; the composite key prevents retry duplicates.
  for (const p of state.players) {
    const isImposter = (state.imposterIds || []).includes(p.id);
    const won = isImposter ? !caught : caught;
    const { error: resultError } = await admin.from("game_round_results").insert({
      round_id: state.roundId, user_id: p.id, room_code: room.room_code,
      player_name: p.name, role: isImposter ? "imposter" : "citizen", won
    });
    if (resultError) {
      if (resultError.code === "23505") continue;
      console.error("Could not persist round result", resultError);
      continue;
    }
    const { data: profile } = await admin.from("game_player_profiles")
      .select("display_name,rounds_played,wins,imposter_wins,citizen_wins")
      .eq("user_id", p.id).maybeSingle();
    const { error: profileError } = await admin.from("game_player_profiles").upsert({
      user_id: p.id, display_name: clean(profile?.display_name || p.name, 16) || "Player",
      rounds_played: (profile?.rounds_played || 0) + 1,
      wins: (profile?.wins || 0) + (won ? 1 : 0),
      imposter_wins: (profile?.imposter_wins || 0) + (isImposter && won ? 1 : 0),
      citizen_wins: (profile?.citizen_wins || 0) + (!isImposter && won ? 1 : 0),
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
    if (profileError) console.error("Could not update player profile", profileError);
  }
  return state;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply({ error: "POST required" }, 405);
  try {
    const user = await getUser(req);
    const body = await req.json();
    const action = clean(body.action, 20);
    if (action === "profile") {
      const name = clean(body.name, 16) || "Player";
      const { data: profile, error } = await admin.from("game_player_profiles").upsert({
        user_id: user.id, display_name: name, updated_at: new Date().toISOString()
      }, { onConflict: "user_id" }).select("display_name,rounds_played,wins,imposter_wins,citizen_wins").single();
      if (error) throw error;
      return reply({ profile });
    }
    if (action === "leaderboard") {
      const { data, error } = await admin.from("game_player_profiles")
        .select("display_name,rounds_played,wins,imposter_wins,citizen_wins")
        .gt("rounds_played", 0).order("wins", { ascending: false })
        .order("rounds_played", { ascending: false }).limit(20);
      if (error) throw error;
      return reply({ leaderboard: data || [] });
    }
    if (action === "create") {
      const name = clean(body.name, 16) || "Player";
      await admin.from("game_player_profiles").upsert({ user_id: user.id, display_name: name, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      let roomCode = "";
      for (let i = 0; i < 12; i++) {
        roomCode = String(1000 + Math.floor(Math.random() * 9000));
        const { data } = await admin.from("game_rooms").select("id").eq("room_code", roomCode).maybeSingle();
        if (!data) break;
        roomCode = "";
      }
      if (!roomCode) throw new Error("Could not create a room. Try again.");
      const state = { status: "lobby", players: [{ id: user.id, name, wins: 0, voteId: "" }], clues: [], imposterIds: [], majorityWord: "", imposterWord: "", categoryName: "", imposterCount: 1, topSuspectId: "" };
      const { data: room, error } = await admin.from("game_rooms").insert({ room_code: roomCode, host_id: user.id, state }).select("*").single();
      if (error) throw error;
      const { error: memberError } = await admin.from("game_room_members").insert({ room_id: room.id, user_id: user.id, display_name: name });
      if (memberError) throw memberError;
      return reply({ roomCode, state, isHost: true });
    }
    const code = clean(body.roomCode, 4);
    if (!/^\d{4}$/.test(code)) throw new Error("Enter a valid 4-digit room code.");
    const room = await roomFor(code);
    const member = await isMember(room.id, user.id);
    if (action === "join") {
      if (member) return reply({ roomCode: code, state: publicState(room.state, user.id, room.host_id), isHost: user.id === room.host_id });
      if (room.status !== "lobby") throw new Error("This game has already started.");
      if (room.state.players.length >= 8) throw new Error("Room is full (8 players maximum).");
      const name = clean(body.name, 16) || "Player";
      await admin.from("game_player_profiles").upsert({ user_id: user.id, display_name: name, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      const { error: insertError } = await admin.from("game_room_members").insert({ room_id: room.id, user_id: user.id, display_name: name });
      if (insertError) throw insertError;
      const state = { ...room.state, players: [...room.state.players, { id: user.id, name, wins: 0, voteId: "" }] };
      await saveRoom(room, state, "lobby");
      return reply({ roomCode: code, state: publicState(state, user.id, room.host_id), isHost: false });
    }
    if (!member) throw new Error("You are not a member of this room.");
    const state = room.state;
    if (action === "state") return reply({ roomCode: code, state: publicState(state, user.id, room.host_id), isHost: user.id === room.host_id });
    if (action === "leave") {
      if (room.status === "lobby") {
        await admin.from("game_room_members").delete().eq("room_id", room.id).eq("user_id", user.id);
        const nextPlayers = state.players.filter((p: any) => p.id !== user.id);
        if (user.id === room.host_id || nextPlayers.length === 0) {
          await admin.from("game_rooms").delete().eq("id", room.id);
          return reply({ left: true, closed: true });
        }
        state.players = nextPlayers;
        await saveRoom(room, state, "lobby");
      } else {
        // Keep membership during an active/result round so the same guest can reconnect.
      }
      return reply({ left: true });
    }
    if (action === "start") {
      if (user.id !== room.host_id) throw new Error("Only the host can start the game.");
      if (state.status !== "lobby" || state.players.length < 3) throw new Error("At least 3 players are needed.");
      const majority = clean(body.majorityWord, 40), imposter = clean(body.imposterWord, 40);
      if (!majority || !imposter) throw new Error("Word pair is missing.");
      const count = state.players.length >= 6 && Number(body.imposterCount) === 2 ? 2 : 1;
      const ids = state.players.map((p: any) => p.id).sort(() => Math.random() - 0.5).slice(0, count);
      state.status = "playing"; state.categoryName = clean(body.categoryName, 30) || "MIXED";
      state.imposterCount = count; state.majorityWord = majority; state.imposterWord = imposter;
      state.imposterIds = ids; state.clues = []; state.topSuspectId = "";
      state.roundId = crypto.randomUUID();
      state.players = state.players.map((p: any) => ({ ...p, voteId: "" }));
      await saveRoom(room, state, "playing");
      return reply({ state: publicState(state, user.id, room.host_id), isHost: true });
    }
    if (action === "clue") {
      if (state.status !== "playing") throw new Error("The round is not active.");
      const text = clean(body.text, 60);
      if (!text) throw new Error("Enter a clue first.");
      const player = state.players.find((p: any) => p.id === user.id);
      if (!player) throw new Error("Player not found.");
      state.clues = [...(state.clues || []), { name: player.name, text, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }].slice(-100);
      await saveRoom(room, state, "playing");
      return reply({ state: publicState(state, user.id, room.host_id) });
    }
    if (action === "vote") {
      if (state.status !== "playing") throw new Error("Voting is closed.");
      const player = state.players.find((p: any) => p.id === user.id);
      const target = state.players.find((p: any) => p.id === body.suspectId);
      if (!player || !target) throw new Error("Invalid vote.");
      if (player.voteId) throw new Error("You have already voted.");
      player.voteId = target.id;
      if (state.players.every((p: any) => p.voteId)) await finishRound(room, state);
      else await saveRoom(room, state, "playing");
      return reply({ state: publicState(state, user.id, room.host_id) });
    }
    if (action === "reveal") {
      if (user.id !== room.host_id) throw new Error("Only the host can reveal results.");
      if (state.status !== "playing") throw new Error("No active round to reveal.");
      await finishRound(room, state);
      return reply({ state, isHost: true });
    }
    if (action === "again") {
      if (user.id !== room.host_id) throw new Error("Only the host can start another round.");
      if (state.status !== "result") throw new Error("The previous round is not finished.");
      state.status = "lobby"; state.clues = []; state.imposterIds = []; state.majorityWord = ""; state.imposterWord = ""; state.topSuspectId = "";
      state.players = state.players.map((p: any) => ({ ...p, voteId: "" }));
      await saveRoom(room, state, "lobby");
      return reply({ state, isHost: true });
    }
    throw new Error("Unknown action.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    const status = message.includes("Session") || message.includes("Sign in") ? 401 : 400;
    return reply({ error: message }, status);
  }
});