# Party Games Online & Offline — Architecture

## Product direction
A colorful, mobile-first party-game hub with online multiplayer and offline Pass & Play. Android remains a WebView application. The current Undercover Imposter implementation is the first playable game and must remain available throughout the migration.

## Application layers

### 1. Shell and navigation
- Entry: username-only local guest profile. No email/password screen.
- Online-only identity: anonymous Supabase Auth is initialized only when a player enters online multiplayer.
- Game hub: categorized game cards and a shared player identity.
- Navigation: Home, Games, Profile, Friends, and Settings.
- Responsive layout: one mobile-first layout that scales to tablets.

### 2. Shared platform services
- Supabase Auth: one lazily-created browser client; anonymous sign-in occurs only when online multiplayer is selected. No auth request is part of local game startup.
- Player identity: a local display name stored in party_games_player_name_v1; the same name is copied into the online room field and capped at the database limit of 16 characters.
- Rooms: room code, host, members, status, JSON state, and expiry.
- Online transport: the current Undercover game polls its Edge Function for room state; Realtime subscriptions are not currently implemented.
- Edge Functions: validate user identity, room membership, host permissions, actions, and results. The host receives only their own private role during an active round.
- Local storage: player name and local game progress. Supported Pass & Play games must not require network access.

### 3. Game module contract
Each game is an isolated module and owns its rules, setup, round state, rendering, and scoring. Modules use shared services rather than duplicating authentication or room logic.
- id, name, category, minPlayers, maxPlayers
- supportsOffline, supportsOnline
- createInitialState(config, players)
- validateAction(state, playerId, action)
- reduce(state, action)
- getResult(state)
Online actions must be validated server-side for competitive or hidden-information games. A client must not receive another player's private role or secret information before the game rules allow it.

### 4. Approved game catalogue and roadmap

#### First release — approved games
1. Undercover Imposter (existing; preserve current implementation).
2. Mafia / Werewolf.
3. Spyfall.
4. Dumb Charades.
5. Quiz Battle.
6. Rock Paper Scissors.
7. Tic Tac Toe.
8. Pictionary (Skribbl-style: one player draws while others guess in real time).
9. Bollywood Music Quiz (Indian music focus; Bollywood is the priority).
10. Bollywood Dialogue Challenge (guess the film or actor from a famous dialogue).
11. 20 Questions (yes/no questions to identify a hidden person, place, or thing).
12. Name Place Animal Thing / Stop (shared letter, timed category answers, scoring).
13. Who Am I? (players ask questions to identify the character/name assigned to them).

#### Future candidates — not part of the first-release commitment
- Word Chain / Word Bomb.
- Antakshari.
- Memory Match (card-flipping memory game).
- Ludo.
- Snakes & Ladders.
- Connect 4.
- Number Challenge.

#### Explicitly not selected
- Two Truths & A Lie.
- Truth or Dare.
- Emoji Quiz.
- Would You Rather.
- Never Have I Ever.

#### Music content and rights
The Bollywood Music Quiz should prioritize recognizable Hindi film music and North-Indian audience relevance. Do not bundle or stream copyrighted song recordings without the required rights. Prefer licensed music sources or a rights-cleared content pack; until then, build the quiz around legally usable text clues, trivia, and metadata.

## Offline solo play and bot opponents

Bot opponents are a supported product feature, but not a requirement for every game. Where feasible, a player should be able to start an offline solo match against one or more local bots without signing in or using the network. Bots must run on-device; do not depend on a hosted AI API for offline play.

### Recommended bot support by game
- Strong fit for solo bots: Tic Tac Toe, Rock Paper Scissors, Ludo, Snakes & Ladders, Memory Match, Quiz Battle, 20 Questions, Name Place Animal Thing / Stop, Bollywood Music Quiz, and Bollywood Dialogue Challenge.
- Possible with a designed single-player format: Dumb Charades (offline prompt/round host), Who Am I? (offline clue/host mode), and Pictionary (curated bot-drawn prompts or a solo drawing-and-guessing challenge; drawing recognition is not required for the first version).
- Advanced / later experiment: Undercover Imposter, Mafia/Werewolf, and Spyfall. These require believable hidden-role decisions and carefully isolated private information; do not promise them for the first bot release.

### Bot design principles
- Offer selectable difficulty where it makes sense (Easy, Medium, Hard); use deterministic rules, local question banks, and lightweight heuristics rather than cloud AI.
- Bots should have distinct names/avatars and sensible turn timing, but must never pretend to be human players in online rooms.
- Keep solo bot matches separate from online multiplayer stats/leaderboards unless explicitly labelled and balanced.
- Support offline play with no network permission dependency after game assets and question packs are installed.
- Support bots in both offline solo matches and online rooms where the specific game supports it (for example, a room can contain human players plus bot seats). The room host can add/remove bots and select difficulty before the match starts; bots must be clearly labelled as bots.
- Online bots must be controlled by trusted server-side game logic or validated server actions, not arbitrary client scripts. Never let a bot reveal hidden roles, secret words, or answers early.
- Keep bot availability game-specific. If a game cannot support fair or believable online bots, show the bot option only in offline mode for that game.
- Build and test bot behavior game-by-game; never expose hidden answers or private roles to the player before rules allow them.

## Data model direction
Reuse the existing Undercover tables and Edge Function until their responsibilities are deliberately generalized. Add shared tables in a separately reviewed migration:
- player_profiles
- friendships
- game_rooms
- game_room_members
- game_sessions
- game_round_results (generalize with game_id only after existing Undercover reads/writes are migrated safely)
- player_game_stats
- player_achievements
Use UUID primary keys, foreign keys to auth.users, timestamps, constrained status values, indexes on room codes and membership lookups, and row-level security. Never expose service-role credentials in the app.

## Current implementation notes
- game.html owns the Undercover engine and lazily creates the only Supabase client when online mode is used.
- app-hub.js owns the username-only local hub and must not create Supabase clients or sign users in.
- Android builds package a pinned Supabase UMD bundle and Tailwind-generated CSS into app assets; the installed app must not fetch runtime scripts, fonts, or styles from a CDN.
- The room Edge Function uses updated_at compare-and-set writes to reject stale concurrent mutations.
- Database migration files must use the exact version identifiers already recorded in the linked Supabase project.

## Delivery phases
1. Foundation (current): colorful hub, username-only local entry, offline-first startup, shared navigation, packaged WebView dependencies, and existing Undercover integration.
2. Shared platform: durable profile editing, friends, generalized rooms, presence, reconnect handling, and shared leaderboard/stat contracts.
3. Game modules: preserve and regression-test Undercover first; then Mafia/Werewolf and Spyfall; then Pictionary and other party/guessing modules; then Bollywood Music Quiz, Bollywood Dialogue Challenge, 20 Questions, Stop, and Who Am I?; then casual competitive games. Ship each module only after its online/offline modes and multi-device behavior are tested.
4. Progression: achievements, levels, match history, game-specific leaderboards, and moderation/reporting.
5. Hardening: offline/online regression, multi-device testing, reconnect and race-condition tests, privacy/RLS review, and release builds.

## Non-negotiable constraints
- Preserve the existing Undercover gameplay, Supabase project and data, Edge Function contract, and InMobi SDK/ad hooks. Any backend schema change must have a reviewed, version-aligned migration.
- Keep all changes inside LALIT101297/Undercover-Game; do not modify Apna Social.
- Prefer free-tier services. Verify pricing before enabling anything that could incur a charge.
- Do not claim multiplayer or cross-device behavior is tested until tested on multiple physical devices.