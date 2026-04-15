
CREATE TABLE public.page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '/',
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (visitors logging their visit)
CREATE POLICY "Anyone can log a visit"
ON public.page_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No one can read visits from the client (you'll check via Supabase dashboard)
-- No SELECT policy = no public read access
