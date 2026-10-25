-- Reconstructed from the live Supabase schema recorded under this migration version.
-- Creates the original online Undercover room and membership tables.
create table if not exists public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique check (room_code ~ '^[0-9]{4}$'),
  host_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'lobby'
    check (status in ('lobby', 'playing', 'result', 'closed')),
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '6 hours')
);

create table if not exists public.game_room_members (
  room_id uuid not null references public.game_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null
    check (char_length(display_name) between 1 and 16),
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create index if not exists game_rooms_expiry_idx
  on public.game_rooms (expires_at);
create index if not exists game_room_members_user_idx
  on public.game_room_members (user_id);

alter table public.game_rooms enable row level security;
alter table public.game_room_members enable row level security;
revoke all on public.game_rooms from anon, authenticated;
revoke all on public.game_room_members from anon, authenticated;
