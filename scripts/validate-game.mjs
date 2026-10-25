import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const html = read("android/app/src/main/assets/game.html");
const hub = read("android/app/src/main/assets/app-hub.js");
const edge = read("supabase/functions/undercover-game/index.ts");
const atomicStatsMigration = read("supabase/migrations/20261025004626_atomic_round_stats.sql");

const inlineScripts = [...html.matchAll(/<script\\b[^>]*>([\\s\\S]*?)<\\/script>/gi)]\n  .map((match) => match[1]);
assert.ok(inlineScripts.length, "game.html must contain its game engine");
for (const [index, script] of inlineScripts.entries()) {
  new vm.Script(script, { filename: "game-inline-" + index + ".js" });
}
new vm.Script(hub, { filename: "app-hub.js" });

assert.doesNotMatch(html, /<script[^>]+src="https?:/i, "runtime scripts must be local");
assert.doesNotMatch(html, /<link[^>]+href="https?:/i, "runtime styles/fonts must be local");
assert.ok(html.includes('href="tailwind.min.css"'));
assert.ok(html.includes('src="supabase.min.js"'));
assert.equal((html.match(/window\.supabase\.createClient\(/g) || []).length, 1,
  "only one lazy Supabase client factory call is allowed");
assert.equal((html.match(/signInAnonymously\(/g) || []).length, 1,
  "anonymous sign-in must only occur in the online auth gate");
assert.ok(html.includes("if (onlineAuthPromise) return onlineAuthPromise"));
assert.ok(html.includes("party_games_player_name_v1"));
assert.ok(html.includes("onlineNameInput.value = localStorage.getItem"));
assert.ok(html.includes('id="online-player-name"'));
assert.doesNotMatch(hub, /createClient\(|client\.auth\./,
  "the hub must not initialize a second client or authenticate local play");
assert.ok(hub.includes('showHome(savedPlayerName || "Guest Player")'),
  "offline play must open as guest without requiring a username");
assert.ok(hub.includes("Offline play is available immediately"));
assert.ok(hub.includes('profileNameForm.addEventListener("submit"'),
  "profile name must be editable later from the profile screen");
assert.ok(hub.includes("window.pgHandleBack=function"));
assert.ok(edge.includes('if (copy.status === "playing")'));
assert.doesNotMatch(edge, /userId !== hostId/,
  "host must receive only their own role while a round is active");
assert.ok(edge.includes('.eq("updated_at", room.updated_at)'),
  "room mutations must use optimistic concurrency");
assert.ok(edge.includes('admin.rpc("record_game_round_result"'),
  "round results and profile counters must be written atomically");
assert.match(atomicStatsMigration, /security invoker/i);
assert.match(atomicStatsMigration, /grant execute[\s\S]*to service_role/i);

console.log("Game validation passed: syntax, offline runtime assets, local guest flow, single online auth client, and protected room state.");
