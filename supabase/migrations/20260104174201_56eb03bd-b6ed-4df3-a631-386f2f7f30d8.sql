-- Fix security definer views by recreating them with security_invoker = true
DROP VIEW IF EXISTS public.leaderboard_public;
DROP VIEW IF EXISTS public.game_scores_public;

-- Recreate leaderboard_public view with SECURITY INVOKER
CREATE VIEW public.leaderboard_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  display_name,
  total_score,
  achievements_count,
  sections_visited,
  updated_at
FROM public.leaderboard;

-- Recreate game_scores_public view with SECURITY INVOKER
CREATE VIEW public.game_scores_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  display_name,
  score,
  difficulty,
  game_type,
  created_at
FROM public.game_scores;

-- Grant SELECT access on views
GRANT SELECT ON public.leaderboard_public TO anon, authenticated;
GRANT SELECT ON public.game_scores_public TO anon, authenticated;