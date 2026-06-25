import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Каталог — Dream Gold",
  description:
    "Каталог авторських ювелірних виробів Dream Gold: каблучки, сережки, підвіски, браслети, ланцюжки, кольє та обручки. Без цін — залиште заявку.",
};

export default function CatalogPage() {
  return (
    <PageShell
      label="Каталог"
      title="Авторські прикраси за категоріями"
      intro="Каблучки, сережки, підвіски, браслети, ланцюжки, кольє та обручки — кожен виріб втілений у власній майстерні. Покажемо, що вже створили, і втілимо вашу ідею."
      note="Повний каталог із категоріями готуємо"
    />
  );
}
