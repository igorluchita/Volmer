import {NextResponse, type NextRequest} from 'next/server';
import {takeRateLimit} from '../../../lib/appointments/rate-limit';
import {claimLeadSubmission, releaseLeadSubmission} from '../../../lib/leads/idempotency';
import {deliverLead} from '../../../lib/leads/destination';
import {validateLeadInput} from '../../../lib/leads/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = {'Cache-Control': 'no-store, max-age=0'};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return response({error: 'invalid_origin'}, 403);
  if (!takeRateLimit(`lead:${requestIp(request)}`, 5, 60 * 60_000)) return response({error: 'rate_limited'}, 429);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return response({error: 'invalid_request'}, 415);
  if (Number(request.headers.get('content-length') ?? 0) > 8192) return response({error: 'invalid_request'}, 413);

  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 8192) return response({error: 'invalid_request'}, 413);
    payload = JSON.parse(raw);
  } catch {
    return response({error: 'invalid_request'}, 400);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return response({error: 'invalid_request'}, 400);
  const data = payload as Record<string, unknown>;
  if (typeof data.website === 'string' && data.website.trim()) return response({error: 'invalid_form'}, 400);

  const validation = validateLeadInput(data);
  if (!validation.ok) return response({error: 'invalid_form', fields: validation.errors}, 400);

  const idempotencyKey = request.headers.get('idempotency-key') ?? '';
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(idempotencyKey)) {
    return response({error: 'invalid_request'}, 400);
  }
  if (!claimLeadSubmission(idempotencyKey)) return response({error: 'duplicate_request'}, 409);

  const delivery = await deliverLead(validation.value, idempotencyKey);
  if (delivery === 'accepted') return response({ok: true}, 202);
  releaseLeadSubmission(idempotencyKey);
  return delivery === 'not_configured'
    ? response({error: 'destination_not_configured'}, 503)
    : response({error: 'destination_unavailable'}, 502);
}

function response(body: object, status: number) {
  return NextResponse.json(body, {status, headers: noStore});
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host') || request.nextUrl.host;
  if (!origin || !host) return false;
  try { return new URL(origin).host.toLowerCase() === host.toLowerCase(); }
  catch { return false; }
}

function requestIp(request: NextRequest): string {
  return request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
