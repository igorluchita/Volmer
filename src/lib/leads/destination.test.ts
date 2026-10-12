import {afterEach, describe, expect, it, vi} from 'vitest';
import {deliverLead} from './destination';
import type {LeadInput} from './validation';

const lead: LeadInput = {name: 'Test Person', phone: '+37379331839', contactPreference: 'call', country: 'Moldova', beneficiary: 'self'};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('lead destination adapter', () => {
  it('reports missing destination instead of claiming success', async () => {
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_URL', '');
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_TOKEN', '');
    expect(await deliverLead(lead, 'key')).toBe('not_configured');
  });

  it('delivers lead only by authenticated HTTPS POST', async () => {
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_URL', 'https://receiver.example/leads');
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_TOKEN', 'test-secret');
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, {status: 202}));
    vi.stubGlobal('fetch', fetchMock);
    expect(await deliverLead(lead, 'key')).toBe('accepted');
    expect(fetchMock).toHaveBeenCalledWith(new URL('https://receiver.example/leads'), expect.objectContaining({
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer test-secret', 'Idempotency-Key': 'key'},
      body: JSON.stringify(lead)
    }));
  });

  it('rejects insecure or query-bearing endpoints', async () => {
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_URL', 'http://receiver.example/leads?secret=x');
    vi.stubEnv('VOLMER_LEAD_WEBHOOK_TOKEN', 'test-secret');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect(await deliverLead(lead, 'key')).toBe('unavailable');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
