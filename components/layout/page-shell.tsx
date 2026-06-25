import { InquiryCta, inquiryCtaClass } from "@/components/inquiry/inquiry-cta";

type PageShellProps = {
  /** Small italic Playfair label above the title (page name). */
  label: string;
  /** Page H1. */
  title: React.ReactNode;
  /** Optional lede paragraph. */
  intro?: React.ReactNode;
  /** Optional status line shown next to the CTA (e.g. «Повний розділ — незабаром»). */
  note?: string;
  /** Hide the inquiry CTA (e.g. for account / wishlist). */
  hideCta?: boolean;
  /** Extra content rendered under the hero band. */
  children?: React.ReactNode;
};

/**
 * Shared hero band for the route pages while their full content is built out
 * (Этап A → B). Top padding clears the sticky header. Keeps every page on the
 * same editorial system so the skeleton already reads as one site.
 */
export function PageShell({
  label,
  title,
  intro,
  note,
  hideCta = false,
  children,
}: PageShellProps) {
  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
        <p className="font-display text-base italic text-ink-muted">{label}</p>

        <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
          {title}
        </h1>

        {intro && (
          <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
            {intro}
          </p>
        )}

        {!hideCta && (
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <InquiryCta className={inquiryCtaClass} />
            {note && <span className="text-sm text-ink-muted">{note}</span>}
          </div>
        )}

        {hideCta && note && (
          <p className="mt-10 text-sm text-ink-muted">{note}</p>
        )}

        {children}
      </div>
    </section>
  );
}
