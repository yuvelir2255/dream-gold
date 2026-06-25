"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Маніфест — editorial-пауза після hero на тлі тёплого графіту.
 * Зміст видимий за замовчуванням; рух додається лише в браузері й тільки
 * коли користувач не просив зменшити анімацію (prefers-reduced-motion).
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // immediateRender:false тримає контент видимим за замовчуванням —
        // from-стан застосовується лише коли тригер спрацював. Якщо rAF не
        // крутиться (фонова вкладка, headless-рендер), секція лишається видимою.
        const tl = gsap.timeline({
          defaults: { ease: "power4.out", immediateRender: false },
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.from(
          "[data-glow]",
          { autoAlpha: 0, scale: 0.9, duration: 1.4, ease: "power2.out" },
          0,
        )
          .from(
            "[data-line]",
            { yPercent: 115, duration: 1.1, stagger: 0.12 },
            0,
          )
          .from(
            "[data-reveal]",
            { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.14 },
            "-=0.55",
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="dark relative isolate overflow-hidden bg-background text-foreground"
    >
      {/* тепле світло, що ловить золото — суто декоративний шар */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[60vmax] w-[60vmax] -translate-x-1/4 -translate-y-1/4 rounded-full blur-[120px]"
        style={{
          left: "22%",
          top: "34%",
          background:
            "radial-gradient(closest-side, rgba(194,163,107,0.20), rgba(194,163,107,0) 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-[var(--s-section)] lg:px-10">
        <div className="h-px w-full bg-border" data-reveal />

        <div className="mt-[clamp(3rem,7vw,6rem)]">
          <h2
            id="manifesto-heading"
            className="font-display text-[clamp(2rem,5.4vw,4rem)] font-normal leading-[1.08] tracking-[-0.01em] text-foreground"
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-line className="block">
                Ми створюємо не прикраси —
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-line className="block">
                а{" "}
                <em className="font-display italic text-gold">
                  особисті історії
                </em>
                ,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-line className="block">
                втілені в золоті.
              </span>
            </span>
          </h2>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] lg:ml-[33%] lg:max-w-2xl">
          <p
            data-reveal
            className="text-pretty text-lg font-light leading-relaxed text-muted-foreground"
          >
            Авторська ювелірна майстерня з власним виробництвом повного циклу в
            Україні. Втілюємо будь-яку ідею — від першого ескізу до готового
            виробу із сертифікованим діамантом. Вручну, із проб 585 та 750, з
            увагою до кожної грані.
          </p>

          <p
            data-reveal
            className="mt-8 text-sm font-light tracking-wide text-foreground/70"
          >
            <span className="text-gold">—</span> Dream Gold, ювелірна майстерня
          </p>
        </div>
      </div>
    </section>
  );
}
