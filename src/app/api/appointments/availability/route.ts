import { NextResponse, type NextRequest } from "next/server";
import { dateInTimeZone, parseIsoMonth, parseIsoDate } from "@/lib/appointments/availability";
import { getAvailabilityForMonth, getDateAvailability } from "@/lib/appointments/service";
import { takeRateLimit } from "@/lib/appointments/rate-limit";
import { getGoogleCalendar } from "@/lib/google-calendar";

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

  try {
    if (date) {
      if (!parseIsoDate(date)) return NextResponse.json({ error: "invalid_date" }, { status: 400, headers: noStore });
      const calendar = getGoogleCalendar();
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
    return NextResponse.json(
      { month, availability: await getAvailabilityForMonth(calendar, month) },
      { headers: noStore },
    );
  } catch {
    console.error("[appointments] Availability could not be loaded from Google Calendar.");
    return NextResponse.json({ error: "calendar_unavailable" }, { status: 503, headers: noStore });
  }
}

function requestIp(request: NextRequest): string {
  return request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
