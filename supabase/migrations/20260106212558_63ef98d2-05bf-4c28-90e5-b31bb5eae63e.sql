-- Fix: Remove Authorization header from trigger since edge function already handles webhook calls without auth
-- This addresses the SECURITY DEFINER reading service role key security concern

CREATE OR REPLACE FUNCTION public.notify_update_subscribers()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  edge_function_url TEXT;
  payload JSONB;
BEGIN
  -- Build the edge function URL
  edge_function_url := 'https://yrcruhjjcoqfvcvhvjum.supabase.co/functions/v1/send-update-notification';
  
  -- Build the webhook payload
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'site_updates',
    'schema', 'public',
    'record', jsonb_build_object(
      'id', NEW.id,
      'title', NEW.title,
      'description', NEW.description,
      'created_at', NEW.created_at,
      'created_by', NEW.created_by
    ),
    'old_record', NULL
  );

  -- Make async HTTP POST request to the edge function
  -- No Authorization header needed since edge function accepts webhook calls
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := payload
  );
  
  RAISE LOG 'Triggered email notification for site update: %', NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the insert
    RAISE WARNING 'Failed to trigger email notification: %', SQLERRM;
    RETURN NEW;
END;
$$;