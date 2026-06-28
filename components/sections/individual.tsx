"use client";

import Image from "next/image";
import { useReveal } from "@/lib/use-reveal";
import { InquiryCta } from "@/components/inquiry/inquiry-cta";

const STEPS = [
  {
    n: "01",
    title: "Ідея",
    text: "Ви ділитесь задумом — ідея, фото, ескіз чи референс. Ми слухаємо й уточнюємо деталі.",
    image: "/images/process/sketch.jpg",
    alt: "Ескіз каблучки олівцем на папері — перший етап роботи над прикрасою Dream Gold",
  },
  {
    n: "02",
    title: "Консультація та ескіз",
    text: "Підбираємо метал, каміння й форму. Готуємо ескіз і 3D-модель майбутньої прикраси.",
    image: "/images/process/model.jpg",
    alt: "Воскова модель каблучки та її 3D-модель на екрані — підготовка до виробництва",
  },
  {
    n: "03",
    title: "Виробництво",
    text: "Власна майстерня втілює проєкт: лиття, закріплення каміння, ручне оздоблення та поліювання.",
    image: "/images/process/setting.jpg",
    alt: "Майстер закріплює камінь у золоту каблучку у власній майстерні Dream Gold",
  },
  {
    n: "04",
    title: "Готовий виріб",
    text: "Передаємо прикрасу з пробою та сертифікатом на камінь. Доставка по Україні та світу.",
    image: "/images/process/finished.jpg",
    alt: "Готова золота каблучка з діамантом на льоні, поряд коробка та сертифікат",
  },
];

/**
 * Індивідуальне виготовлення — ядро оффера. Зверху оффер + CTA, нижче процес із
 * 4 кроків, кожен — у парі з фотографією етапу (чергуються боки на десктопі).
 * Нумерація 01–04 несе сенс (реальна послідовність), тому виправдана. Контент
 * видимий за замовчуванням; рух — лише для (prefers-reduced-motion: no-preference).
 */
export function Individual() {
  const root = useReveal(
    (tl) => {
      tl.from("[data-intro]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
      }).from(
        "[data-step]",
        { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.14 },
        "-=0.3",
      );
    },
    { start: "top 75%" },
  );

  return (
    <section
      ref={root}
      id="individual"
      aria-labelledby="individual-heading"
      className="bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        {/* Оффер */}
        <div className="max-w-2xl">
          <p data-intro className="font-display text-base italic text-ink-muted">
            Індивідуальне виготовлення
          </p>

          {/* h1 — page heading on /individual (visual size kept at text-h2). */}
          <h1
            data-intro
            id="individual-heading"
            className="mt-4 text-balance font-display text-h1 leading-[1.08] text-ink"
          >
            Створюємо прикрасу{" "}
            <em className="font-display italic text-gold-deep">
              за вашим задумом
            </em>
          </h1>

          <p
            data-intro
            className="mt-6 text-pretty text-lg font-light leading-relaxed text-ink-muted"
          >
            Маєте готову ідею, фото або лише натхнення — ми пройдемо з вами весь
            шлях від першого ескізу до виробу, який ви триматимете в руках.
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

        {/* Процес — фото + текст, чергуються боки */}
        <ol className="mt-[clamp(3.5rem,9vw,7rem)] flex flex-col gap-[clamp(3rem,7vw,6rem)]">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              data-step
              className="grid items-center gap-x-12 gap-y-7 lg:grid-cols-2"
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-sm bg-sand ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="font-display text-4xl leading-none text-gold-deep">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-h2 leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3.5 max-w-md text-pretty text-lg font-light leading-relaxed text-ink-muted">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
