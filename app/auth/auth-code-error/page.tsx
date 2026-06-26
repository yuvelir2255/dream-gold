import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Помилка входу — Dream Gold",
  robots: { index: false },
};

export default function AuthCodeErrorPage() {
  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[1400px] flex-col items-start justify-center px-6 py-[var(--s-section)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">Кабінет</p>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-h1 leading-[1.05] text-ink">
          Не вдалося завершити вхід
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
          Посилання могло застаріти або вже було використане. Спробуйте увійти ще
          раз.
        </p>
        <Link
          href="/account"
          className="mt-9 inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream"
        >
          Повернутися до входу
        </Link>
      </div>
    </section>
  );
}
