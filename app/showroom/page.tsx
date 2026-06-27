import type { Metadata } from "next";
import { MapPin, Clock, Send, Phone } from "lucide-react";
import { InquiryCta, inquiryCtaClass } from "@/components/inquiry/inquiry-cta";

export const metadata: Metadata = {
  title: "Шоурум · Харків — Dream Gold",
  description:
    "Шоурум Dream Gold у Харкові. Запрошуємо на зустріч — обрати чи замовити прикрасу особисто. Доставка по Україні та світу.",
};

// Адресу/години публікуємо, щойно надасть власниця — поки що зустрічі за
// попереднім записом, тож сторінка лишається корисною (канали для запису).
const DETAILS = [
  {
    icon: MapPin,
    label: "Адреса",
    value: "Харків",
    note: "Точну адресу та карту оголосимо незабаром.",
  },
  {
    icon: Clock,
    label: "Години",
    value: "За попереднім записом",
    note: "Підберемо зручний час для вашого візиту.",
  },
];

const CHANNELS = [
  {
    href: "https://t.me/IrinaBabii1982",
    icon: Send,
    label: "Telegram",
    value: "@IrinaBabii1982",
  },
  {
    href: "tel:+380672605244",
    icon: Phone,
    label: "Телефон",
    value: "+380 67 260 52 44",
  },
];

export default function ShowroomPage() {
  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">
          Шоурум · Харків
        </p>

        <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
          Завітайте до нашого шоуруму
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
          Запрошуємо на особисту зустріч у Харкові — обрати, поміряти чи
          обговорити майбутню прикрасу наживо. Не з Харкова — доставимо по
          Україні та світу.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <InquiryCta className={inquiryCtaClass}>Записатися на візит</InquiryCta>
          <span className="text-sm text-ink-muted">
            Зустрічі за попереднім записом
          </span>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Деталі візиту */}
          <div>
            <h2 className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-faint">
              Деталі візиту
            </h2>
            <ul className="mt-6 flex flex-col">
              {DETAILS.map((d, i) => {
                const Icon = d.icon;
                return (
                  <li
                    key={d.label}
                    className={i > 0 ? "border-t border-line" : undefined}
                  >
                    <div className="flex items-start gap-4 py-5">
                      <Icon
                        className="mt-0.5 size-5 shrink-0 text-gold-deep"
                        strokeWidth={1.5}
                      />
                      <div className="flex flex-col">
                        <span className="text-eyebrow uppercase tracking-[0.16em] text-ink-faint">
                          {d.label}
                        </span>
                        <span className="mt-1 font-display text-h3 leading-tight text-ink">
                          {d.value}
                        </span>
                        <span className="mt-1 text-sm font-light text-ink-muted">
                          {d.note}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Запис на візит */}
          <div className="lg:pt-1">
            <h2 className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-faint">
              Запис на візит
            </h2>
            <ul className="mt-6 flex flex-col">
              {CHANNELS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.label}
                    className={i > 0 ? "border-t border-line" : undefined}
                  >
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
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">
              Не з Харкова? Оформимо замовлення дистанційно — доставка по Україні
              та світу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
