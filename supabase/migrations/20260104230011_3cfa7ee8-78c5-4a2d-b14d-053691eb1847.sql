-- Table to track site updates
CREATE TABLE public.site_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_updates ENABLE ROW LEVEL SECURITY;

-- Anyone can read site updates
CREATE POLICY "Anyone can read site updates" 
ON public.site_updates 
FOR SELECT 
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage site updates" 
ON public.site_updates 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Table to track which users have seen which updates (for in-app notifications)
CREATE TABLE public.user_update_reads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  update_id UUID NOT NULL REFERENCES public.site_updates(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, update_id)
);

-- Enable RLS
ALTER TABLE public.user_update_reads ENABLE ROW LEVEL SECURITY;

-- Users can read their own read status
CREATE POLICY "Users can view their own read status" 
ON public.user_update_reads 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can mark updates as read
CREATE POLICY "Users can mark updates as read" 
ON public.user_update_reads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for site_updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_updates;