import type { Metadata } from "next";
import { Individual } from "@/components/sections/individual";
import { Inquiry } from "@/components/sections/inquiry";

export const metadata: Metadata = {
  title: "Індивідуальне виготовлення — Dream Gold",
  description:
    "Створюємо прикрасу за вашим задумом — від першого ескізу до готового виробу із сертифікованим діамантом. Власне виробництво в Україні, виготовлення 2–4 тижні.",
};

export default function IndividualPage() {
  return (
    <>
      <Individual />
      <Inquiry />
    </>
  );
}
