"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/brand/logo";

// Canvas is client + WebGL only — keep it out of SSR.
const RingScene = dynamic(() => import("@/components/preloader/ring-scene"), {
  ssr: false,
});

/**
 * First-load brand moment in the site's own palette: a gold ring with a real
 * (refracting) diamond on warm ivory, then a curtain lifts to reveal the hero.
 * The ring auto-spins but can be grabbed and thrown — so the reveal waits while
 * the visitor is interacting (capped, never hangs). Mounted in the root layout →
 * plays once per full page load. prefers-reduced-motion: no spin, short fade.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const interactingRef = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      lenis?.scrollTo(0, { immediate: true });
      setDone(true);
    };

    if (prefersReduced) {
      const tween = gsap.to(overlay.current, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: finish,
      });
      return () => {
        tween.kill();
      };
    }

    if (bar.current) {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.9, ease: "power1.inOut" },
      );
    }

    const reveal = () => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(content.current, {
        autoAlpha: 0,
        y: -16,
        duration: 0.5,
        ease: "power2.in",
      }).to(
        overlay.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        "-=0.15",
      );
    };

    // Reveal after the brand beat + fonts, but not mid-interaction (cap ~7s).
    let cancelled = false;
    const startedAt = performance.now();
    const tryReveal = () => {
      if (cancelled) return;
      const waited = performance.now() - startedAt;
      if (interactingRef.current && waited < 7000) {
        setTimeout(tryReveal, 220);
        return;
      }
      reveal();
    };

    const minTime = new Promise((r) => setTimeout(r, 1900));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([minTime, fonts]).then(() => {
      if (!cancelled) tryReveal();
    });

    return () => {
      cancelled = true;
    };
  }, [lenis]);

  if (done) return null;

  return (
    <div
      ref={overlay}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory text-ink shadow-[0_40px_80px_-24px_rgba(26,23,20,0.3)]"
    >
      {/* warm light that grounds the ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(194,163,107,0.22), rgba(194,163,107,0) 70%)",
        }}
      />

      <div
        ref={content}
        className="relative flex flex-col items-center"
      >
        <div className="h-[46vmin] max-h-[380px] w-[46vmin] max-w-[380px]">
          <RingScene interactingRef={interactingRef} />
        </div>

        <Logo className="mt-2 h-11 w-11 text-ink" />

        <p className="mt-3.5 text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
          Ювелірний дім · Україна
        </p>

        <span className="mt-6 block h-px w-36 overflow-hidden bg-ink/10">
          <span
            ref={bar}
            className="block h-full w-full origin-left scale-x-0 bg-gold"
          />
        </span>
      </div>
    </div>
  );
}
