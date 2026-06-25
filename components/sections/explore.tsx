"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

const DOORS = [
  {
    href: "/catalog",
    title: "Каталог",
    text: "Перегляньте вже створені прикраси за категоріями.",
  },
  {
    href: "/individual",
    title: "Індивідуальне виготовлення",
    text: "Втілимо вашу ідею — від першого ескізу до готового виробу.",
  },
  {
    href: "/about",
    title: "Про нас",
    text: "Наша історія, власна майстерня та сертифікати якості.",
  },
];

/**
 * Розділи — editorial-індекс на головній-хабі (великі заголовки + hairline,
 * а не сітка однакових карток). Кожен рядок веде на сторінку-пілар, тому
 * головна лишається короткою, а навігація — очевидною.
 */
export function Explore() {
  const root = useReveal((tl) => {
    tl.from("[data-reveal]", {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
    })
      .from(
        "[data-door]",
        { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.12 },
        "-=0.3",
      )
      .from(
        "[data-door-line]",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.12,
        },
        "<",
      );
  });

  return (
    <section
      ref={root}
      aria-labelledby="explore-heading"
      className="bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-[var(--s-section)] lg:px-10">
        <p
          data-reveal
          id="explore-heading"
          className="font-display text-base italic text-ink-muted"
        >
          Розділи
        </p>

        <ul className="mt-[clamp(1.5rem,4vw,3rem)]">
          {DOORS.map((d, i) => (
            <li key={d.href} data-door className="relative">
              {i > 0 && (
                <span
                  data-door-line
                  aria-hidden
                  className="absolute inset-x-0 top-0 block h-px bg-line"
                />
              )}
              <Link
                href={d.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-8 sm:py-10"
              >
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-tight text-ink transition-colors group-hover:text-gold-deep">
                    {d.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-pretty font-light leading-relaxed text-ink-muted">
                    {d.text}
                  </p>
                </div>
                <ArrowRight
                  className="size-6 shrink-0 text-ink-faint transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-gold-deep"
                  strokeWidth={1.5}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
