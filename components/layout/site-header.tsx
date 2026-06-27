"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Heart, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useInquiry } from "@/components/inquiry/inquiry-provider";

const NAV = [
  { label: "Каталог", href: "/catalog" },
  { label: "Індивідуальне", href: "/individual" },
  { label: "Про нас", href: "/about" },
  { label: "Шоурум", href: "/showroom" },
  { label: "Контакти", href: "/contacts" },
];

// Кабінет/Збережене — у десктопі це іконки в шапці (sm:inline-flex), тож на
// мобільному вони доступні лише звідси, у нижній групі бургер-меню.
const ACCOUNT_NAV = [
  { label: "Кабінет", href: "/account", icon: User },
  { label: "Збережене", href: "/wishlist", icon: Heart },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open: openInquiry } = useInquiry();

  // Transparent over the hero, then an ivory/blur bar fades in once scrolled.
  // The bar also restores legibility over the dark sections (#manifesto,
  // #inquiry) — without it the ink-muted nav vanishes on the graphite.
  useLenis(({ scroll }) => setScrolled(scroll > 8));

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-line/70 bg-ivory/80 shadow-[0_1px_30px_-12px_rgba(26,23,20,0.3)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      />
      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <Link href="/" aria-label="Dream Gold — головна" className="text-ink">
          <Logo className="h-11 w-11" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-[13px] tracking-wide transition-colors ${
                isActive(item.href)
                  ? "text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-gold"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/wishlist"
            aria-label="Збережене"
            className="hidden text-ink-muted transition-colors hover:text-ink sm:inline-flex"
          >
            <Heart className="size-5" strokeWidth={1.5} />
          </Link>
          <Link
            href="/account"
            aria-label="Кабінет"
            className="hidden text-ink-muted transition-colors hover:text-ink sm:inline-flex"
          >
            <User className="size-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={openInquiry}
            className="hidden bg-gold px-5 py-2.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream sm:inline-flex"
          >
            Залишити заявку
          </button>
          <button
            type="button"
            aria-label="Відкрити меню"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="text-ink lg:hidden"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <Logo className="h-11 w-11 text-ink" />
            <button
              type="button"
              aria-label="Закрити меню"
              onClick={() => setOpen(false)}
              className="text-ink"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`font-display text-2xl transition-colors ${
                  isActive(item.href) ? "text-gold-deep" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8">
            {ACCOUNT_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex items-center gap-3 text-[15px] tracking-wide transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                <item.icon className="size-5" strokeWidth={1.5} />
                {item.label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openInquiry();
            }}
            className="mt-auto bg-gold px-5 py-4 text-center text-eyebrow font-medium uppercase tracking-[0.18em] text-ink"
          >
            Залишити заявку
          </button>
        </div>
      )}
    </header>
  );
}
