"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page-change choreography for the multi-page shell. Keying the wrapper on the
 * pathname remounts the route subtree on every navigation, replaying the CSS
 * `route-enter` reveal (fade + rise; suppressed under prefers-reduced-motion).
 * On each change we also reset Lenis to the top and refresh ScrollTrigger once
 * the new content has painted, so per-page reveals measure against the right
 * layout instead of the previous page's.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return (
    <div key={pathname} className="route-enter">
      {children}
    </div>
  );
}
