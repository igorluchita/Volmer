export const appointmentPhoneCountries = [
  {code: "+373", flag: "🇲🇩", ro: "Moldova", ru: "Молдова"},
  {code: "+40", flag: "🇷🇴", ro: "România", ru: "Румыния"},
  {code: "+39", flag: "🇮🇹", ro: "Italia", ru: "Италия"},
  {code: "+49", flag: "🇩🇪", ro: "Germania", ru: "Германия"},
  {code: "+44", flag: "🇬🇧", ro: "Regatul Unit", ru: "Великобритания"},
  {code: "+33", flag: "🇫🇷", ro: "Franța", ru: "Франция"},
  {code: "+34", flag: "🇪🇸", ro: "Spania", ru: "Испания"},
  {code: "+351", flag: "🇵🇹", ro: "Portugalia", ru: "Португалия"},
  {code: "+353", flag: "🇮🇪", ro: "Irlanda", ru: "Ирландия"},
  {code: "+380", flag: "🇺🇦", ro: "Ucraina", ru: "Украина"},
  {code: "+7", flag: "🇷🇺", ro: "Rusia", ru: "Россия"},
  {code: "+1", flag: "🇺🇸 🇨🇦", ro: "SUA / Canada", ru: "США / Канада"},
] as const;

export type AppointmentPhoneCountryCode = (typeof appointmentPhoneCountries)[number]["code"];
