import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Збережене — Dream Gold",
  description: "Ваш список збережених прикрас Dream Gold.",
};

export default function WishlistPage() {
  return (
    <PageShell
      label="Збережене"
      title="Список бажаного"
      intro="Зберігайте прикраси, що сподобались, щоб повернутися до них пізніше."
      hideCta
      note="Зʼявиться разом із входом — на етапі особистого кабінету."
    />
  );
}
