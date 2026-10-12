import "server-only";
import { auth, calendar, type calendar_v3 } from "@googleapis/calendar";
import type { AppointmentCalendar, CalendarEventDraft } from "@/lib/appointments/service";
import type { BusyEvent } from "@/lib/appointments/availability";
import { SlotUnavailableError } from "@/lib/appointments/service";

export class CalendarConfigurationError extends Error {
  constructor() {
    super("Google Calendar environment is not configured");
    this.name = "CalendarConfigurationError";
  }
}

let calendarClient: calendar_v3.Calendar | undefined;
let configuredCalendarId: string | undefined;

export function getGoogleCalendar(): AppointmentCalendar {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  if (!calendarId || !email || !privateKey) throw new CalendarConfigurationError();

  if (!calendarClient || configuredCalendarId !== calendarId) {
    const jwt = new auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    calendarClient = calendar({ version: "v3", auth: jwt });
    configuredCalendarId = calendarId;
  }

  return {
    calendarId,
    async listEvents(timeMin, timeMax) {
      const events: BusyEvent[] = [];
      let pageToken: string | undefined;
      do {
        const response = await calendarClient!.events.list({
          calendarId,
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          singleEvents: true,
          orderBy: "startTime",
          maxResults: 2500,
          pageToken,
        });
        events.push(...(response.data.items ?? []));
        pageToken = response.data.nextPageToken ?? undefined;
      } while (pageToken);
      return events;
    },
    async insertEvent(event: CalendarEventDraft) {
      try {
        await calendarClient!.events.insert({
          calendarId,
          sendUpdates: "none",
          requestBody: {
            id: event.id,
            summary: event.summary,
            description: event.description,
            location: event.location,
            start: event.start,
            end: event.end,
            status: "confirmed",
            transparency: "opaque",
          },
        });
      } catch (error) {
        if (googleErrorStatus(error) === 409) throw new SlotUnavailableError();
        throw error;
      }
    },
  };
}

function googleErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const candidate = error as { code?: unknown; response?: { status?: unknown } };
  if (typeof candidate.code === "number") return candidate.code;
  return typeof candidate.response?.status === "number" ? candidate.response.status : undefined;
}
