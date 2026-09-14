-- Fix 1: Drop and recreate game_scores_public view with security_invoker
-- This ensures RLS from the base table is respected
DROP VIEW IF EXISTS public.game_scores_public;

CREATE VIEW public.game_scores_public WITH (security_invoker = true) AS
SELECT 
    id,
    display_name,
    score,
    difficulty,
    game_type,
    created_at
FROM public.game_scores;

-- Add a policy on game_scores to allow public SELECT (needed for leaderboard)
CREATE POLICY "Anyone can view game scores for leaderboard"
ON public.game_scores
FOR SELECT
USING (true);

-- Fix 2: Drop the shared_notes_public view entirely
-- This view exposes share_tokens which is a security risk
-- The get_shared_note function already provides secure access to shared notes
DROP VIEW IF EXISTS public.shared_notes_public;