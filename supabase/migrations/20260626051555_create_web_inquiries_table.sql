-- Website lead-capture submissions (separate from the Telegram bot's `orders`).
create table public.web_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  message text not null,
  source text not null default 'website',
  status text not null default 'new',
  delivered_telegram boolean not null default false
);

alter table public.web_inquiries enable row level security;

-- Public website form may INSERT only. No SELECT/UPDATE/DELETE for anon or
-- authenticated, so leads are never readable through the publishable key —
-- the brand reads them via Studio / a service-role admin later.
create policy "web_inquiries_insert" on public.web_inquiries
  for insert to anon, authenticated
  with check (true);

comment on table public.web_inquiries is 'Lead-capture submissions from the public website (separate from the Telegram bot orders).';
