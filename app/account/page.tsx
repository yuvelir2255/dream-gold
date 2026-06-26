import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ScrollText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignIn } from "@/components/account/sign-in";
import { signOut } from "@/lib/actions/auth";

export const metadata: Metadata = {
  title: "Кабінет — Dream Gold",
  description: "Особистий кабінет Dream Gold: профіль, мої заявки та збережене.",
  robots: { index: false },
};

const supabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

export default async function AccountPage() {
  let user: { email?: string; name?: string } | null = null;

  if (supabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (authUser) {
      const meta = authUser.user_metadata ?? {};
      user = {
        email: authUser.email,
        name: meta.full_name ?? meta.name ?? undefined,
      };
    }
  }

  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">Кабінет</p>

        {user ? (
          <>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
              Вітаємо{user.name ? `, ${user.name}` : ""}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
              {user.email}
            </p>

            <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
              <AccountCard
                href="#"
                icon={<ScrollText className="size-5" strokeWidth={1.5} />}
                title="Мої заявки"
                note="Тут зʼявляться ваші заявки — незабаром."
                muted
              />
              <AccountCard
                href="/wishlist"
                icon={<Heart className="size-5" strokeWidth={1.5} />}
                title="Збережене"
                note="Прикраси, які ви зберегли."
              />
            </div>

            <form action={signOut} className="mt-10">
              <button
                type="submit"
                className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
              >
                Вийти
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
              Вхід до кабінету
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
              Увійдіть, щоб бачити свої заявки та збережені прикраси.
            </p>

            <div className="mt-[clamp(2.5rem,6vw,4rem)]">
              <SignIn />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function AccountCard({
  href,
  icon,
  title,
  note,
  muted = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  note: string;
  muted?: boolean;
}) {
  const inner = (
    <>
      <span className="text-gold-deep">{icon}</span>
      <span className="mt-4 block font-display text-h3 leading-tight text-ink">
        {title}
      </span>
      <span className="mt-1.5 block text-sm font-light text-ink-muted">
        {note}
      </span>
    </>
  );

  if (muted) {
    return (
      <div className="border border-line bg-cream/40 px-6 py-7 opacity-70">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group border border-line bg-cream/40 px-6 py-7 transition-colors hover:border-gold"
    >
      {inner}
    </Link>
  );
}
