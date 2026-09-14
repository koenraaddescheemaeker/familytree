-- Add DELETE policy for game_scores table
CREATE POLICY "Users can delete their own game scores"
ON public.game_scores
FOR DELETE
USING (auth.uid() = user_id);

-- Add CHECK constraints for display_name validation on both tables
ALTER TABLE public.game_scores 
ADD CONSTRAINT check_game_scores_display_name_length 
CHECK (length(trim(display_name)) >= 1 AND length(display_name) <= 100);

ALTER TABLE public.leaderboard 
ADD CONSTRAINT check_leaderboard_display_name_length 
CHECK (length(trim(display_name)) >= 1 AND length(display_name) <= 100);