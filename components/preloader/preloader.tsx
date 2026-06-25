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
 * First-load brand moment: a spinning gold ring on warm graphite, then a curtain
 * lifts to reveal the site. Mounted in the root layout, so it plays once per full
 * page load (client-side navigations don't remount it). Scroll is locked while it
 * holds. Under prefers-reduced-motion the 3D + spin are skipped — a short fade only.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
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

    const el = overlay.current;

    if (prefersReduced) {
      const tween = gsap.to(el, {
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
        { scaleX: 1, duration: 1.7, ease: "power1.inOut" },
      );
    }

    let cancelled = false;
    const minTime = new Promise((r) => setTimeout(r, 1800));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([minTime, fonts]).then(() => {
      if (cancelled || !el) return;
      gsap.to(el, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: finish,
      });
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
      className="dark fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="h-[42vmin] max-h-[340px] w-[42vmin] max-w-[340px]">
        <RingScene />
      </div>

      <Logo className="mt-1 h-12 w-12 text-gold" />

      <span className="mt-7 block h-px w-40 overflow-hidden bg-foreground/15">
        <span
          ref={bar}
          className="block h-full w-full origin-left scale-x-0 bg-gold"
        />
      </span>
    </div>
  );
}
