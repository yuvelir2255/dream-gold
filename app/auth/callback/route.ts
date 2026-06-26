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
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
