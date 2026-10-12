import { createHash } from "node:crypto";
import { siteConfig } from "../../config/site";
import { appointmentConfig } from "../../config/appointments";
import {
  getAvailableSlots,
  getLocalDayRange,
  getLocalMonthRange,
  getMonthAvailability,
  type BusyEvent,
  type AppointmentSlot,
} from "./availability";
import type { AppointmentInput } from "./validation";

export type CalendarEventDraft = {
  id: string;
  summary: string;
  description: string;
  location: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
};

export type AppointmentCalendar = {
  calendarId: string;
  listEvents: (timeMin: Date, timeMax: Date) => Promise<BusyEvent[]>;
  insertEvent: (event: CalendarEventDraft) => Promise<void>;
};

export class SlotUnavailableError extends Error {
  constructor() {
    super("Selected appointment slot is no longer available");
    this.name = "SlotUnavailableError";
  }
}

const slotLocks = new Map<string, Promise<void>>();

async function withSlotLock<T>(key: string, operation: () => Promise<T>): Promise<T> {
  const previous = slotLocks.get(key) ?? Promise.resolve();
  let release = () => {};
  const current = new Promise<void>((resolve) => { release = resolve; });
  slotLocks.set(key, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (slotLocks.get(key) === current) slotLocks.delete(key);
  }
}

export async function getDateAvailability(calendar: AppointmentCalendar, date: string, now = new Date()): Promise<string[]> {
  const { start, end } = getLocalDayRange(date);
  const events = await calendar.listEvents(start, end);
  return getAvailableSlots(date, events, now).map((slot) => slot.time);
}

export async function getAvailabilityForMonth(calendar: AppointmentCalendar, month: string, now = new Date()): Promise<Record<string, string[]>> {
  const { start, end } = getLocalMonthRange(month);
  const events = await calendar.listEvents(start, end);
  return getMonthAvailability(month, events, now);
}

export async function bookAppointment(
  calendar: AppointmentCalendar,
  input: AppointmentInput,
  now = new Date(),
): Promise<AppointmentSlot> {
  const range = getLocalDayRange(input.date);
  const slot = getAvailableSlots(input.date, [], now).find((candidate) => candidate.time === input.time);
  if (!slot) throw new SlotUnavailableError();
  const lockKey = `${calendar.calendarId}:${slot.start.toISOString()}`;

  return withSlotLock(lockKey, async () => {
    const events = await calendar.listEvents(range.start, range.end);
    const stillAvailable = getAvailableSlots(input.date, events, now).find((candidate) => candidate.time === input.time);
    if (!stillAvailable) throw new SlotUnavailableError();

    const clientName = input.name;
    const id = encodeBase32Hex(createHash("sha256")
      .update(`${calendar.calendarId}|${stillAvailable.start.toISOString()}|${stillAvailable.end.toISOString()}`)
      .digest());
    const description = [
      "Programare online Volmer",
      "",
      `Client: ${clientName}`,
      `Telefon: ${input.phone}`,
      `Programarea este pentru: ${input.appointmentFor === "parent" ? "un părinte" : "mine"}`,
      ...(input.message ? [`Mesaj: ${input.message}`] : []),
      "",
      "Sursa: volmer.md",
    ].join("\n");

    await calendar.insertEvent({
      id,
      summary: `Consultație Volmer — ${clientName}`,
      description,
      location: `${siteConfig.address}, ${siteConfig.city}`,
      start: { dateTime: stillAvailable.start.toISOString(), timeZone: appointmentConfig.timeZone },
      end: { dateTime: stillAvailable.end.toISOString(), timeZone: appointmentConfig.timeZone },
    });
    return stillAvailable;
  });
}

function encodeBase32Hex(bytes: Uint8Array): string {
  const alphabet = "0123456789abcdefghijklmnopqrstuv";
  let output = "";
  let buffer = 0;
  let bits = 0;
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      output += alphabet[(buffer >>> bits) & 31];
    }
  }
  if (bits > 0) output += alphabet[(buffer << (5 - bits)) & 31];
  return output;
}
