import {describe, expect, it} from 'vitest';
import {normalizeInternationalPhone, validateLeadInput} from './validation';

const validLead = {
  name: 'Elena Popescu', phone: '+373 79 331 839', contactPreference: 'whatsapp', country: 'Italia', beneficiary: 'parent'
};

describe('lead validation', () => {
  it('requires all five lead fields', () => {
    const result = validateLeadInput({});
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(['beneficiary', 'contactPreference', 'country', 'name', 'phone']);
  });

  it('accepts valid values and normalizes international phone', () => {
    const result = validateLeadInput({...validLead, phone: '00373 (79) 331-839'});
    expect(result).toEqual({ok: true, value: {...validLead, phone: '+37379331839'}});
    expect(normalizeInternationalPhone('+1 202 555 0100')).toBe('+12025550100');
  });

  it('rejects local/non-international and oversized phone values', () => {
    expect(normalizeInternationalPhone('079 331 839')).toBe('');
    expect(normalizeInternationalPhone(`+${'1'.repeat(41)}`)).toBe('');
  });

  it('whitelists contact preference and beneficiary', () => {
    const result = validateLeadInput({...validLead, contactPreference: 'sms', beneficiary: 'friend'});
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toMatchObject({contactPreference: 'required', beneficiary: 'required'});
  });

  it('trims safe text and rejects malformed or health/free-text fields', () => {
    const result = validateLeadInput({...validLead, name: '  Elena   Popescu  ', country: '  România  ', symptoms: 'PII not accepted'});
    expect(result).toEqual({ok: true, value: {...validLead, name: 'Elena Popescu', phone: '+37379331839', country: 'România'}});
    expect(validateLeadInput({...validLead, name: '<script>'}).ok).toBe(false);
  });
});
