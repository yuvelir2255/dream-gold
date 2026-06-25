import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Індивідуальне виготовлення — Dream Gold",
  description:
    "Створюємо прикрасу за вашим задумом — від першого ескізу до готового виробу із сертифікованим діамантом. Власне виробництво в Україні.",
};

export default function IndividualPage() {
  return (
    <PageShell
      label="Індивідуальне виготовлення"
      title="Створюємо прикрасу за вашим задумом"
      intro="Маєте готову ідею, фото або лише натхнення — ми пройдемо з вами весь шлях від першого ескізу до виробу, який ви триматимете в руках. Виготовлення — 2–4 тижні."
      note="Детальна сторінка процесу — незабаром"
    />
  );
}
