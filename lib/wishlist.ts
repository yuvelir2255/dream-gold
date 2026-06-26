import { createClient } from "@/lib/supabase/server";

/**
 * Current user's saved product slugs (RLS owner-scoped). Cheap for guests: a
 * local token check (getClaims, no network) short-circuits before any DB call,
 * so the public home/catalog stay fast. Only signed-in users hit the wishlist
 * query — and RLS already scopes it to their own rows.
 */
export async function getWishlist(): Promise<{
  authed: boolean;
  slugs: string[];
}> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { authed: false, slugs: [] };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return { authed: false, slugs: [] };

  const { data: rows } = await supabase.from("wishlist").select("product_slug");
  return { authed: true, slugs: (rows ?? []).map((r) => r.product_slug) };
}
