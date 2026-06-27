"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * A trailing accent ring that lags behind the native cursor and swells over
 * interactive targets. The native cursor stays visible — this is an accent, not
 * a replacement, so clicking and form precision are never compromised. Pointer-
 * fine only and fully disabled under reduced motion; renders nothing meaningful
 * on touch (the element is `hidden` until the media query opts it in).
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ring.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 1, autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to(el, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      }
    };

    const interactive = "a, button, [role='button'], input, textarea, select, label, summary";
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement)?.closest?.(interactive);
      gsap.to(el, {
        scale: hit ? 1.9 : 1,
        borderColor: hit ? "rgba(156,127,74,0.75)" : "rgba(156,127,74,0.38)",
        duration: 0.35,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div
      ref={ring}
      aria-hidden
      // Invisible by default (opacity-0) so touch / reduced-motion visitors —
      // where the effect never activates — never see a stray ring parked in the
      // corner. The pointer-fine + motion JS fades it in on first move.
      className="pointer-events-none fixed left-0 top-0 z-[90] size-9 rounded-full border opacity-0 [border-color:rgba(156,127,74,0.38)]"
    />
  );
}
