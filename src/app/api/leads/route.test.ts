import {describe, expect, it, vi} from 'vitest';
import {NextRequest} from 'next/server';
import * as leadRoute from './route';
import {clearRateLimitForTests} from '../../../lib/appointments/rate-limit';
import {clearLeadSubmissionsForTests} from '../../../lib/leads/idempotency';

const payload = {name: 'Private Name', phone: '+37379331839', contactPreference: 'whatsapp', country: 'Italy', beneficiary: 'parent', website: ''};

function request(body: unknown, key = 'c8c9e3f8-0982-4e38-9387-24fdc7f94db3') {
  return new NextRequest('https://volmer.test/api/leads', {
    method: 'POST',
    headers: {'content-type': 'application/json', origin: 'https://volmer.test', host: 'volmer.test', 'x-real-ip': '192.0.2.99', 'idempotency-key': key},
    body: JSON.stringify(body)
  });
}

describe('lead endpoint', () => {
  it('accepts data only through POST and keeps PII out of URL', async () => {
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_URL', '');
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_TOKEN', '');
    clearRateLimitForTests();
    clearLeadSubmissionsForTests();
    const req = request(payload);
    expect(req.url).not.toContain('Private Name');
    expect(req.url).not.toContain('+37379331839');
    const response = await leadRoute.POST(req);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({error: 'destination_not_configured'});
    expect('GET' in leadRoute).toBe(false);
    vi.unstubAllEnvs();
  });
});
