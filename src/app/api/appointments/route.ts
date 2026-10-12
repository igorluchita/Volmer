import { NextResponse, type NextRequest } from "next/server";
import { getGoogleCalendar, CalendarConfigurationError } from "@/lib/google-calendar";
import { bookAppointment, SlotUnavailableError } from "@/lib/appointments/service";
import { takeRateLimit } from "@/lib/appointments/rate-limit";
import { validateAppointmentInput } from "@/lib/appointments/validation";
import { sendAppointmentTelegramNotification } from "@/lib/appointments/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store, max-age=0" };

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers: noStore });
  }
  if (!takeRateLimit(`booking:${requestIp(request)}`, 5, 60 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: noStore });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "invalid_request" }, { status: 415, headers: noStore });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 8192) {
    return NextResponse.json({ error: "invalid_request" }, { status: 413, headers: noStore });
  }
  let body: unknown;
  try {
    const payload = await request.text();
    if (new TextEncoder().encode(payload).byteLength > 8192) {
      return NextResponse.json({ error: "invalid_request" }, { status: 413, headers: noStore });
    }
    body = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400, headers: noStore });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400, headers: noStore });
  }
  const data = body as Record<string, unknown>;
  // Quietly accept automated submissions into a no-op path.
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 202, headers: noStore });
  }
  const input = validateAppointmentInput(data);
  if (!input) return NextResponse.json({ error: "invalid_form" }, { status: 400, headers: noStore });

  try {
    const slot = await bookAppointment(getGoogleCalendar(), input);
    try {
      await sendAppointmentTelegramNotification(input);
    } catch {
      // Booking already exists in Google Calendar. Notification failure must not invite a duplicate retry.
      console.error("[appointments] Telegram notification failed.");
    }
    return NextResponse.json({ ok: true, date: slot.date, time: slot.time }, { headers: noStore });
  } catch (error) {
    if (error instanceof SlotUnavailableError) {
      return NextResponse.json({ error: "slot_unavailable" }, { status: 409, headers: noStore });
    }
    if (error instanceof CalendarConfigurationError) {
      console.error("[appointments] Google Calendar credentials are not configured.");
      return NextResponse.json({ error: "calendar_unavailable" }, { status: 503, headers: noStore });
    }
    console.error("[appointments] Google Calendar booking failed.");
    return NextResponse.json({ error: "calendar_unavailable" }, { status: 503, headers: noStore });
  }
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("host") || request.nextUrl.host;
  if (!origin || !requestHost) return false;
  try {
    return new URL(origin).host.toLowerCase() === requestHost.toLowerCase();
  } catch {
    return false;
  }
}

function requestIp(request: NextRequest): string {
  return request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
