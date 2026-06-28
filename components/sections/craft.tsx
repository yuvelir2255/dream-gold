"use client";

import Image from "next/image";
import { useReveal } from "@/lib/use-reveal";

const PILLARS = [
  {
    title: "Власне виробництво",
    text: "Повний цикл у власній майстерні: 3D-моделювання, лиття, закріплення каміння та ручне оздоблення.",
  },
  {
    title: "Сертифіковане каміння",
    text: "Натуральні та лабораторні діаманти із сертифікатами GIA та IGI — прозоро й під ваш бюджет.",
  },
  {
    title: "Проби 585 та 750",
    text: "Золото з державною пробою; кожен виріб отримує клеймо та гарантію якості.",
  },
  {
    title: "Сервіс і гарантія",
    text: "Ремонт, чистка та обслуговування виробів. Доставка по Україні та світу.",
  },
];

/**
 * Майстерність — пиллар довіри на сторінці «Про нас». Той самий ритм, що й
 * «Індивідуальне» (закріплений ліворуч заголовок + список праворуч), але без
 * нумерації: тут це не послідовність, а рівноцінні гарантії якості.
 */
export function Craft() {
  const root = useReveal(
    (tl) => {
      tl.from("[data-intro]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
      })
        .from(
          "[data-pillar]",
          { y: 32, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
          "-=0.4",
        )
        .from(
          "[data-pillar-line]",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
            stagger: 0.12,
          },
          "<",
        );
    },
    { start: "top 72%" },
  );

  return (
    <section
      ref={root}
      aria-labelledby="craft-heading"
      className="bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-[var(--s-section)] lg:px-10">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p data-intro className="font-display text-base italic text-ink-muted">
              Майстерність
            </p>

            <h2
              data-intro
              id="craft-heading"
              className="mt-4 text-balance font-display text-h2 leading-[1.1] text-ink"
            >
              Власне виробництво{" "}
              <em className="font-display italic text-gold-deep">
                повного циклу
              </em>
            </h2>

            <p
              data-intro
              className="mt-6 max-w-md text-pretty text-lg font-light leading-relaxed text-ink-muted"
            >
              Від ескізу до клейма проби — кожен етап проходить у власній
              майстерні, під контролем майстрів із багаторічним досвідом.
            </p>

            <div
              data-intro
              className="relative mt-9 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm bg-sand"
            >
              <Image
                src="/images/about/quality.jpg"
                alt="Сертифікований діамант у пінцеті під ювелірною лупою — контроль якості каміння Dream Gold"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="lg:pt-1">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                data-pillar
                className="relative grid grid-cols-1 py-8"
              >
                {i > 0 && (
                  <span
                    data-pillar-line
                    aria-hidden
                    className="absolute inset-x-0 top-0 block h-px bg-line"
                  />
                )}
                <h3 className="font-display text-h3 leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 max-w-xl text-pretty font-light leading-relaxed text-ink-muted">
                  {p.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
