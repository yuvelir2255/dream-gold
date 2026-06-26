drop policy "web_inquiries_insert" on public.web_inquiries;

-- Insert-only for the public form, with sane length bounds (defence-in-depth on
-- top of the server action's validation; also avoids an unbounded payload).
create policy "web_inquiries_insert" on public.web_inquiries
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(contact) between 1 and 200
    and char_length(message) between 1 and 5000
  );
