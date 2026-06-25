import type { Metadata } from "next";
import { Craft } from "@/components/sections/craft";
import { Inquiry } from "@/components/sections/inquiry";

export const metadata: Metadata = {
  title: "Про нас — Dream Gold",
  description:
    "Dream Gold — сімейний ювелірний дім із власним виробництвом повного циклу в Україні. Майстерність, сертифіковане каміння GIA/IGI, проби 585 та 750.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ivory text-ink">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-[var(--s-section)] pt-[clamp(7rem,14vh,11rem)] lg:px-10">
          <p className="font-display text-base italic text-ink-muted">Про нас</p>

          <h1 className="mt-4 max-w-3xl text-balance font-display text-h1 leading-[1.05] text-ink">
            Сімейний ювелірний дім із власним виробництвом
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-ink-muted">
            Dream Gold — авторський ювелірний дім із власним виробництвом повного
            циклу в Україні. За кожним виробом — роки досвіду, ручна робота та
            увага до деталі: від першого ескізу до клейма проби. Створюємо
            прикраси, які стають частиною особистих історій.
          </p>
        </div>
      </section>

      <Craft />
      <Inquiry />
    </>
  );
}
