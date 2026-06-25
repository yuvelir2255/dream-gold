import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Контакти — Dream Gold",
  description:
    "Звʼяжіться з Dream Gold: Telegram, телефон +380 67 260 52 44, Instagram. Залиште заявку — відповімо протягом дня.",
};

export default function ContactsPage() {
  return (
    <PageShell
      label="Контакти"
      title="Звʼяжіться з нами"
      intro="Найшвидше — у Telegram. Залиште заявку або напишіть напряму: відповімо протягом дня, підготуємо ескіз і прорахунок вартості."
      note="Форму та карту додамо незабаром"
    />
  );
}
