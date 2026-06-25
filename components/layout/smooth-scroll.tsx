"use client";

import "lenis/dist/lenis.css";
import type Lenis from "lenis";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth scroll, driven by the GSAP ticker (single RAF loop) and synced
 * with ScrollTrigger. `autoRaf: false` is essential — GSAP owns the loop.
 *
 * The ticker reads the Lenis instance LAZILY every frame instead of capturing it
 * once: with `autoRaf: false` Lenis only advances when `raf()` is called, so if
 * the ref isn't ready at effect time — or Lenis is recreated by HMR / a Strict
 * Mode re-mount — capturing once would leave the live instance undriven and lock
 * scrolling entirely (Lenis still hijacks the wheel). Reading lazily survives all
 * of that and wires the ScrollTrigger sync the moment the instance exists.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let synced: Lenis | null = null;

    const update = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (synced !== lenis) {
        synced?.off("scroll", ScrollTrigger.update);
        lenis.on("scroll", ScrollTrigger.update);
        synced = lenis;
      }
      lenis.raf(time * 1000); // gsap ticker → seconds; lenis.raf → ms
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      synced?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
