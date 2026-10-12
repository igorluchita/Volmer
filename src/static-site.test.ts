import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { siteConfig } from "./config/site";
import { appointmentConfig } from "./config/appointments";

describe("Volmer Next.js web application", () => {
  it("centralizează datele de contact și configurarea programărilor", () => {
    expect(siteConfig.phoneInternational).toMatch(/^\+\d+$/);
    expect(`tel:${siteConfig.phoneInternational}`).toMatch(/^tel:\+/);
    expect(`mailto:${siteConfig.email}`).toContain("@");
    expect(appointmentConfig.timeZone).toBe("Europe/Chisinau");
    expect(appointmentConfig.durationMinutes).toBe(60);
    expect(siteConfig.businessHours[0].hours).toBe("09:00–18:00");
    expect(siteConfig.businessHours[1].hours).toBe("09:00–13:00");
  });

  it("ține integrarea Google Calendar și endpointurile doar pe server", () => {
    expect(existsSync("src/app/api/appointments/availability/route.ts")).toBe(true);
    expect(existsSync("src/app/api/appointments/route.ts")).toBe(true);
    expect(existsSync("src/lib/google-calendar.ts")).toBe(true);
    expect(readFileSync("src/lib/google-calendar.ts", "utf8")).toContain('import "server-only"');
    expect(readFileSync("next.config.ts", "utf8")).not.toContain("output: 'export'");
  });

  it("păstrează apelul centralizat în paginile publice", () => {
    for (const path of ["src/components/header.tsx", "src/components/footer.tsx", "src/components/home/HomeHero.tsx", "src/components/info-page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("siteConfig.phoneInternational");
    }
  });
});
