"use client";

import { useInquiry } from "@/components/inquiry/inquiry-provider";

/** Default gold-button styling for the primary «Залишити заявку» CTA. */
export const inquiryCtaClass =
  "inline-flex items-center justify-center bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream";

/**
 * Opens the global inquiry drawer. Drop-in replacement for the old
 * `<a href="#inquiry">` CTAs — pass `className` to match the surface, or rely on
 * the default gold-button look.
 */
export function InquiryCta({
  className = inquiryCtaClass,
  children = "Залишити заявку",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useInquiry();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
