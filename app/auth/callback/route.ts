import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth code-exchange endpoint. Both Google OAuth and the email magic link return
 * here with a `?code=`; we swap it for a session (cookies) and continue to
 * `next` (the account by default).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Only allow a same-origin absolute path — block //evil.com and /\evil.com
  // (protocol-relative redirects) so the callback can't bounce off-site.
  const rawNext = searchParams.get("next") ?? "/account";
  const next =
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//") &&
    !rawNext.startsWith("/\\")
      ? rawNext
      : "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
