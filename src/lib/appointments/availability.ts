import { appointmentConfig } from "../../config/appointments";

export type BusyEvent = {
  start?: { dateTime?: string | null; date?: string | null } | null;
  end?: { dateTime?: string | null; date?: string | null } | null;
  status?: string | null;
  transparency?: string | null;
};

export type AppointmentSlot = {
  date: string;
  time: string;
  start: Date;
  end: Date;
};

type DateParts = { year: number; month: number; day: number };

export function parseIsoDate(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) return null;
  return { year, month, day };
}

export function parseIsoMonth(value: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  return year >= 1 && month >= 1 && month <= 12 ? { year, month } : null;
}

export function addCalendarDays(date: string, days: number): string {
  const parts = parseIsoDate(date);
  if (!parts) throw new Error("Invalid ISO calendar date");
  const next = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return [next.getUTCFullYear(), String(next.getUTCMonth() + 1).padStart(2, "0"), String(next.getUTCDate()).padStart(2, "0")].join("-");
}

export function dateInTimeZone(instant: Date, timeZone = appointmentConfig.timeZone): string {
  const values = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const part = (type: string) => values.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function localDateTimeToInstant(date: string, time: string): Date {
  const parts = parseIsoDate(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!parts || !timeMatch) throw new Error("Invalid local date/time");
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const desired = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute);
  let instant = desired;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: appointmentConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const values = formatter.formatToParts(new Date(instant));
    const part = (type: string) => Number(values.find((item) => item.type === type)?.value);
    const representedAsUtc = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
    const correction = desired - representedAsUtc;
    instant += correction;
    if (correction === 0) break;
  }
  return new Date(instant);
}

export function getLocalDayRange(date: string): { start: Date; end: Date } {
  if (!parseIsoDate(date)) throw new Error("Invalid ISO calendar date");
  const nextDay = addCalendarDays(date, 1);
  return {
    start: localDateTimeToInstant(date, "00:00"),
    end: localDateTimeToInstant(nextDay, "00:00"),
  };
}

export function getLocalMonthRange(month: string): { start: Date; end: Date } {
  const parts = parseIsoMonth(month);
  if (!parts) throw new Error("Invalid ISO calendar month");
  const firstDate = `${month}-01`;
  const next = new Date(Date.UTC(parts.year, parts.month, 1));
  const nextDate = `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-01`;
  return {
    start: localDateTimeToInstant(firstDate, "00:00"),
    end: localDateTimeToInstant(nextDate, "00:00"),
  };
}

export function getDatesInMonth(month: string): string[] {
  const parts = parseIsoMonth(month);
  if (!parts) return [];
  const count = new Date(Date.UTC(parts.year, parts.month, 0)).getUTCDate();
  return Array.from({ length: count }, (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`);
}

function localMinute(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function eventInterval(event: BusyEvent): { start: Date; end: Date } | null {
  if (event.status === "cancelled" || event.transparency === "transparent") return null;
  const startValue = event.start?.dateTime ?? event.start?.date;
  const endValue = event.end?.dateTime ?? event.end?.date;
  if (!startValue || !endValue) return null;
  const start = event.start?.dateTime ? new Date(startValue) : localDateTimeToInstant(startValue, "00:00");
  const end = event.end?.dateTime ? new Date(endValue) : localDateTimeToInstant(endValue, "00:00");
  return Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) ? null : { start, end };
}

export function getAvailableSlots(date: string, events: BusyEvent[], now = new Date()): AppointmentSlot[] {
  const parts = parseIsoDate(date);
  // Online appointments start on the next local calendar day; same-day booking is not allowed.
  if (!parts || date <= dateInTimeZone(now)) return [];

  const weekday = new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay();
  if (weekday === 0) return [];
  const isSaturday = weekday === 6;
  const opening = isSaturday ? appointmentConfig.saturdayHours : appointmentConfig.weekdayHours;
  if (!isSaturday && !appointmentConfig.weekdayDays.includes(weekday as 1 | 2 | 3 | 4 | 5)) return [];

  const open = localMinute(opening.open);
  const close = localMinute(opening.close);
  const duration = appointmentConfig.durationMinutes;
  const busy = events.map(eventInterval).filter((interval): interval is { start: Date; end: Date } => interval !== null);
  const slots: AppointmentSlot[] = [];

  for (let startMinute = open; startMinute + duration <= close; startMinute += duration) {
    const endMinute = startMinute + duration;
    const time = `${String(Math.floor(startMinute / 60)).padStart(2, "0")}:${String(startMinute % 60).padStart(2, "0")}`;
    const endTime = `${String(Math.floor(endMinute / 60)).padStart(2, "0")}:${String(endMinute % 60).padStart(2, "0")}`;
    const start = localDateTimeToInstant(date, time);
    const end = localDateTimeToInstant(date, endTime);
    if (start <= now) continue;
    if (busy.some((interval) => start < interval.end && end > interval.start)) continue;
    slots.push({ date, time, start, end });
  }
  return slots;
}

export function getMonthAvailability(month: string, events: BusyEvent[], now = new Date()): Record<string, string[]> {
  return Object.fromEntries(getDatesInMonth(month).map((date) => [
    date,
    getAvailableSlots(date, events, now).map((slot) => slot.time),
  ]));
}
