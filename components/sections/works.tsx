"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

const WORKS = [
  {
    img: "ring",
    title: "Перстень, жовте золото",
    cat: "Каблучки",
    alt: "Золотий перстень ручної роботи Dream Gold на теплому мармурі",
  },
  {
    img: "studs",
    title: "Сережки-пусети з діамантом",
    cat: "Сережки",
    alt: "Сережки-пусети з діамантом у класичній закріпці на моделі",
  },
  {
    img: "hoops",
    title: "Сережки, золото з діамантами",
    cat: "Сережки",
    alt: "Золоті сережки з діамантами на тлі травертину",
  },
  {
    img: "bangle",
    title: "Браслет, біле золото",
    cat: "Браслети",
    alt: "Браслет із білого золота з діамантами на зап'ясті моделі",
  },
  {
    img: "bracelet",
    title: "Браслет із перламутром",
    cat: "Браслети",
    alt: "Браслет із білого золота та перламутру на шовку",
  },
  {
    img: "necklace",
    title: "Кольє з перламутром",
    cat: "Кольє",
    alt: "Золоте кольє з перламутровим підвісом на декольте моделі",
  },
];

/**
 * Вибрані роботи — editorial-галерея виробів без цін. Кожна картка веде до
 * форми заявки (CTA «Замовити схоже» у дусі індивідуального виготовлення).
 * Середня колонка зміщена вниз для ритму. Контент видимий за замовчуванням.
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
          <p
            data-reveal
            className="max-w-sm text-pretty font-light leading-relaxed text-ink-muted"
          >
            Кожен виріб — індивідуальне замовлення, втілене у власній майстерні.
            Покажемо, що вже створили, — і втілимо вашу ідею.
          </p>
        </div>

        <ul className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {WORKS.map((w, i) => (
            <li
              key={w.img}
              data-card
              className={i % 3 === 1 ? "lg:mt-20" : undefined}
            >
              <a
                href="#inquiry"
                aria-label={`${w.title} — замовити схоже`}
                className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={`/images/works/${w.img}.jpg`}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-5 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    <span className="text-eyebrow font-medium uppercase tracking-[0.18em]">
                      Замовити схоже
                    </span>
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-gold-deep">
                    {w.title}
                  </h3>
                  <span className="shrink-0 text-sm text-ink-muted">
                    {w.cat}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
