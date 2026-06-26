"use client";

import { useActionState, useId } from "react";
import { Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/lib/actions/inquiry";

const INITIAL: InquiryState = { status: "idle" };

const TELEGRAM_HREF = "https://t.me/IrinaBabii1982";

const fieldClass =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold aria-[invalid=true]:border-destructive";
const labelClass =
  "text-eyebrow font-medium uppercase tracking-[0.16em] text-muted-foreground";
const errorClass = "mt-1.5 text-sm text-destructive";

/**
 * Lead-capture form. Shared by the inquiry drawer, the page-bottom #inquiry band
 * and /contacts — semantic tokens (foreground / border / muted) let it sit on
 * the dark drawer and the light contacts page unchanged. Submits to the
 * `submitInquiry` server action (delivers to the brand's Telegram). Field ids
 * are scoped with useId so multiple instances can coexist on one page.
 */
export function InquiryForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(submitInquiry, INITIAL);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const errId = (name: string) => `${uid}-${name}-err`;

  if (state.status === "success") {
    return (
      <div className={className} aria-live="polite">
        <p className="font-display text-base italic text-gold">Дякуємо!</p>
        <h3 className="mt-3 font-display text-h3 leading-snug text-foreground">
          Ми отримали вашу заявку
        </h3>
        <p className="mt-3 text-pretty font-light leading-relaxed text-muted-foreground">
          Звʼяжемося з вами найближчим часом, підготуємо ескіз і прорахунок
          вартості. Маєте фото чи ескіз — надішліть нам у Telegram.
        </p>
        <a
          href={TELEGRAM_HREF}
          className="group mt-6 inline-flex items-center gap-2.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-deep"
        >
          <Send className="size-4" strokeWidth={1.5} />
          Написати в Telegram
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className={className} noValidate>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Імʼя
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={state.fieldErrors?.name ? errId("name") : undefined}
            className={fieldClass}
            placeholder="Як до вас звертатися"
          />
          {state.fieldErrors?.name && (
            <p id={errId("name")} className={errorClass}>
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("contact")} className={labelClass}>
            Телефон або Telegram
          </label>
          <input
            id={id("contact")}
            name="contact"
            type="text"
            autoComplete="tel"
            required
            defaultValue={state.values?.contact}
            aria-invalid={!!state.fieldErrors?.contact}
            aria-describedby={
              state.fieldErrors?.contact ? errId("contact") : undefined
            }
            className={fieldClass}
            placeholder="+380 … або @username"
          />
          {state.fieldErrors?.contact && (
            <p id={errId("contact")} className={errorClass}>
              {state.fieldErrors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("message")} className={labelClass}>
            Ваша ідея
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            required
            defaultValue={state.values?.message}
            aria-invalid={!!state.fieldErrors?.message}
            aria-describedby={
              state.fieldErrors?.message ? errId("message") : undefined
            }
            className={`${fieldClass} resize-none`}
            placeholder="Тип виробу, метал, каміння, орієнтовний бюджет чи дата — будь-які деталі."
          />
          {state.fieldErrors?.message && (
            <p id={errId("message")} className={errorClass}>
              {state.fieldErrors.message}
            </p>
          )}
        </div>

        {/* Honeypot — offscreen, hidden from real users and assistive tech. */}
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Компанія
            <input name="company" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {state.status === "error" && state.message && (
          <p className="text-sm text-destructive" aria-live="polite">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2.5 bg-gold px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send
            className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
          {pending ? "Надсилаємо…" : "Надіслати заявку"}
        </button>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Натискаючи «Надіслати», ви погоджуєтесь, що ми звʼяжемося з вами щодо
          заявки. Виготовлення — 2–4 тижні · Доставка по світу.
        </p>
      </div>
    </form>
  );
}
