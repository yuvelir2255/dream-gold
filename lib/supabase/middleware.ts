import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth token on every request and writes the rotated
 * cookies back — Server Components can't set cookies, so without this the
 * session desyncs and users get logged out at random.
 *
 * This is a PUBLIC site: we do NOT redirect unauthenticated visitors to a login
 * page here. Protected pages (/account, /wishlist) gate themselves with
 * getUser() and render their own sign-in UI.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Not configured (e.g. env missing on a preview) — skip auth, serve normally.
  if (!url || !key) return supabaseResponse;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do NOT run code between createServerClient and getClaims() — a mistake here
  // logs users out at random. getClaims() is a fast local token check.
  await supabase.auth.getClaims();

  // Return the response unmodified so the refreshed cookies reach the browser.
  return supabaseResponse;
}
