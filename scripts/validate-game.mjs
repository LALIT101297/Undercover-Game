import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const html = read("android/app/src/main/assets/game.html");
const hub = read("android/app/src/main/assets/app-hub.js");
const edge = read("supabase/functions/undercover-game/index.ts");
const atomicStatsMigration = read("supabase/migrations/20261025004626_atomic_round_stats.sql");

const inlineScripts = [...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)]
  .map((match) => match[1])
  .filter((script) => script.trim());
assert.ok(inlineScripts.length, "game.html must contain its game engine");
for (const [index, script] of inlineScripts.entries()) {
  new vm.Script(script, { filename: "game-inline-" + index + ".js" });
}
new vm.Script(hub, { filename: "app-hub.js" });

assert.doesNotMatch(html, /<script[^>]+src="https?:/i, "runtime scripts must be local");
assert.doesNotMatch(html, /<link[^>]+href="https?:/i, "runtime styles/fonts must be local");
assert.match(html, /href="tailwind\\.min\\.css"/);
assert.match(html, /src="supabase\\.min\\.js"/);
assert.equal((html.match(/window\\.supabase\\.createClient\\(/g) || []).length, 1,
  "only one lazy Supabase client factory call is allowed");
assert.equal((html.match(/signInAnonymously\\(/g) || []).length, 1,
  "anonymous sign-in must only occur in the online auth gate");
assert.match(html, /if \\(onlineAuthPromise\\) return onlineAuthPromise/);
assert.match(html, /party_games_player_name_v1/);
assert.match(html, /onlineNameInput\\.value = localStorage\\.getItem/);
assert.match(html, /id="online-player-name"[^>]*maxlength="16"/);
assert.doesNotMatch(hub, /createClient\\(|client\\.auth\\./,
  "the hub must not initialize a second client or authenticate local play");
assert.match(hub, /maxlength=\\\\\"16/);
assert.match(hub, /showHome\\(savedPlayerName \\|\\| "Guest Player"\\)/,
  "offline play must open as guest without requiring a username");
assert.match(hub, /Offline play is available immediately/);
assert.match(hub, /profileNameForm\\.addEventListener\\("submit"/,
  "profile name must be editable later from the profile screen");
assert.match(hub, /window\\.pgHandleBack=function/);
assert.match(edge, /if \\(copy\\.status === "playing"\\)/);
assert.doesNotMatch(edge, /userId !== hostId/,
  "host must receive only their own role while a round is active");
assert.match(edge, /\\.eq\\("updated_at", room\\.updated_at\\)/,
  "room mutations must use optimistic concurrency");
assert.match(edge, /admin\\.rpc\\("record_game_round_result"/,
  "round results and profile counters must be written atomically");
assert.match(atomicStatsMigration, /security invoker/i);
assert.match(atomicStatsMigration, /grant execute[\\s\\S]*to service_role/i);

console.log("Game validation passed: syntax, offline runtime assets, local guest flow, single online auth client, and protected room state.");
