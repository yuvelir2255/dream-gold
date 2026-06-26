"use client";

import { useActionState, useState } from "react";
import { Mail } from "lucide-react";
import {
  signInWithGoogle,
  signInWithEmail,
  type EmailAuthState,
} from "@/lib/actions/auth";

const INITIAL: EmailAuthState = { status: "idle" };

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className="size-[18px]">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

/**
 * Sign-in panel for /account when logged out. Mirrors a familiar account layout
 * — one prominent provider button, then "other options" — adapted to our stack:
 * Google OAuth (primary) + passwordless e-mail (magic link). Both flow through
 * /auth/callback.
 */
export function SignIn() {
  const [showEmail, setShowEmail] = useState(false);
  const [state, formAction, pending] = useActionState(signInWithEmail, INITIAL);

  if (state.status === "sent") {
    return (
      <div className="max-w-md" aria-live="polite">
        <h2 className="font-display text-h3 leading-snug text-ink">
          Перевірте пошту
        </h2>
        <p className="mt-3 text-pretty font-light leading-relaxed text-ink-muted">
          Ми надіслали посилання для входу на{" "}
          <span className="text-ink">{state.email}</span>. Відкрийте його на
          цьому пристрої, щоб увійти.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      {/* Primary — Google */}
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 bg-ink px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink/90"
        >
          <GoogleMark />
          Продовжити з Google
        </button>
      </form>

      {/* Other options */}
      {!showEmail ? (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="mt-3 inline-flex w-full items-center justify-center gap-2.5 border border-line px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
        >
          <Mail className="size-4" strokeWidth={1.5} />
          Інші способи входу
        </button>
      ) : (
        <form action={formAction} className="mt-4">
          <label
            htmlFor="signin-email"
            className="text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-muted"
          >
            E-mail
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={state.status === "error"}
            className="mt-2 w-full border-b border-line bg-transparent pb-2 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-gold aria-[invalid=true]:border-destructive"
            placeholder="ваша@пошта.com"
          />
          {state.status === "error" && state.message && (
            <p className="mt-1.5 text-sm text-destructive" aria-live="polite">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 inline-flex w-full items-center justify-center gap-2.5 bg-gold px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-deep hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Надсилаємо…" : "Надіслати посилання для входу"}
          </button>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Надішлемо лист із посиланням — вхід без пароля.
          </p>
        </form>
      )}
    </div>
  );
}
