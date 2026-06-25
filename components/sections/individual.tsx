"use client";

import { useReveal } from "@/lib/use-reveal";
import { InquiryCta } from "@/components/inquiry/inquiry-cta";

const STEPS = [
  {
    n: "01",
    title: "Ідея",
    text: "Ви ділитесь задумом — ідея, фото, ескіз чи референс. Ми слухаємо й уточнюємо деталі.",
  },
  {
    n: "02",
    title: "Консультація та ескіз",
    text: "Підбираємо метал, каміння й форму. Готуємо ескіз і 3D-модель майбутньої прикраси.",
  },
  {
    n: "03",
    title: "Виробництво",
    text: "Власна майстерня втілює проєкт: лиття, закріплення каміння, ручне оздоблення та поліювання.",
  },
  {
    n: "04",
    title: "Готовий виріб",
    text: "Передаємо прикрасу з пробою та сертифікатом на камінь. Доставка по Україні та світу.",
  },
];

/**
 * Індивідуальне виготовлення — ядро оффера: зліва закріплений оффер + CTA,
 * справа впорядкований процес із 4 кроків. Нумерація 01–04 несе сенс (реальна
 * послідовність), тому виправдана. Контент видимий за замовчуванням; рух —
 * лише для (prefers-reduced-motion: no-preference).
 */
export function Individual() {
  const root = useReveal(
    (tl) => {
      tl.from("[data-intro]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
      })
        .from(
          "[data-step]",
          { y: 32, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
          "-=0.4",
        )
        .from(
          "[data-step-line]",
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
      id="individual"
      aria-labelledby="individual-heading"
      className="bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Оффер — закріплений на широких екранах */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p
              data-intro
              className="font-display text-base italic text-ink-muted"
            >
              Індивідуальне виготовлення
            </p>

            <h2
              data-intro
              id="individual-heading"
              className="mt-4 text-balance font-display text-h2 leading-[1.1] text-ink"
            >
              Створюємо прикрасу{" "}
              <em className="font-display italic text-gold-deep">
                за вашим задумом
              </em>
            </h2>

            <p
              data-intro
              className="mt-6 max-w-md text-pretty text-lg font-light leading-relaxed text-ink-muted"
            >
              Маєте готову ідею, фото або лише натхнення — ми пройдемо з вами
              весь шлях від першого ескізу до виробу, який ви триматимете в
              руках.
            </p>

            <div
              data-intro
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <InquiryCta className="inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream" />
              <span className="text-sm text-ink-muted">
                Виготовлення — 2–4 тижні
              </span>
            </div>
          </div>

          {/* Процес */}
          <ol className="lg:pt-1">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                data-step
                className="relative grid grid-cols-[auto_1fr] gap-x-6 py-8 sm:gap-x-10"
              >
                {i > 0 && (
                  <span
                    data-step-line
                    aria-hidden
                    className="absolute inset-x-0 top-0 block h-px bg-line"
                  />
                )}
                <span className="font-display text-3xl leading-none text-gold-deep sm:text-4xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-h3 leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-pretty font-light leading-relaxed text-ink-muted">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
