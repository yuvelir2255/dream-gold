create table public.wishlist (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, product_slug)
);

alter table public.wishlist enable row level security;

-- Owner-only: a user sees and manages only their own saved items.
create policy "wishlist_select_own" on public.wishlist
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "wishlist_insert_own" on public.wishlist
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "wishlist_delete_own" on public.wishlist
  for delete to authenticated
  using ((select auth.uid()) = user_id);

comment on table public.wishlist is 'Per-user saved catalogue items (website wishlist).';
