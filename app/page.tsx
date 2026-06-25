import Image from "next/image";

export default function Home() {
  return (
    <section className="relative min-h-[calc(100dvh-84px)] w-full overflow-hidden">
      <Image
        src="/images/hero-ring.jpg"
        alt="Золота каблучка ручної роботи Dream Gold на мармурі"
        fill
        priority
        sizes="100vw"
        className="object-cover object-left"
      />

      {/* scrim — ivory on the right so the headline stays legible */}
      <div className="absolute inset-0 bg-gradient-to-l from-ivory via-ivory/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-84px)] w-full max-w-[1400px] items-center justify-end px-6 lg:px-10">
        <div className="max-w-md text-right">
          <p className="text-eyebrow font-medium uppercase tracking-[0.22em] text-gold-deep">
            Ювелірний дім · Україна
          </p>

          <h1 className="mt-5 font-display text-h1 leading-[1.06] text-ink">
            Прикраси, створені для вас
          </h1>

          <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-ink-muted">
            Втілюємо будь-яку ідею — від ескізу до готового виробу із
            сертифікованим діамантом.
          </p>

          <a
            href="#inquiry"
            className="mt-8 inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream"
          >
            Залишити заявку
          </a>
        </div>
      </div>
    </section>
  );
}
