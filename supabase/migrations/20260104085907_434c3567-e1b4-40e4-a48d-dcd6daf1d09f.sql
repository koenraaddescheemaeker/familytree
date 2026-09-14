-- Create a table for game-specific high scores
CREATE TABLE public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  game_type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_game_scores_game_type ON public.game_scores(game_type);
CREATE INDEX idx_game_scores_score ON public.game_scores(score DESC);

-- Enable Row Level Security
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Leaderboard is publicly viewable
CREATE POLICY "Game scores are publicly viewable" 
ON public.game_scores 
FOR SELECT 
USING (true);

-- Users can create their own scores
CREATE POLICY "Users can create their own game scores" 
ON public.game_scores 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own scores
CREATE POLICY "Users can update their own game scores" 
ON public.game_scores 
FOR UPDATE 
USING (auth.uid() = user_id);