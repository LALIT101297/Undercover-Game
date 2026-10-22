# Party Games Online & Offline — Architecture

## Product direction
A colorful, mobile-first party-game hub with online multiplayer and offline Pass & Play. Android remains a WebView application. The current Undercover Imposter implementation is the first playable game and must remain available throughout the migration.

## Application layers

### 1. Shell and navigation
- Authentication entry: email/password sign-in, email/password registration, and anonymous guest mode.
- Game hub: categorized game cards and a shared player identity.
- Navigation: Home, Games, Profile, Friends, and Settings.
- Responsive layout: one mobile-first layout that scales to tablets.

### 2. Shared platform services
- Supabase Auth: registered accounts and anonymous guest sessions.
- Player profile: display name, avatar, account type, created date, and preferences.
- Rooms: room code, host, members, selected game, visibility, status, and timestamps.
- Realtime: presence and game-state broadcasts where appropriate.
- Edge Functions: validate room membership, host permissions, actions, and results.
- Local storage: offline preferences and local-only match history. Never require network access for supported Pass & Play games.

### 3. Game module contract
Each game is an isolated module and owns its rules, setup, round state, rendering, and scoring. Modules use shared services rather than duplicating authentication or room logic.
- id, name, category, minPlayers, maxPlayers
- supportsOffline, supportsOnline
- createInitialState(config, players)
- validateAction(state, playerId, action)
- reduce(state, action)
- getResult(state)
Online actions must be validated server-side for competitive or hidden-information games. A client must not receive another player's private role or secret information before the game rules allow it.

### 4. Initial game catalogue
- Social deduction: Undercover Imposter, Mafia/Werewolf, Spyfall, Hidden Traitor.
- Party and guessing: Two Truths & A Lie, Dumb Charades, Truth or Dare, Quiz Battle.
- Casual competition: Rock Paper Scissors, Word Challenge, Tic Tac Toe, Number Challenge.

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

## Delivery phases
1. Foundation (current): colorful hub, email sign-in/sign-up, guest entry, shared navigation, app label, and existing Undercover integration.
2. Shared platform: durable profile editing, friends, generalized rooms, presence, reconnect handling, and shared leaderboard/stat contracts.
3. Game modules: Mafia/Werewolf and Spyfall first, then party/guessing games, then casual competitive games.
4. Progression: achievements, levels, match history, game-specific leaderboards, and moderation/reporting.
5. Hardening: offline/online regression, multi-device testing, reconnect and race-condition tests, privacy/RLS review, and release builds.

## Non-negotiable constraints
- Preserve the existing Undercover gameplay, Supabase project, Edge Function behavior, and InMobi SDK/ad hooks unless a specific migration is reviewed.
- Keep all changes inside LALIT101297/Undercover-Game; do not modify Apna Social.
- Prefer free-tier services. Verify pricing before enabling anything that could incur a charge.
- Do not claim multiplayer or cross-device behavior is tested until tested on multiple physical devices.