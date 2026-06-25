import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Кабінет — Dream Gold",
  description: "Особистий кабінет Dream Gold: профіль, мої заявки та збережене.",
};

export default function AccountPage() {
  return (
    <PageShell
      label="Кабінет"
      title="Особистий кабінет"
      intro="Тут зʼявляться ваш профіль, історія заявок і збережені прикраси."
      hideCta
      note="Зʼявиться разом із входом — на етапі особистого кабінету."
    />
  );
}
