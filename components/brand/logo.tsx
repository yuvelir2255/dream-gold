type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * Dream Gold wordmark. Rendered as a CSS mask of the vectorised logo so it
 * inherits `currentColor` — set the colour via a text utility (e.g. `text-ink`,
 * `text-gold`, `text-cream`) and the size via width/height (square aspect).
 */
export function Logo({ className, title = "Dream Gold" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/dream-gold-logo.svg)",
        maskImage: "url(/brand/dream-gold-logo.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
