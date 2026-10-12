import {describe, expect, it} from 'vitest';
import {ageOnDate} from './age';

describe('ageOnDate', () => {
  it('calculates an exact age before and after the birthday', () => {
    expect(ageOnDate({year: 2000, month: 8, day: 7}, new Date(2026, 7, 6))).toBe(25);
    expect(ageOnDate({year: 2000, month: 8, day: 7}, new Date(2026, 7, 7))).toBe(26);
  });

  it('uses March as the assumed birthday month when only the year is known', () => {
    expect(ageOnDate({year: 1984, month: 3}, new Date(2026, 1, 28))).toBe(41);
    expect(ageOnDate({year: 1984, month: 3}, new Date(2026, 2, 1))).toBe(42);
  });

  it('calculates the provided team birthdays accurately', () => {
    expect(ageOnDate({year: 1978, month: 4, day: 9}, new Date(2026, 3, 8))).toBe(47);
    expect(ageOnDate({year: 1978, month: 4, day: 9}, new Date(2026, 3, 9))).toBe(48);
    expect(ageOnDate({year: 1983, month: 10, day: 24}, new Date(2026, 8, 29))).toBe(42);
    expect(ageOnDate({year: 1999, month: 3, day: 24}, new Date(2026, 8, 29))).toBe(27);
  });
});
