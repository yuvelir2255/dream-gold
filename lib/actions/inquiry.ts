"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Inquiry submission — the site's lead capture. A visitor's request is validated
 * server-side and delivered through two independent channels, best-effort:
 *   1. the brand's Telegram (its primary channel) via the Bot API, and
 *   2. the `web_inquiries` table in Supabase (lead history).
 * Success is returned if at least one channel accepted the lead, so a single
 * channel being down never loses a request.
 *
 * Required env (server-only, never exposed to the client):
 *   TELEGRAM_BOT_TOKEN — bot token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat id that should receive leads (person or group)
 * Plus the Supabase env (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY) for #2.
 * Set them in .env.local for dev and in the Vercel project for prod.
 */

export type InquiryField = "name" | "contact" | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  /** Top-level error (delivery failed / not configured). */
  message?: string;
  /** Per-field validation errors. */
  fieldErrors?: Partial<Record<InquiryField, string>>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Record<InquiryField, string>;
};

type Lead = { name: string; contact: string; message: string };

const TELEGRAM_API = "https://api.telegram.org";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Send the lead to the brand's Telegram. Returns true on delivery. */
async function deliverToTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "[inquiry] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured",
    );
    return false;
  }

  // Plain text (no parse_mode) — user input is sent literally, so there is no
  // markup-injection surface.
  const text = [
    "🔔 Нова заявка з сайту Dream Gold",
    "",
    `👤 Ім'я: ${lead.name}`,
    `📞 Контакт: ${lead.contact}`,
    "",
    "📝 Ідея:",
    lead.message,
  ].join("\n");

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error(
        "[inquiry] telegram sendMessage failed",
        res.status,
        await res.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[inquiry] telegram request error", err);
    return false;
  }
}

/** Persist the lead to Supabase (`web_inquiries`). Returns true on insert. */
async function saveToDatabase(
  lead: Lead,
  deliveredTelegram: boolean,
): Promise<boolean> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("[inquiry] Supabase env not configured");
    return false;
  }

  try {
    const supabase = await createClient();
    // No .select() — RLS allows insert only, not read back.
    const { error } = await supabase.from("web_inquiries").insert({
      name: lead.name,
      contact: lead.contact,
      message: lead.message,
      delivered_telegram: deliveredTelegram,
    });
    if (error) {
      console.error("[inquiry] supabase insert failed", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[inquiry] supabase request error", err);
    return false;
  }
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot — bots fill hidden fields; humans never see it. Pretend success.
  if (readField(formData, "company")) {
    return { status: "success" };
  }

  const name = readField(formData, "name");
  const contact = readField(formData, "contact");
  const message = readField(formData, "message");
  const values: Record<InquiryField, string> = { name, contact, message };

  const fieldErrors: InquiryState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Вкажіть, як до вас звертатися.";
  if (contact.length < 5)
    fieldErrors.contact = "Вкажіть телефон або Telegram для звʼязку.";
  if (message.length < 5) fieldErrors.message = "Опишіть коротко вашу ідею.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const lead: Lead = { name, contact, message };

  // Telegram first (instant for the brand), then persist with the outcome.
  const deliveredTelegram = await deliverToTelegram(lead);
  const savedToDb = await saveToDatabase(lead, deliveredTelegram);

  if (!deliveredTelegram && !savedToDb) {
    return {
      status: "error",
      message:
        "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.",
      values,
    };
  }

  return { status: "success" };
}
