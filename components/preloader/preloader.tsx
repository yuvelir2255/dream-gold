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

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * First-load brand moment in the site's palette: a gold ring with a real
 * (refracting) diamond on warm ivory, a 0→100 counter, then a curtain lift to
 * the hero. Entrance is choreographed (glow → ring → wordmark/tagline stagger).
 * The ring auto-spins but can be grabbed; the reveal waits while the visitor
 * interacts (capped). Mounted in layout → plays once per full load.
 * prefers-reduced-motion: no spin, no choreography, a short fade only.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const ringBox = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
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
        delay: 0.3,
        onComplete: finish,
      });
      return () => {
        tween.kill();
      };
    }

    // entrance choreography — fromTo (explicit visible end) so it can't get
    // stuck hidden on React StrictMode's double-mount in dev.
    const intro = gsap.timeline();
    intro
      .fromTo(
        glow.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      )
      .fromTo(
        ringBox.current,
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        0.1,
      )
      .fromTo(
        [logo.current, tagline.current, progress.current],
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.55,
      );

    // progress line + 0→100 counter, paced to the brand beat
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.9, ease: "power1.inOut" },
    );
    const count = { v: 0 };
    gsap.to(count, {
      v: 100,
      duration: 1.9,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.round(count.v));
      },
    });

    const reveal = () => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(
        [ringBox.current, logo.current, tagline.current, progress.current],
        { autoAlpha: 0, y: -14, duration: 0.5, ease: "power2.in", stagger: 0.04 },
        0.15,
      ).to(
        overlay.current,
        { yPercent: -100, duration: 0.95, ease: "power4.inOut" },
        "-=0.2",
      );
    };

    // Reveal after the beat + fonts, but not mid-interaction (cap ~7s).
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
      intro.kill();
    };
  }, [lenis]);

  if (done) return null;

  return (
    <div
      ref={overlay}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory text-ink shadow-[0_40px_80px_-24px_rgba(26,23,20,0.32)]"
    >
      {/* film grain */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      {/* warm light that grounds the ring */}
      <div
        ref={glow}
        className="pointer-events-none absolute h-[62vmin] w-[62vmin] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(194,163,107,0.24), rgba(194,163,107,0) 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <div
          ref={ringBox}
          className="h-[46vmin] max-h-[380px] w-[46vmin] max-w-[380px]"
        >
          <RingScene interactingRef={interactingRef} />
        </div>

        <div ref={logo}>
          <Logo className="h-11 w-11 text-ink" />
        </div>

        <p
          ref={tagline}
          className="mt-3.5 text-eyebrow uppercase tracking-[0.32em] text-ink-faint"
        >
          Ювелірний дім · Україна
        </p>

        <div ref={progress} className="mt-7 flex items-center gap-4">
          <span className="block h-px w-40 overflow-hidden bg-ink/10">
            <span
              ref={bar}
              className="block h-full w-full origin-left scale-x-0 bg-gold"
            />
          </span>
          <span
            ref={counter}
            className="w-7 text-right text-[11px] tabular-nums tracking-[0.15em] text-ink-faint"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
