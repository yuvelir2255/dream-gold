import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="bg-sand text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="h-14 w-14 text-ink" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Авторські ювелірні вироби ручної роботи. Власне виробництво в
              Україні.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-ink-muted">
            <span className="mb-2 text-eyebrow uppercase tracking-[0.18em] text-ink-faint">
              Розділи
            </span>
            <Link href="/catalog" className="transition-colors hover:text-ink">
              Каталог
            </Link>
            <Link href="/individual" className="transition-colors hover:text-ink">
              Індивідуальне виготовлення
            </Link>
            <Link href="/about" className="transition-colors hover:text-ink">
              Про нас
            </Link>
            <Link href="/showroom" className="transition-colors hover:text-ink">
              Шоурум · Харків
            </Link>
            <Link href="/contacts" className="transition-colors hover:text-ink">
              Контакти
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm text-ink-muted">
            <span className="mb-2 text-eyebrow uppercase tracking-[0.18em] text-ink-faint">
              Контакти
            </span>
            <a
              href="https://t.me/IrinaBabii1982"
              className="transition-colors hover:text-ink"
            >
              Telegram
            </a>
            <a
              href="tel:+380672605244"
              className="transition-colors hover:text-ink"
            >
              +380 67 260 52 44
            </a>
            <a
              href="https://instagram.com/dream_gold_jewelry_ukraine"
              className="transition-colors hover:text-ink"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-eyebrow uppercase tracking-[0.18em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Dream Gold</span>
          <span>Доставка по Україні та світу</span>
        </div>
      </div>
    </footer>
  );
}
