"use client";

import { useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import type { Category, Product } from "@/lib/catalog";

type Filter = Category | "Усі";

/**
 * Catalogue grid with client-side category filtering. The page-level
 * RouteTransition fades the whole grid in, so cards stay static here (no GSAP)
 * — instant, jank-free filtering. The middle-column offset (editorial rhythm)
 * only applies to the full set, not to filtered subsets.
 */
export function CatalogGrid({
  products,
  categories,
  authed = false,
  savedSlugs = [],
}: {
  products: Product[];
  categories: Category[];
  authed?: boolean;
  savedSlugs?: string[];
}) {
  const [active, setActive] = useState<Filter>("Усі");
  const filters: Filter[] = ["Усі", ...categories];
  const shown =
    active === "Усі" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "border-ink bg-ink text-ivory"
                  : "border-line text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="mt-[clamp(2rem,5vw,3.5rem)] grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className={active === "Усі" && i % 3 === 1 ? "lg:mt-20" : undefined}
          >
            <ProductCard
              product={p}
              authed={authed}
              saved={savedSlugs.includes(p.slug)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
