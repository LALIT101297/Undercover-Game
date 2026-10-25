-- Original host lookup index, retained as its own migration for clean installs.
create index if not exists game_rooms_host_idx
  on public.game_rooms (host_id);
