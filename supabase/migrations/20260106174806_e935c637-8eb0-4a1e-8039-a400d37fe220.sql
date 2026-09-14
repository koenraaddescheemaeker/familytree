-- Enable the pg_net extension for HTTP requests from PostgreSQL
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a function that calls the edge function when a new site_update is inserted
CREATE OR REPLACE FUNCTION public.notify_update_subscribers()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  edge_function_url TEXT;
  service_role_key TEXT;
  payload JSONB;
BEGIN
  -- Build the edge function URL
  edge_function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-update-notification';
  
  -- If the setting is not available, use a fallback approach
  IF edge_function_url IS NULL OR edge_function_url = '' THEN
    edge_function_url := 'https://yrcruhjjcoqfvcvhvjum.supabase.co/functions/v1/send-update-notification';
  END IF;
  
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
  -- Using service role key from secrets for authorization
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('supabase.service_role_key', true)
    ),
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

-- Create the trigger on site_updates table
DROP TRIGGER IF EXISTS on_site_update_created ON public.site_updates;

CREATE TRIGGER on_site_update_created
  AFTER INSERT ON public.site_updates
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_update_subscribers();