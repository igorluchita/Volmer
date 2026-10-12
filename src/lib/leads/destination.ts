import type {LeadInput} from './validation';

export type LeadDeliveryResult = 'accepted' | 'not_configured' | 'unavailable';

export async function deliverLead(lead: LeadInput, idempotencyKey: string): Promise<LeadDeliveryResult> {
  const endpoint = process.env.VOLMER_LEAD_WEBHOOK_URL?.trim();
  const token = process.env.VOLMER_LEAD_WEBHOOK_TOKEN?.trim();
  if (!endpoint || !token) return 'not_configured';

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return 'unavailable';
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return 'unavailable';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'Idempotency-Key': idempotencyKey},
      body: JSON.stringify(lead),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000)
    });
    return response.ok ? 'accepted' : 'unavailable';
  } catch {
    return 'unavailable';
  }
}
