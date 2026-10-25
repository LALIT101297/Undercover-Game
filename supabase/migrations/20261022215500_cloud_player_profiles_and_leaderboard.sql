create table if not exists public.game_player_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Player' check (char_length(display_name) between 1 and 16),
  rounds_played integer not null default 0 check (rounds_played >= 0),
  wins integer not null default 0 check (wins >= 0),
  imposter_wins integer not null default 0 check (imposter_wins >= 0),
  citizen_wins integer not null default 0 check (citizen_wins >= 0),
  updated_at timestamptz not null default now()
);
create table if not exists public.game_round_results (
  round_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  room_code text not null,
  player_name text not null,
  role text not null check (role in ('imposter','citizen')),
  won boolean not null,
  created_at timestamptz not null default now(),
  primary key (round_id, user_id)
);
create index if not exists game_player_profiles_leaderboard_idx
  on public.game_player_profiles (wins desc, rounds_played desc);
create index if not exists game_round_results_user_idx
  on public.game_round_results (user_id, created_at desc);
alter table public.game_player_profiles enable row level security;
alter table public.game_round_results enable row level security;
revoke all on public.game_player_profiles from anon, authenticated;
revoke all on public.game_round_results from anon, authenticated;