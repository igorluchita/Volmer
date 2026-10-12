import { parseIsoDate } from "./availability";
import { appointmentPhoneCountries, type AppointmentPhoneCountryCode } from "@/config/phone-countries";

export type AppointmentInput = {
  name: string;
  phone: string;
  appointmentFor: "self" | "parent";
  date: string;
  time: string;
  message: string;
};

export function validateAppointmentInput(value: unknown): AppointmentInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const name = cleanName(data.name);
  const phoneCountryCode = isPhoneCountryCode(data.phoneCountryCode) ? data.phoneCountryCode : "";
  const phone = normalizeInternationalPhone(data.phone, phoneCountryCode as AppointmentPhoneCountryCode | "");
  const appointmentFor = data.appointmentFor === "self" || data.appointmentFor === "parent" ? data.appointmentFor : "";
  const date = typeof data.date === "string" && parseIsoDate(data.date) ? data.date : "";
  const time = typeof data.time === "string" && /^(?:09|10|11|12|13|14|15|16|17):00$/.test(data.time) ? data.time : "";
  const message = typeof data.message === "string" ? data.message.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";
  if (!name || !phone || !appointmentFor || !date || !time || message.length > 1000) return null;
  return { name, phone, appointmentFor, date, time, message };
}

function cleanName(value: unknown): string {
  if (typeof value !== "string") return "";
  const name = value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
  return name.length >= 1 && name.length <= 80 && /^[\p{L}\p{M} .'-]+$/u.test(name) ? name : "";
}

export function normalizeInternationalPhone(value: unknown, countryCode: AppointmentPhoneCountryCode | ""): string {
  if (typeof value !== "string" || value.length > 40) return "";
  if (!isPhoneCountryCode(countryCode)) return "";
  const compact = value.trim().replace(/[\s().-]/g, "");
  const explicitlyInternational = compact.startsWith("+") || compact.startsWith("00");
  let nationalNumber = compact.replace(/\D/g, "");
  const selectedDigits = countryCode.slice(1);

  if (explicitlyInternational) {
    nationalNumber = nationalNumber.replace(/^00/, "");
    if (!nationalNumber.startsWith(selectedDigits) || nationalNumber.length <= selectedDigits.length) return "";
    nationalNumber = nationalNumber.slice(selectedDigits.length);
  } else {
    nationalNumber = nationalNumber.replace(/^0/, "");
  }

  const internationalNumber = `${selectedDigits}${nationalNumber}`;
  if (!/^\d{7,15}$/.test(internationalNumber)) return "";
  return `+${internationalNumber}`;
}

function isPhoneCountryCode(value: unknown): value is AppointmentPhoneCountryCode {
  return appointmentPhoneCountries.some((country) => country.code === value);
}
