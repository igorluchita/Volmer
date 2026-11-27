import { NextResponse, type NextRequest } from "next/server";
import { dateInTimeZone, parseIsoMonth, parseIsoDate } from "@/lib/appointments/availability";
import { getAvailabilityForMonth, getDateAvailability } from "@/lib/appointments/service";
import { takeRateLimit } from "@/lib/appointments/rate-limit";
import { CalendarConfigurationError, getGoogleCalendar } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store, max-age=0" };

export async function GET(request: NextRequest) {
  if (!takeRateLimit(`availability:${requestIp(request)}`, 30, 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: noStore });
  }

  const date = request.nextUrl.searchParams.get("date");
  const month = request.nextUrl.searchParams.get("month");
  if (Boolean(date) === Boolean(month)) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400, headers: noStore });
  }

  let failureStage = "calendar_configuration";
  try {
    if (date) {
      if (!parseIsoDate(date)) return NextResponse.json({ error: "invalid_date" }, { status: 400, headers: noStore });
      const calendar = getGoogleCalendar();
      failureStage = "google_calendar_query";
      return NextResponse.json(
        { date, slots: await getDateAvailability(calendar, date) },
        { headers: noStore },
      );
    }

    if (!month || !parseIsoMonth(month)) {
      return NextResponse.json({ error: "invalid_date" }, { status: 400, headers: noStore });
    }
    const today = dateInTimeZone(new Date());
    if (month < today.slice(0, 7)) {
      return NextResponse.json({ error: "invalid_date" }, { status: 400, headers: noStore });
    }
    const calendar = getGoogleCalendar();
    failureStage = "google_calendar_query";
    return NextResponse.json(
      { month, availability: await getAvailabilityForMonth(calendar, month) },
      { headers: noStore },
    );
  } catch (error) {
    if (error instanceof CalendarConfigurationError) {
      console.error(error.missingVariables.join(", "));
      return NextResponse.json({ error: "calendar_unavailable" }, { status: 503, headers: noStore });
    }
    console.error("[appointments] Availability request failed.", {
      stage: failureStage,
      ...safeErrorDetails(error),
    });
    return NextResponse.json({ error: "calendar_unavailable" }, { status: 503, headers: noStore });
  }
}

function safeErrorDetails(error: unknown): Record<string, string | number | string[] | undefined> {
  if (!error || typeof error !== "object") return { errorType: typeof error };

  const candidate = error as {
    name?: unknown;
    code?: unknown;
    status?: unknown;
    response?: {
      status?: unknown;
      data?: {
        error?: {
          status?: unknown;
          errors?: Array<{ reason?: unknown }>;
        };
      };
    };
  };
  const shortString = (value: unknown): string | undefined =>
    typeof value === "string" && /^[\w.-]{1,100}$/.test(value) ? value : undefined;
  const shortNumber = (value: unknown): number | undefined =>
    typeof value === "number" && Number.isFinite(value) ? value : undefined;
  const reasons = candidate.response?.data?.error?.errors
    ?.map((item) => shortString(item.reason))
    .filter((reason): reason is string => Boolean(reason));

  return {
    errorName: shortString(candidate.name),
    errorCode: shortString(candidate.code) ?? shortNumber(candidate.code),
    httpStatus: shortNumber(candidate.response?.status) ?? shortNumber(candidate.status),
    googleStatus: shortString(candidate.response?.data?.error?.status),
    googleReasons: reasons?.length ? reasons : undefined,
  };
}

function requestIp(request: NextRequest): string {
  return request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
