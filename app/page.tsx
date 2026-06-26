import Image from "next/image";
import { Manifesto } from "@/components/sections/manifesto";
import { Explore } from "@/components/sections/explore";
import { Works } from "@/components/sections/works";
import { Inquiry } from "@/components/sections/inquiry";
import { InquiryCta } from "@/components/inquiry/inquiry-cta";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100dvh-var(--header-h))] w-full overflow-hidden">
        {/*
          object-position is responsive: on phones/tablets the виріб sits to the
          right of the frame, so we pull the crop toward it (a jewellery hero
          that shows no jewellery is the bug we're fixing). On lg the wide frame
          fits and the headline rides the right-hand scrim, so we anchor left.
        */}
        <Image
          src="/images/hero-ring.jpg"
          alt="Золота каблучка ручної роботи Dream Gold на теплому мармурі"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_62%] sm:object-[60%_52%] lg:object-left"
        />

        {/*
          scrim adapts with the layout: a bottom-up ivory wash on mobile (text
          sits at the foot of the frame) becomes a right-to-left wash on lg
          (text returns to the right). from-ivory / to-transparent stay; only
          the direction and mid-stop change per breakpoint.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/55 to-transparent sm:via-ivory/45 lg:bg-gradient-to-l lg:via-ivory/40" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--header-h))] w-full max-w-[1400px] flex-col justify-end px-6 pb-[clamp(3rem,8vh,5rem)] lg:flex-row lg:items-center lg:justify-end lg:px-10 lg:pb-0">
          <div className="max-w-md text-left lg:text-right">
            <p className="text-eyebrow font-medium uppercase tracking-[0.22em] text-gold-deep">
              Ювелірний дім · Україна
            </p>

            <h1 className="mt-5 text-balance font-display text-h1 leading-[1.06] text-ink">
              Прикраси, створені для вас
            </h1>

            <p className="mt-6 max-w-sm text-pretty text-base font-light leading-relaxed text-ink-muted">
              Втілюємо будь-яку ідею — від ескізу до готового виробу із
              сертифікованим діамантом.
            </p>

            <InquiryCta className="mt-8 inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream" />
          </div>
        </div>
      </section>

      <Manifesto />
      <Explore />
      <Works />
      <Inquiry />
    </>
  );
}
