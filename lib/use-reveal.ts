"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealOptions = {
  /** ScrollTrigger `start`. Default `"top 75%"`. */
  start?: string;
  /** Timeline `defaults`, merged over the shared ease + immediateRender. */
  defaults?: gsap.TweenVars;
};

/**
 * Shared scroll-reveal harness. Content is visible by default — motion is added
 * only in the browser and only when the visitor hasn't asked to reduce it. Each
 * section supplies its own choreography through `build`, so the timelines stay
 * distinct while the matchMedia + ScrollTrigger + immediateRender plumbing lives
 * in one place (was copy-pasted across every section).
 *
 * `immediateRender: false` keeps the from-state from applying until the trigger
 * fires; on a hidden tab or headless render (rAF paused) the section therefore
 * stays visible instead of shipping blank. `once: true` plays the reveal a
 * single time. Returns the ref to spread onto the section root.
 */
export function useReveal(
  build: (tl: gsap.core.Timeline) => void,
  options?: RevealOptions,
) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
            immediateRender: false,
            ...options?.defaults,
          },
          scrollTrigger: {
            trigger: root.current,
            start: options?.start ?? "top 75%",
            once: true,
          },
        });

        build(tl);
      });
    },
    { scope: root },
  );

  return root;
}
