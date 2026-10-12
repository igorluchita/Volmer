import { describe, expect, it, vi } from "vitest";
import { formatAppointmentTelegramMessage, sendAppointmentTelegramNotification } from "./telegram";
import type { AppointmentInput } from "./validation";

const input: AppointmentInput = {
  name: "Ana Popescu",
  phone: "+37379331839",
  appointmentFor: "parent",
  date: "2027-01-04",
  time: "09:00",
  message: "Prefer confirmare telefonică.",
};

describe("Telegram appointment notifications", () => {
  it("includes booking details in the administrator message", () => {
    expect(formatAppointmentTelegramMessage(input)).toBe([
      "🔔 Programare nouă pe volmer.md",
      "",
      "Nume: Ana Popescu",
      "Telefon: +37379331839",
      "Programarea este pentru: un părinte",
      "Data: 04.01.2027",
      "Ora: 09:00",
      "Mesaj: Prefer confirmare telefonică.",
    ].join("\n"));
  });

  it("posts the notification to the configured Telegram chat", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));

    await expect(sendAppointmentTelegramNotification(input, fetchMock, {
      botToken: "test-token",
      chatId: "-1001234567890",
    })).resolves.toBe("sent");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.telegram.org/bottest-token/sendMessage");
    expect(JSON.parse(String(options?.body))).toMatchObject({
      chat_id: "-1001234567890",
      text: expect.stringContaining("Ana Popescu"),
    });
  });

  it("does nothing when Telegram is not configured", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    await expect(sendAppointmentTelegramNotification(input, fetchMock, null)).resolves.toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
