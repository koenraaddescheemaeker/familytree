-- Drop existing public SELECT policies on base tables
DROP POLICY IF EXISTS "Game scores are publicly viewable" ON public.game_scores;
DROP POLICY IF EXISTS "Leaderboard is publicly viewable" ON public.leaderboard;

-- Create new SELECT policies that only allow users to see their own records with user_id
-- Anonymous users get no access to base tables (they must use the public views)
CREATE POLICY "Users can view their own game scores" 
ON public.game_scores 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own leaderboard entry" 
ON public.leaderboard 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);