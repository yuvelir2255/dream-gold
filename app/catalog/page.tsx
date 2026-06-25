import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { PRODUCTS, getCategoriesWithProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог — Dream Gold",
  description:
    "Каталог авторських ювелірних виробів Dream Gold: каблучки, сережки, браслети, кольє та обручки. Без цін — залиште заявку, втілимо вашу ідею.",
};

export default function CatalogPage() {
  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">Каталог</p>

        <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
          Авторські прикраси
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
          Кожен виріб — індивідуальне замовлення, втілене у власній майстерні.
          Оберіть категорію або перегляньте все — і втілимо вашу ідею.
        </p>

        <div className="mt-[clamp(2.5rem,6vw,4rem)]">
          <CatalogGrid
            products={PRODUCTS}
            categories={getCategoriesWithProducts()}
          />
        </div>
      </div>
    </section>
  );
}
