-- Fix: Remove public SELECT policy on game_scores base table that exposes user_id
-- The game_scores_public view already provides anonymized public access
DROP POLICY IF EXISTS "Anyone can view game scores for leaderboard" ON public.game_scores;