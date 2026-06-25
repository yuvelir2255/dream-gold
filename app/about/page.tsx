import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Про нас — Dream Gold",
  description:
    "Dream Gold — авторський ювелірний дім із власним виробництвом повного циклу в Україні. Майстерність, сертифіковані діаманти, проби 585 та 750.",
};

export default function AboutPage() {
  return (
    <PageShell
      label="Про нас"
      title="Ювелірний дім із власним виробництвом"
      intro="Авторська ювелірна майстерня повного циклу в Україні. Тут поєднаються наша історія, майстерність і власне виробництво — від 3D-моделі до ручного оздоблення, із пробами 585 та 750 і сертифікованим камінням."
      note="Повна сторінка з історією та сертифікатами — незабаром"
    />
  );
}
