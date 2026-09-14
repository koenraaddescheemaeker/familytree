-- Security fix: authenticate internal webhook calls from database to send-update-notification

-- Needed for cryptographic secret generation and HMAC signing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Store a shared secret inside the database so both the trigger function and the backend function can validate requests
CREATE TABLE IF NOT EXISTS public.webhook_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purpose text NOT NULL UNIQUE,
  secret text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ensure only server-side code (service role) can access it; clients get no access
ALTER TABLE public.webhook_secrets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny client access" ON public.webhook_secrets;
CREATE POLICY "Deny client access"
ON public.webhook_secrets
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Create the secret once (idempotent)
INSERT INTO public.webhook_secrets (purpose, secret)
VALUES ('send_update_notification', encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (purpose) DO NOTHING;

-- Recreate trigger function to include an HMAC signature header
CREATE OR REPLACE FUNCTION public.notify_update_subscribers()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  edge_function_url TEXT;
  payload JSONB;
  v_secret TEXT;
  v_signature TEXT;
BEGIN
  -- Build the backend function URL
  edge_function_url := 'https://yrcruhjjcoqfvcvhvjum.supabase.co/functions/v1/send-update-notification';

  -- Build the webhook payload (stable field order by constructing JSONB explicitly)
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

  -- Load shared secret and sign payload
  SELECT secret INTO v_secret
  FROM public.webhook_secrets
  WHERE purpose = 'send_update_notification'
  LIMIT 1;

  IF v_secret IS NULL THEN
    RAISE WARNING 'Missing webhook secret for send_update_notification; skipping notification for update %', NEW.id;
    RETURN NEW;
  END IF;

  v_signature := encode(hmac(payload::text, v_secret, 'sha256'), 'hex');

  -- Make async HTTP POST request to the backend function
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'X-Webhook-Signature', v_signature
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