-- Create anonymized view for leaderboard (excludes user_id)
CREATE OR REPLACE VIEW public.leaderboard_public AS
SELECT 
  id,
  display_name,
  total_score,
  achievements_count,
  sections_visited,
  updated_at
FROM public.leaderboard;

-- Create anonymized view for game_scores (excludes user_id)
CREATE OR REPLACE VIEW public.game_scores_public AS
SELECT 
  id,
  display_name,
  score,
  difficulty,
  game_type,
  created_at
FROM public.game_scores;

-- Grant SELECT access on views to anonymous and authenticated users
GRANT SELECT ON public.leaderboard_public TO anon, authenticated;
GRANT SELECT ON public.game_scores_public TO anon, authenticated;