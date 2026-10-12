import { describe, expect, it } from "vitest";
import { getAvailableSlots, getLocalDayRange, getLocalMonthRange, getMonthAvailability } from "./availability";

const weekdayNow = new Date("2027-01-01T00:00:00.000Z");

describe("Google Calendar slot calculations", () => {
  it("offers appointments every hour during weekday opening hours", () => {
    expect(getAvailableSlots("2027-01-04", [], weekdayNow).map((slot) => slot.time)).toEqual([
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    ]);
  });

  it("removes every slot overlapping an existing event", () => {
    const events = [{
      start: { dateTime: "2027-01-04T08:30:00.000Z" },
      end: { dateTime: "2027-01-04T09:30:00.000Z" },
    }];
    const slots = getAvailableSlots("2027-01-04", events, weekdayNow).map((slot) => slot.time);
    expect(slots).not.toContain("10:00");
    expect(slots).toContain("09:00");
  });

  it("uses Saturday hours and closes Sunday", () => {
    expect(getAvailableSlots("2027-01-02", [], weekdayNow).map((slot) => slot.time)).toEqual([
      "09:00", "10:00", "11:00", "12:00",
    ]);
    expect(getAvailableSlots("2027-01-03", [], weekdayNow)).toEqual([]);
  });

  it("does not offer appointments for the current day in Chișinău time", () => {
    const now = new Date("2027-01-04T08:00:00.000Z"); // 10:00 local time
    expect(getAvailableSlots("2027-01-04", [], now)).toEqual([]);
    expect(getAvailableSlots("2027-01-05", [], now).map((slot) => slot.time)).toEqual([
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    ]);
    expect(getAvailableSlots("2027-01-03", [], now)).toEqual([]);
  });

  it("converts local calendar day and month boundaries with the configured timezone", () => {
    const day = getLocalDayRange("2027-01-04");
    const month = getLocalMonthRange("2027-01");
    expect(day.start.toISOString()).toBe("2027-01-03T22:00:00.000Z");
    expect(day.end.toISOString()).toBe("2027-01-04T22:00:00.000Z");
    expect(month.start.toISOString()).toBe("2026-12-31T22:00:00.000Z");
    expect(month.end.toISOString()).toBe("2027-01-31T22:00:00.000Z");
  });

  it("makes a day with no free slots unavailable in the month view", () => {
    const events = [
      { start: { dateTime: "2027-01-04T07:00:00.000Z" }, end: { dateTime: "2027-01-04T20:00:00.000Z" } },
    ];
    expect(getMonthAvailability("2027-01", events, weekdayNow)["2027-01-04"]).toEqual([]);
  });
});
