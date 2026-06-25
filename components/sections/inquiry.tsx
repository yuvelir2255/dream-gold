"use client";

import { Send, Phone } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

/**
 * Заявка — конверсійний фінал сторінки на тлі тёплого графіту (рима з
 * маніфестом, що відкриває рух — два темні акценти обрамляють світлу історію).
 * Сюди ведуть усі CTA «Залишити заявку» (#inquiry). Поки бек не підключений,
 * дія справжня: Telegram — основний канал бренду — і телефон. На Кроці 8
 * замінюємо кнопки на форму заявки з валідацією.
 */
export function Inquiry() {
  const root = useReveal(
    (tl) => {
      tl.from(
        "[data-glow]",
        { autoAlpha: 0, scale: 0.92, duration: 1.4, ease: "power2.out" },
        0,
      ).from(
        "[data-reveal]",
        { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
        0.15,
      );
    },
    { start: "top 80%" },
  );

  return (
    <section
      ref={root}
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="dark relative isolate overflow-hidden bg-background text-foreground"
    >
      {/* тепле золоте світло — суто декоративний шар */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[55vmax] w-[55vmax] rounded-full blur-[130px]"
        style={{
          right: "8%",
          bottom: "0%",
          transform: "translate(25%, 35%)",
          background:
            "radial-gradient(closest-side, rgba(194,163,107,0.18), rgba(194,163,107,0) 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-[var(--s-section)] lg:px-10">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <p data-reveal className="font-display text-base italic text-gold">
              Створимо разом
            </p>

            <h2
              data-reveal
              id="inquiry-heading"
              className="mt-4 text-balance font-display text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-foreground"
            >
              Розкажіть про{" "}
              <em className="font-display italic text-gold">вашу ідею</em>
            </h2>

            <p
              data-reveal
              className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted-foreground"
            >
              Надішліть фото, ескіз або просто опишіть задум — ми відповімо,
              підготуємо ескіз і прорахунок вартості. Найшвидше — у Telegram.
            </p>
          </div>

          <div data-reveal className="flex flex-col gap-4 lg:items-end">
            <a
              href="https://t.me/IrinaBabii1982"
              className="group inline-flex w-full items-center justify-center gap-2.5 bg-gold px-8 py-4 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream sm:w-auto"
            >
              <Send
                className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
              Написати в Telegram
            </a>

            <a
              href="tel:+380672605244"
              className="inline-flex w-full items-center justify-center gap-2.5 border border-border px-8 py-4 text-eyebrow font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold sm:w-auto"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              +380 67 260 52 44
            </a>

            <p className="mt-1 text-sm text-muted-foreground lg:text-right">
              Виготовлення — 2–4 тижні · Доставка по світу
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
