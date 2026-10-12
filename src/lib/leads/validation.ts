export const leadContactPreferences = ['whatsapp', 'viber', 'telegram', 'call'] as const;
export const leadBeneficiaries = ['self', 'parent'] as const;

export type LeadContactPreference = typeof leadContactPreferences[number];
export type LeadBeneficiary = typeof leadBeneficiaries[number];
export type LeadField = 'name' | 'phone' | 'contactPreference' | 'country' | 'beneficiary';
export type LeadInput = {
  name: string;
  phone: string;
  contactPreference: LeadContactPreference;
  country: string;
  beneficiary: LeadBeneficiary;
};
export type LeadValidation = {ok: true; value: LeadInput} | {ok: false; errors: Partial<Record<LeadField, string>>};

export function normalizeInternationalPhone(value: unknown): string {
  if (typeof value !== 'string' || value.length > 40) return '';
  let normalized = value.trim().replace(/[\s().-]/g, '');
  if (normalized.startsWith('00')) normalized = `+${normalized.slice(2)}`;
  if (!normalized.startsWith('+') || !/^\+[1-9]\d{7,14}$/.test(normalized)) return '';
  return normalized;
}

export function validateLeadInput(payload: unknown): LeadValidation {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {ok: false, errors: {name: 'required', phone: 'invalid_phone', contactPreference: 'required', country: 'required', beneficiary: 'required'}};
  }
  const data = payload as Record<string, unknown>;
  const errors: Partial<Record<LeadField, string>> = {};
  const name = cleanText(data.name, 80, /^[\p{L}\p{M} .'-]+$/u);
  const phone = normalizeInternationalPhone(data.phone);
  const country = cleanText(data.country, 100, /^[\p{L}\p{M} .,'()&/-]+$/u);
  const contactPreference = typeof data.contactPreference === 'string' && leadContactPreferences.includes(data.contactPreference as LeadContactPreference)
    ? data.contactPreference as LeadContactPreference : null;
  const beneficiary = typeof data.beneficiary === 'string' && leadBeneficiaries.includes(data.beneficiary as LeadBeneficiary)
    ? data.beneficiary as LeadBeneficiary : null;

  if (!name) errors.name = typeof data.name === 'string' && data.name.trim() ? 'invalid_name' : 'required';
  if (!phone) errors.phone = 'invalid_phone';
  if (!contactPreference) errors.contactPreference = 'required';
  if (!country) errors.country = typeof data.country === 'string' && data.country.trim() ? 'invalid_country' : 'required';
  if (!beneficiary) errors.beneficiary = 'required';
  if (Object.keys(errors).length) return {ok: false, errors};

  return {ok: true, value: {name, phone, contactPreference: contactPreference!, country, beneficiary: beneficiary!}};
}

function cleanText(value: unknown, maxLength: number, allowed: RegExp): string {
  if (typeof value !== 'string' || value.length > maxLength * 2) return '';
  const text = value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length >= 1 && text.length <= maxLength && allowed.test(text) ? text : '';
}
