import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/**
 * Supabase client for Client Components (browser). Safe to ship — the
 * publishable/anon key only works through Row Level Security. Used by
 * client-side features (e.g. wishlist) once auth lands.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
