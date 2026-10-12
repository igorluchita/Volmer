export const appointmentConfig = {
  timeZone: "Europe/Chisinau",
  durationMinutes: 60,
  weekdayDays: [1, 2, 3, 4, 5],
  weekdayHours: { open: "09:00", close: "18:00" },
  weekdayBreak: { start: "13:00", end: "14:00" },
  saturdayHours: { open: "09:00", close: "13:00" },
} as const;
