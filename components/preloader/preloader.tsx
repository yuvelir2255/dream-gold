"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/brand/logo";

const RING_SRC = "/images/preloader-ring.webp";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const RING_MASK = {
  WebkitMaskImage: `url(${RING_SRC})`,
  maskImage: `url(${RING_SRC})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

/**
 * First-load brand moment, all 2D: the photoreal solitaire (Higgsfield image,
 * background removed) breathes, a gold light sweeps across it (masked to the
 * ring), and it tilts toward the cursor for a hint of depth. A 0→100 counter
 * paces the beat, then a curtain lifts to the hero. Mounted in layout → plays
 * once per full load. prefers-reduced-motion: no motion, a short fade only.
 *
 * fromTo (not from) everywhere so the choreography can't get stuck hidden on
 * React StrictMode's dev double-mount; gsap.context() reverts cleanly between.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const shimmer = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
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
        delay: 0.4,
        onComplete: finish,
      });
      return () => {
        tween.kill();
      };
    }

    const ctx = gsap.context(() => {
      // entrance
      gsap.fromTo(
        glow.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power2.out" },
      );
      gsap.fromTo(
        ring.current,
        { autoAlpha: 0, scale: 0.86, y: 12 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        [logo.current, tagline.current, progress.current],
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.7,
        },
      );

      // gentle breathe
      gsap.to(ring.current, {
        scale: 1.035,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });

      // gold light sweeping across the ring (masked to its shape)
      gsap.fromTo(
        shimmer.current,
        { xPercent: -130 },
        {
          xPercent: 130,
          duration: 2.4,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 1.6,
          delay: 1.6,
        },
      );

      // counter + line, started once the progress row is visible so it reads 0→100
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.1, ease: "power1.inOut", delay: 0.85 },
      );
      const c = { v: 0 };
      gsap.fromTo(
        c,
        { v: 0 },
        {
          v: 100,
          duration: 2.1,
          ease: "power1.inOut",
          delay: 0.85,
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(c.v));
          },
        },
      );
    });

    // cursor parallax — a hint of depth, no full rotation
    const tiltX = gsap.quickTo(ring.current, "rotationY", {
      duration: 0.7,
      ease: "power2.out",
    });
    const tiltY = gsap.quickTo(ring.current, "rotationX", {
      duration: 0.7,
      ease: "power2.out",
    });
    const onMove = (e: PointerEvent) => {
      tiltX((e.clientX / window.innerWidth - 0.5) * 14);
      tiltY((0.5 - e.clientY / window.innerHeight) * 14);
    };
    window.addEventListener("pointermove", onMove);

    const reveal = () => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(
        [ring.current, logo.current, tagline.current, progress.current],
        { autoAlpha: 0, y: -16, duration: 0.55, ease: "power2.in", stagger: 0.05 },
        0,
      ).to(
        overlay.current,
        { yPercent: -100, duration: 1.05, ease: "power4.inOut" },
        "-=0.2",
      );
    };

    let cancelled = false;
    const minTime = new Promise((r) => setTimeout(r, 3200));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([minTime, fonts]).then(() => {
      if (!cancelled) reveal();
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [lenis]);

  if (done) return null;

  return (
    <div
      ref={overlay}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory text-ink shadow-[0_40px_80px_-24px_rgba(26,23,20,0.32)]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      <div
        ref={glow}
        className="pointer-events-none absolute h-[64vmin] w-[64vmin] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(194,163,107,0.26), rgba(194,163,107,0) 70%)",
        }}
      />

      <div className="relative flex flex-col items-center [perspective:1000px]">
        <div
          ref={ring}
          className="relative h-[42vmin] max-h-[360px] w-[42vmin] max-w-[360px] [transform-style:preserve-3d]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RING_SRC}
            alt=""
            aria-hidden
            className="h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(26,23,20,0.22)]"
          />
          {/* gold sweep, clipped to the ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={RING_MASK}
          >
            <span
              ref={shimmer}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 42%, rgba(255,246,222,0.9) 50%, transparent 58%)",
                mixBlendMode: "screen",
              }}
            />
          </span>
        </div>

        <div ref={logo} className="mt-1">
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
