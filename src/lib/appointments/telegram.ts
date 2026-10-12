import type { AppointmentInput } from "./validation";

type TelegramConfig = {
  botToken: string;
  chatId: string;
};

type FetchLike = typeof fetch;

export function formatAppointmentTelegramMessage(input: AppointmentInput): string {
  const [year, month, day] = input.date.split("-");
  return [
    "🔔 Programare nouă pe volmer.md",
    "",
    `Nume: ${input.name}`,
    `Telefon: ${input.phone}`,
    `Programarea este pentru: ${input.appointmentFor === "parent" ? "un părinte" : "client"}`,
    `Data: ${day}.${month}.${year}`,
    `Ora: ${input.time}`,
    ...(input.message ? [`Mesaj: ${input.message}`] : []),
  ].join("\n");
}

export async function sendAppointmentTelegramNotification(
  input: AppointmentInput,
  fetchImpl: FetchLike = fetch,
  config: TelegramConfig | null = telegramConfigFromEnvironment(),
): Promise<"sent" | "not_configured"> {
  if (!config) return "not_configured";

  const response = await fetchImpl(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatAppointmentTelegramMessage(input),
      }),
      signal: AbortSignal.timeout(5_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram Bot API returned HTTP ${response.status}`);
  }
  return "sent";
}

function telegramConfigFromEnvironment(): TelegramConfig | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() ?? "";
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? "";
  return botToken && chatId ? { botToken, chatId } : null;
}
