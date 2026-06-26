"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function getOrigin(): Promise<string> {
  const h = await headers();
  return (
    h.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

/** Google OAuth — redirects to Google, returns via /auth/callback. */
export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback?next=/account` },
  });

  if (error || !data.url) {
    redirect("/auth/auth-code-error");
  }
  redirect(data.url);
}

export type EmailAuthState = {
  status: "idle" | "sent" | "error";
  message?: string;
  email?: string;
};

/** Passwordless e-mail — sends a magic link that lands on /auth/callback. */
export async function signInWithEmail(
  _prev: EmailAuthState,
  formData: FormData,
): Promise<EmailAuthState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "Вкажіть коректний e-mail." };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/account` },
  });

  if (error) {
    console.error("[auth] signInWithOtp failed", error.message);
    return {
      status: "error",
      message: "Не вдалося надіслати лист. Спробуйте ще раз.",
    };
  }

  return { status: "sent", email };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/account");
}
