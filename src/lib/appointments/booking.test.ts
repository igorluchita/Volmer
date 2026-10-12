import { describe, expect, it } from "vitest";
import { bookAppointment, getDateAvailability, SlotUnavailableError, type AppointmentCalendar, type CalendarEventDraft } from "./service";
import { normalizeInternationalPhone, validateAppointmentInput } from "./validation";
import type { BusyEvent } from "./availability";

function fakeCalendar(): AppointmentCalendar & { events: BusyEvent[]; insertions: number; drafts: CalendarEventDraft[] } {
  return {
    calendarId: "test-calendar",
    events: [],
    insertions: 0,
    drafts: [],
    async listEvents() { return [...this.events]; },
    async insertEvent(event) {
      this.insertions += 1;
      this.drafts.push(event);
      this.events.push({ start: { dateTime: event.start.dateTime }, end: { dateTime: event.end.dateTime } });
    },
  };
}

const input = {
  name: "Ana Popescu",
  phone: "079 331 839",
  phoneCountryCode: "+373",
  appointmentFor: "self" as const,
  date: "2027-01-04",
  time: "09:00",
  message: "",
};
const future = new Date("2027-01-01T00:00:00.000Z");

describe("appointment requests", () => {
  it("normalizes common Moldovan phone formats and validates user fields", () => {
    expect(normalizeInternationalPhone("079 331 839", "+373")).toBe("+37379331839");
    expect(normalizeInternationalPhone("176 123 4567", "+39")).toBe("+391761234567");
    expect(normalizeInternationalPhone("+49 176 123 4567", "+49")).toBe("+491761234567");
    expect(normalizeInternationalPhone("0044 7700 900123", "+44")).toBe("+447700900123");
    expect(normalizeInternationalPhone("+44 7700 900123", "+49")).toBe("");
    expect(validateAppointmentInput(input)?.phone).toBe("+37379331839");
    expect(validateAppointmentInput({ ...input, name: "<script>" })).toBeNull();
    expect(validateAppointmentInput({ ...input, message: "x".repeat(1001) })).toBeNull();
    expect(validateAppointmentInput({ ...input, time: "13:00" })?.time).toBe("13:00");
  });

  it("rejects a slot that became busy after availability was displayed", async () => {
    const calendar = fakeCalendar();
    expect(await getDateAvailability(calendar, input.date, future)).toContain(input.time);
    calendar.events.push({ start: { dateTime: "2027-01-04T07:00:00.000Z" }, end: { dateTime: "2027-01-04T08:00:00.000Z" } });
    await expect(bookAppointment(calendar, input, future)).rejects.toBeInstanceOf(SlotUnavailableError);
    expect(calendar.insertions).toBe(0);
  });

  it("creates a uniquely identified Volmer event with local timezone and booking details", async () => {
    const calendar = fakeCalendar();
    const validatedInput = validateAppointmentInput(input)!;
    const slot = await bookAppointment(calendar, validatedInput, future);
    const event = calendar.drafts[0];
    expect(slot.time).toBe("09:00");
    expect(event.id).toMatch(/^[0-9a-v]{52}$/);
    expect(event.summary).toBe("Consultație Volmer — Ana Popescu");
    expect(event.description).toContain("Telefon: +37379331839");
    expect(event.description).toContain("Programarea este pentru: mine");
    expect(event.description).toContain("Sursa: volmer.md");
    expect(event.location).toContain("Str. Mitropolit Varlaam 69");
    expect(event.start.timeZone).toBe("Europe/Chisinau");
    expect(event.end.timeZone).toBe("Europe/Chisinau");
  });

  it("prevents two concurrent requests from booking the same slot", async () => {
    const calendar = fakeCalendar();
    const outcomes = await Promise.allSettled([
      bookAppointment(calendar, input, future),
      bookAppointment(calendar, input, future),
    ]);
    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    expect(outcomes.filter((outcome) => outcome.status === "rejected" && outcome.reason instanceof SlotUnavailableError)).toHaveLength(1);
    expect(calendar.insertions).toBe(1);
  });
});
