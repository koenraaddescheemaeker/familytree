-- Create table for TTS rate limiting
CREATE TABLE public.tts_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_tts_rate_limits_visitor_window ON public.tts_rate_limits (visitor_id, window_start);

-- Enable RLS
ALTER TABLE public.tts_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow insert and select for anon and authenticated users (edge function uses service role)
CREATE POLICY "Allow edge function access" ON public.tts_rate_limits
  FOR ALL USING (true) WITH CHECK (true);

-- Function to check and update rate limit (10 requests per hour for anonymous users)
CREATE OR REPLACE FUNCTION public.check_tts_rate_limit(p_visitor_id TEXT, p_max_requests INTEGER DEFAULT 10, p_window_minutes INTEGER DEFAULT 60)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_count INTEGER;
  v_window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  v_window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Get current request count in window
  SELECT COALESCE(SUM(request_count), 0) INTO v_current_count
  FROM public.tts_rate_limits
  WHERE visitor_id = p_visitor_id
    AND window_start > v_window_start;
  
  -- Check if limit exceeded
  IF v_current_count >= p_max_requests THEN
    RETURN FALSE;
  END IF;
  
  -- Insert new request record
  INSERT INTO public.tts_rate_limits (visitor_id, request_count, window_start)
  VALUES (p_visitor_id, 1, now());
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Cleanup old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.tts_rate_limits
  WHERE window_start < now() - INTERVAL '2 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;