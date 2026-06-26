"use client";

import { useReveal } from "@/lib/use-reveal";
import { InquiryForm } from "@/components/inquiry/inquiry-form";

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

          <div data-reveal>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
