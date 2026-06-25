export default function Home() {
  return (
    <section className="flex min-h-[calc(100dvh-84px)] flex-col items-center justify-center px-6 text-center">
      <p className="text-eyebrow font-medium uppercase tracking-[0.22em] text-gold-deep">
        Ювелірний дім · Україна
      </p>

      <h1 className="mt-6 max-w-3xl font-display text-display leading-[1.05] tracking-[0.01em] text-ink">
        Прикраси, створені для вас
      </h1>

      <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink-muted">
        Втілюємо будь-яку ідею — від ескізу до готового виробу із сертифікованим
        діамантом. Власне виробництво в Україні.
      </p>

      <a
        href="#inquiry"
        className="mt-10 inline-flex bg-gold px-7 py-3.5 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-deep hover:text-cream"
      >
        Залишити заявку
      </a>

      <p className="mt-16 text-sm uppercase tracking-[0.2em] text-ink-faint">
        Сайт у розробці
      </p>
    </section>
  );
}
