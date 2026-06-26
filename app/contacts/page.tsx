import type { Metadata } from "next";
import { Send, Phone, AtSign } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";

export const metadata: Metadata = {
  title: "Контакти — Dream Gold",
  description:
    "Звʼяжіться з Dream Gold: Telegram, телефон +380 67 260 52 44, Instagram. Залиште заявку — відповімо протягом дня.",
};

const CHANNELS = [
  {
    href: "https://t.me/IrinaBabii1982",
    icon: Send,
    label: "Telegram",
    value: "@IrinaBabii1982",
    note: "Найшвидший спосіб — відповідаємо протягом дня.",
  },
  {
    href: "tel:+380672605244",
    icon: Phone,
    label: "Телефон",
    value: "+380 67 260 52 44",
    note: "Дзвінок або повідомлення.",
  },
  {
    href: "https://instagram.com/dream_gold_jewelry_ukraine",
    icon: AtSign,
    label: "Instagram",
    value: "dream_gold_jewelry_ukraine",
    note: "Більше робіт і процес створення.",
  },
];

export default function ContactsPage() {
  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">Контакти</p>

        <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
          Звʼяжіться з нами
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
          Залиште заявку нижче або напишіть напряму — відповімо протягом дня,
          підготуємо ескіз і прорахунок вартості.
        </p>

        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <InquiryForm />

          <div className="lg:pt-1">
            <h2 className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-faint">
              Напряму
            </h2>

            <ul className="mt-6 flex flex-col">
              {CHANNELS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className={i > 0 ? "border-t border-line" : undefined}>
                    <a
                      href={c.href}
                      className="group flex items-start gap-4 py-5 transition-colors"
                    >
                      <Icon
                        className="mt-0.5 size-5 shrink-0 text-gold-deep"
                        strokeWidth={1.5}
                      />
                      <span className="flex flex-col">
                        <span className="text-eyebrow uppercase tracking-[0.16em] text-ink-faint">
                          {c.label}
                        </span>
                        <span className="mt-1 font-display text-h3 leading-tight text-ink transition-colors group-hover:text-gold-deep">
                          {c.value}
                        </span>
                        <span className="mt-1 text-sm font-light text-ink-muted">
                          {c.note}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">
              Шоурум — Харків. Адресу, години та карту оголосимо незабаром.
              Доставка по Україні та світу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
