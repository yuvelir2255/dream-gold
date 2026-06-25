"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";
import { ProductCard } from "@/components/catalog/product-card";
import { PRODUCTS } from "@/lib/catalog";

/**
 * Вибрані роботи — editorial-тизер каталогу на головній. Картки ведуть на
 * сторінки виробів (`/catalog/[slug]`), заголовок — у повний каталог. Дані
 * спільні з каталогом (`lib/catalog`). Середня колонка зміщена вниз для ритму.
 */
export function Works() {
  const root = useReveal((tl) => {
    tl.from("[data-reveal]", {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
    }).from(
      "[data-card]",
      { y: 44, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
      "-=0.3",
    );
  });

  return (
    <section
      ref={root}
      id="works"
      aria-labelledby="works-heading"
      className="bg-ivory text-ink"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-[var(--s-section)] lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <h2
            data-reveal
            id="works-heading"
            className="text-balance font-display text-h1 leading-[1.05] text-ink"
          >
            Вибрані роботи
          </h2>
          <div data-reveal className="lg:text-right">
            <p className="max-w-sm text-pretty font-light leading-relaxed text-ink-muted">
              Кожен виріб — індивідуальне замовлення, втілене у власній
              майстерні. Покажемо, що вже створили, — і втілимо вашу ідею.
            </p>
            <Link
              href="/catalog"
              className="group mt-5 inline-flex items-center gap-2 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold-deep"
            >
              Усі роботи
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>

        <ul className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {PRODUCTS.map((p, i) => (
            <li
              key={p.slug}
              data-card
              className={i % 3 === 1 ? "lg:mt-20" : undefined}
            >
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
