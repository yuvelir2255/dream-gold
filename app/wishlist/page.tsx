import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { PRODUCTS } from "@/lib/catalog";
import { getWishlist } from "@/lib/wishlist";

export const metadata: Metadata = {
  title: "Збережене — Dream Gold",
  description: "Ваш список збережених прикрас Dream Gold.",
  robots: { index: false },
};

export default async function WishlistPage() {
  const { authed, slugs } = await getWishlist();
  const saved = PRODUCTS.filter((p) => slugs.includes(p.slug));

  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        {authed && saved.length > 0 ? (
          <>
            <p className="font-display text-base italic text-ink-muted">
              Збережене
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
              Список бажаного
            </h1>
            <ul className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {saved.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} authed saved />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <p className="font-display text-base italic text-ink-muted">
              Збережене
            </p>
            <h1 className="mt-4 text-balance text-center font-display text-h1 leading-[1.05] text-ink">
              Список бажаного
            </h1>
            <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-ink-muted">
              {!authed
                ? "Увійдіть, щоб зберігати прикраси та повертатися до них пізніше."
                : "Поки що порожньо. Натискайте ♥ на прикрасах у каталозі — вони зʼявляться тут."}
            </p>
            <Link
              href={!authed ? "/account" : "/catalog"}
              className="mt-9 inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream"
            >
              {!authed ? "Увійти" : "До каталогу"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
