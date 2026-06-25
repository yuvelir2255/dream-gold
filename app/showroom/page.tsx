import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Шоурум · Харків — Dream Gold",
  description:
    "Шоурум Dream Gold у Харкові. Запрошуємо на зустріч — обрати чи замовити прикрасу особисто. Доставка по Україні та світу.",
};

export default function ShowroomPage() {
  return (
    <PageShell
      label="Шоурум · Харків"
      title="Завітайте до нашого шоуруму"
      intro="Запрошуємо на особисту зустріч у Харкові — обрати, поміряти чи обговорити майбутню прикрасу наживо. Не з Харкова — доставимо по Україні та світу."
      note="Адресу, години та карту оголосимо незабаром"
    />
  );
}
