-- Link website leads to the authenticated user who submitted them, so the
-- account can show "my inquiries". Nullable — anonymous submissions stay valid.
alter table public.web_inquiries
  add column user_id uuid references auth.users(id) on delete set null;

-- A signed-in user may read their own inquiries (insert policy unchanged — still
-- anon/authenticated insert-only with length bounds).
create policy "web_inquiries_select_own" on public.web_inquiries
  for select to authenticated
  using ((select auth.uid()) = user_id);
