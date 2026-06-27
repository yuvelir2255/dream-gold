import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Gem, Truck } from "lucide-react";
import {
  PRODUCTS,
  getProduct,
  getRelatedProducts,
} from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { InquiryCta, inquiryCtaClass } from "@/components/inquiry/inquiry-cta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Dream Gold`,
    description: product.summary,
    openGraph: { title: product.title, images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(6rem,12vh,9rem)] lg:px-10">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          Каталог
        </Link>

        <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-2">
          {/* sticky на зовнішній обгортці; relative-контейнер усередині —
              інакше Next/Image fill свариться на position:sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:py-2">
            <p className="font-display text-base italic text-ink-muted">
              {product.category}
            </p>

            <h1 className="mt-3 text-balance font-display text-h1 leading-[1.08] text-ink">
              {product.title}
            </h1>

            <p className="mt-6 max-w-md text-pretty text-lg font-light leading-relaxed text-ink-muted">
              {product.summary}
            </p>

            <dl className="mt-9 divide-y divide-line border-y border-line">
              {product.details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="text-sm text-ink-faint">{d.label}</dt>
                  <dd className="text-sm text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <InquiryCta className={inquiryCtaClass}>Замовити схоже</InquiryCta>
              <span className="text-sm text-ink-muted">
                Ескіз і прорахунок — без передоплати
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ink-muted">
              Кожен виріб — індивідуальне замовлення. Втілимо цю модель або вашу
              ідею на її основі — із вашими каменем, металом і розміром.
            </p>

            <ul className="mt-10 grid grid-cols-3 gap-5 border-t border-line pt-8">
              {[
                {
                  icon: BadgeCheck,
                  label: "Проба та клеймо",
                  note: "Державна гарантія",
                },
                {
                  icon: Gem,
                  label: "Сертифікат на камінь",
                  note: "GIA · IGI",
                },
                { icon: Truck, label: "Доставка", note: "Україна та світ" },
              ].map(({ icon: Icon, label, note }) => (
                <li key={label} className="flex flex-col gap-2.5">
                  <Icon className="size-5 text-gold-deep" strokeWidth={1.5} />
                  <span className="text-[13px] leading-snug text-ink">
                    {label}
                  </span>
                  <span className="text-xs leading-snug text-ink-faint">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-[clamp(4rem,9vw,7rem)]">
            <h2 className="font-display text-h2 leading-tight text-ink">
              Інші роботи
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
