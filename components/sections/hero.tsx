"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { InquiryCta } from "@/components/inquiry/inquiry-cta";
import { Magnetic } from "@/components/ui/magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero — the only above-the-fold section, so it earns first-load choreography
 * the scroll sections (useReveal) can't carry: the headline block rises in on
 * mount and the photograph drifts on scroll for depth. Both live behind
 * `prefers-reduced-motion: no-preference`; the markup renders fully visible by
 * default, so reduced-motion and no-JS visitors get the static composition.
 *
 * The image sits in its own scaled wrapper (scale set in JS, not Tailwind, so it
 * stays 1× under reduced motion). scale 1.2 = 10% overflow each side, which the
 * ±parallax drift (≤8%) stays inside — no edge ever shows through overflow-hidden.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-rise]", {
          y: 30,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        });

        gsap.set(frame.current, { scale: 1.2 });
        gsap.to(frame.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative min-h-[calc(100dvh-var(--header-h))] w-full overflow-hidden"
    >
      {/*
        object-position is responsive: on phones/tablets the виріб sits to the
        right of the frame, so we pull the crop toward it (a jewellery hero that
        shows no jewellery is the bug we're fixing). On lg the wide frame fits and
        the headline rides the right-hand scrim, so we anchor left.
      */}
      <div ref={frame} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-ring.jpg"
          alt="Золота каблучка ручної роботи Dream Gold на теплому мармурі"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_62%] sm:object-[60%_52%] lg:object-left"
        />
      </div>

      {/*
        scrim adapts with the layout: a bottom-up ivory wash on mobile (text sits
        at the foot of the frame) becomes a right-to-left wash on lg (text returns
        to the right). from-ivory / to-transparent stay; only the direction and
        mid-stop change per breakpoint.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/55 to-transparent sm:via-ivory/45 lg:bg-gradient-to-l lg:via-ivory/40" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--header-h))] w-full max-w-[1400px] flex-col justify-end px-6 pb-[clamp(3rem,8vh,5rem)] lg:flex-row lg:items-center lg:justify-end lg:px-10 lg:pb-0">
        <div className="max-w-md text-left lg:text-right">
          <p
            data-hero-rise
            className="text-eyebrow font-medium uppercase tracking-[0.22em] text-gold-deep"
          >
            Ювелірний дім · Україна
          </p>

          <h1
            data-hero-rise
            className="mt-5 text-balance font-display text-h1 leading-[1.06] text-ink"
          >
            Прикраси, створені для вас
          </h1>

          <p
            data-hero-rise
            className="mt-6 max-w-sm text-pretty text-base font-light leading-relaxed text-ink-muted"
          >
            Втілюємо будь-яку ідею — від ескізу до готового виробу із
            сертифікованим діамантом.
          </p>

          <div data-hero-rise className="mt-8 lg:flex lg:justify-end">
            <Magnetic>
              <InquiryCta className="inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream" />
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
