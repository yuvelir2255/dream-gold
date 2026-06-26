import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { WishlistButton } from "@/components/catalog/wishlist-button";

/**
 * Editorial product card → product page. The card body is a Link; the wishlist
 * heart sits as a sibling overlay (never nested in the <a>). Hover reveals a
 * scrim + “Детальніше”; on touch the reveal is always shown.
 */
export function ProductCard({
  product,
  saved = false,
  authed = false,
}: {
  product: Product;
  saved?: boolean;
  authed?: boolean;
}) {
  return (
    <div className="group relative">
      <Link
        href={`/catalog/${product.slug}`}
        className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-5 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
            <span className="text-eyebrow font-medium uppercase tracking-[0.18em]">
              Детальніше
            </span>
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-gold-deep">
            {product.title}
          </h3>
          <span className="shrink-0 text-sm text-ink-muted">
            {product.category}
          </span>
        </div>
      </Link>

      <WishlistButton
        slug={product.slug}
        initialSaved={saved}
        authed={authed}
        className="absolute right-3 top-3 size-10 rounded-full bg-ivory/85 text-ink shadow-[0_2px_12px_-4px_rgba(26,23,20,0.4)] backdrop-blur-sm hover:bg-ivory"
      />
    </div>
  );
}
