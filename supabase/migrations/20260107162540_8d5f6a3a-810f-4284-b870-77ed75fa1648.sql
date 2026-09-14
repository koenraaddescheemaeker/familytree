-- Add defense-in-depth input validation to check_tts_rate_limit function
CREATE OR REPLACE FUNCTION public.check_tts_rate_limit(p_visitor_id text, p_max_requests integer DEFAULT 10, p_window_minutes integer DEFAULT 60)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_current_count INTEGER;
  v_window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Defense-in-depth input validation (also validated in edge function)
  IF p_visitor_id IS NULL OR length(p_visitor_id) > 100 OR p_visitor_id !~ '^[a-zA-Z0-9_-]+$' THEN
    RAISE EXCEPTION 'Invalid visitor_id format';
  END IF;

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
$function$;