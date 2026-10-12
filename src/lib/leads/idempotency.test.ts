import {afterEach, describe, expect, it} from 'vitest';
import {claimLeadSubmission, clearLeadSubmissionsForTests, releaseLeadSubmission} from './idempotency';

afterEach(clearLeadSubmissionsForTests);

describe('lead request idempotency', () => {
  it('blocks duplicate in-flight or recently accepted submission keys', () => {
    expect(claimLeadSubmission('same-key', 10_000)).toBe(true);
    expect(claimLeadSubmission('same-key', 10_001)).toBe(false);
  });

  it('allows retry after a failed delivery releases the key', () => {
    expect(claimLeadSubmission('retry-key')).toBe(true);
    releaseLeadSubmission('retry-key');
    expect(claimLeadSubmission('retry-key')).toBe(true);
  });
});
