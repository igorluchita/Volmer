export type BirthDate = {
  year: number;
  month?: number;
  day?: number;
};

export function ageOnDate(birthDate: BirthDate, today = new Date()): number {
  let age = today.getFullYear() - birthDate.year;

  if (birthDate.month) {
    const birthdayHasPassed = today.getMonth() + 1 > birthDate.month
      || (today.getMonth() + 1 === birthDate.month && (birthDate.day === undefined || today.getDate() >= birthDate.day));
    if (!birthdayHasPassed) age -= 1;
  }

  return age;
}
