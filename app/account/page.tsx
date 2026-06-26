import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
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

type Inquiry = {
  id: string;
  created_at: string;
  message: string;
  status: string;
};

const STATUS_LABEL: Record<string, string> = {
  new: "Нова",
  in_progress: "В роботі",
  done: "Виконано",
};

export default async function AccountPage() {
  let user: { email?: string; name?: string } | null = null;
  let inquiries: Inquiry[] = [];

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
      // RLS limits this to the user's own inquiries.
      const { data } = await supabase
        .from("web_inquiries")
        .select("id, created_at, message, status")
        .order("created_at", { ascending: false });
      inquiries = data ?? [];
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
            <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-ink-muted">
              {user.email}
            </p>

            <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
              {/* Мої заявки */}
              <div>
                <h2 className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-faint">
                  Мої заявки
                </h2>

                {inquiries.length === 0 ? (
                  <p className="mt-5 text-pretty font-light leading-relaxed text-ink-muted">
                    Поки що заявок немає. Залиште заявку — і вона зʼявиться тут.
                  </p>
                ) : (
                  <ul className="mt-5">
                    {inquiries.map((q, i) => (
                      <li
                        key={q.id}
                        className={i > 0 ? "border-t border-line" : undefined}
                      >
                        <div className="flex items-start justify-between gap-4 py-5">
                          <div className="min-w-0">
                            <p className="truncate text-pretty text-ink">
                              {q.message}
                            </p>
                            <p className="mt-1 text-sm text-ink-faint">
                              {new Date(q.created_at).toLocaleDateString("uk-UA", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full border border-line px-3 py-1 text-eyebrow uppercase tracking-[0.14em] text-ink-muted">
                            {STATUS_LABEL[q.status] ?? q.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Збережене */}
              <div className="lg:pt-1">
                <h2 className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-faint">
                  Збережене
                </h2>
                <Link
                  href="/wishlist"
                  className="group mt-5 flex items-start gap-4 border border-line bg-cream/40 px-6 py-7 transition-colors hover:border-gold"
                >
                  <Heart className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
                  <span>
                    <span className="block font-display text-h3 leading-tight text-ink">
                      Мої збережені
                    </span>
                    <span className="mt-1.5 block text-sm font-light text-ink-muted">
                      Прикраси, які ви зберегли ♥
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <form action={signOut} className="mt-12">
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
