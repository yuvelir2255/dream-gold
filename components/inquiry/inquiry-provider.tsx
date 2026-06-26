"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Dialog } from "radix-ui";
import { Send, Phone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";

type InquiryContext = {
  /** Open the global inquiry drawer (any «Залишити заявку» CTA). */
  open: () => void;
  /** Close the drawer. */
  close: () => void;
};

const Ctx = createContext<InquiryContext | null>(null);

export function useInquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useInquiry must be used within <InquiryProvider>");
  }
  return ctx;
}

/**
 * Global inquiry drawer. A single slide-over (Radix Dialog → focus trap, Esc,
 * scroll-lock, a11y) that any CTA opens via `useInquiry().open()`, so the visitor
 * never leaves the page to start a request. Lenis is paused while it owns the
 * viewport. Channels are real now (Telegram is the brand's primary line); the
 * field form lands with the backend (Payload/inquiries).
 */
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const onOpenChange = useCallback(
    (next: boolean) => {
      setIsOpen(next);
      if (next) lenis?.stop();
      else lenis?.start();
    },
    [lenis],
  );

  const value = useMemo<InquiryContext>(
    () => ({ open: () => onOpenChange(true), close: () => onOpenChange(false) }),
    [onOpenChange],
  );

  return (
    <Ctx.Provider value={value}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/55 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
          <Dialog.Content className="dark fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col overflow-y-auto bg-background text-foreground shadow-[0_0_60px_-12px_rgba(0,0,0,0.6)] outline-none duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
            <div className="flex items-center justify-between border-b border-border px-7 py-5">
              <Dialog.Title className="font-display text-xl text-foreground">
                Залишити заявку
              </Dialog.Title>
              <Dialog.Close
                aria-label="Закрити"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-5" strokeWidth={1.5} />
              </Dialog.Close>
            </div>

            <div className="flex flex-1 flex-col px-7 py-9">
              <p className="font-display text-base italic text-gold">
                Створимо разом
              </p>
              <h2 className="mt-3 text-balance font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-[1.1] text-foreground">
                Розкажіть про{" "}
                <em className="font-display italic text-gold">вашу ідею</em>
              </h2>
              <Dialog.Description className="mt-5 text-pretty font-light leading-relaxed text-muted-foreground">
                Опишіть задум — ми відповімо, підготуємо ескіз і прорахунок
                вартості.
              </Dialog.Description>

              <InquiryForm className="mt-8" />

              <div className="mt-auto border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Або напишіть напряму — найшвидше у Telegram:
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="https://t.me/IrinaBabii1982"
                    className="group inline-flex items-center justify-center gap-2.5 border border-border px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <Send
                      className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                    Написати в Telegram
                  </a>
                  <a
                    href="tel:+380672605244"
                    className="inline-flex items-center justify-center gap-2.5 border border-border px-7 py-4 text-eyebrow font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <Phone className="size-4" strokeWidth={1.5} />
                    +380 67 260 52 44
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
