-- Record each player's round result and profile counters in one transaction.
-- This prevents a successful result insert followed by a failed profile update
-- from permanently losing leaderboard/stat increments.
create or replace function public.record_game_round_result(
  p_round_id uuid,
  p_user_id uuid,
  p_room_code text,
  p_player_name text,
  p_role text,
  p_won boolean
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  inserted_rows integer;
  safe_name text;
begin
  safe_name := left(btrim(regexp_replace(coalesce(p_player_name, 'Player'), '[<>]', '', 'g')), 16);
  if safe_name = '' then
    safe_name := 'Player';
  end if;

  insert into public.game_round_results (
    round_id, user_id, room_code, player_name, role, won
  ) values (
    p_round_id, p_user_id, p_room_code, safe_name, p_role, p_won
  )
  on conflict (round_id, user_id) do nothing;

  get diagnostics inserted_rows = row_count;
  if inserted_rows = 0 then
    return false;
  end if;

  insert into public.game_player_profiles (
    user_id, display_name, rounds_played, wins,
    imposter_wins, citizen_wins, updated_at
  ) values (
    p_user_id,
    safe_name,
    1,
    case when p_won then 1 else 0 end,
    case when p_role = 'imposter' and p_won then 1 else 0 end,
    case when p_role = 'citizen' and p_won then 1 else 0 end,
    now()
  )
  on conflict (user_id) do update set
    rounds_played = public.game_player_profiles.rounds_played + 1,
    wins = public.game_player_profiles.wins + case when excluded.wins > 0 then 1 else 0 end,
    imposter_wins = public.game_player_profiles.imposter_wins + excluded.imposter_wins,
    citizen_wins = public.game_player_profiles.citizen_wins + excluded.citizen_wins,
    updated_at = now();

  return true;
end;
$function$;

revoke all on function public.record_game_round_result(uuid, uuid, text, text, text, boolean)
  from public, anon, authenticated;
grant execute on function public.record_game_round_result(uuid, uuid, text, text, text, boolean)
  to service_role;
