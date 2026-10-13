'use client';

import {useRef, useState, type FormEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {siteConfig} from '@/config/site';
import {trackMessengerClick} from '@/lib/google-consent';
import {legalPath} from '@/content/legal-pages';
import type {LeadField} from '@/lib/leads/validation';

type FormErrors = Partial<Record<LeadField, string>>;

export function LeadForm() {
  const t = useTranslations('LeadForm');
  const router = useRouter();
  const locale = useLocale() === 'ru' ? 'ru' : 'ro';
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const idempotencyKey = useRef('');

  function clearError(field: LeadField) {
    setErrors((current) => current[field] ? {...current, [field]: undefined} : current);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      contactPreference: String(formData.get('contactPreference') ?? ''),
      country: String(formData.get('country') ?? '').trim(),
      beneficiary: String(formData.get('beneficiary') ?? '')
    };
    const nextErrors: FormErrors = {};
    if (!values.name) nextErrors.name = 'required';
    if (!values.phone) nextErrors.phone = 'required';
    if (!values.contactPreference) nextErrors.contactPreference = 'required';
    if (!values.country) nextErrors.country = 'required';
    if (!values.beneficiary) nextErrors.beneficiary = 'required';
    setErrors(nextErrors);
    setServerError('');
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('input[aria-invalid="true"], fieldset[aria-invalid="true"] input')?.focus());
      return;
    }

    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey.current},
        body: JSON.stringify({...values, website: ''})
      });
      const result = await response.json() as {ok?: boolean; error?: string; fields?: FormErrors};
      if (response.ok && result.ok) {
        router.push(`/${locale}/multumim/`);
        return;
      }
      if (result.error === 'invalid_form' && result.fields) {
        setErrors(result.fields);
        setServerError(t('validationError'));
      } else {
        setServerError(t(result.error === 'destination_not_configured' ? 'notConfigured' : result.error === 'rate_limited' ? 'rateLimited' : 'sendFailed'));
      }
    } catch {
      setServerError(t('sendFailed'));
    } finally {
      setLoading(false);
    }
  }

  const errorText = (field: LeadField) => errors[field] ? <span className="lead-field-error" id={`lead-${field}-error`}>{t(`errors.${errors[field]}`)}</span> : null;

  return <section className="lead-form-card" aria-labelledby="lead-form-title">
    <p className="lead-form-eyebrow">{t('eyebrow')}</p>
    <h3 id="lead-form-title">{t('title')}</h3>
    <p className="lead-form-intro">{t('intro')}</p>
    <form className="lead-form" onSubmit={submit} noValidate aria-busy={loading}>
      <label className="lead-field"><span>{t('name')} <b aria-hidden="true">*</b></span><input name="name" type="text" autoComplete="name" maxLength={80} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'lead-name-error' : undefined} onChange={() => clearError('name')} />{errorText('name')}</label>
      <label className="lead-field"><span>{t('phone')} <b aria-hidden="true">*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} placeholder="+373 79 331 839" aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'lead-phone-error' : undefined} onChange={() => clearError('phone')} />{errorText('phone')}</label>
      <fieldset className="lead-fieldset" aria-required="true" aria-invalid={Boolean(errors.contactPreference)} aria-describedby={errors.contactPreference ? 'lead-contactPreference-error' : undefined}>
        <legend>{t('contactPreference')} <b aria-hidden="true">*</b></legend>
        <div className="lead-options">{(['whatsapp', 'viber', 'telegram', 'call'] as const).map((option) => <label key={option}><input type="radio" name="contactPreference" value={option} required aria-describedby={errors.contactPreference ? 'lead-contactPreference-error' : undefined} onChange={() => clearError('contactPreference')} /><span>{t(`methods.${option}`)}</span></label>)}</div>
        {errorText('contactPreference')}
      </fieldset>
      <label className="lead-field"><span>{t('country')} <b aria-hidden="true">*</b></span><input name="country" type="text" autoComplete="country-name" maxLength={100} aria-required="true" aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? 'lead-country-error' : undefined} onChange={() => clearError('country')} />{errorText('country')}</label>
      <fieldset className="lead-fieldset" aria-required="true" aria-invalid={Boolean(errors.beneficiary)} aria-describedby={errors.beneficiary ? 'lead-beneficiary-error' : undefined}>
        <legend>{t('beneficiary')} <b aria-hidden="true">*</b></legend>
        <div className="lead-options">{(['self', 'parent'] as const).map((option) => <label key={option}><input type="radio" name="beneficiary" value={option} required aria-describedby={errors.beneficiary ? 'lead-beneficiary-error' : undefined} onChange={() => clearError('beneficiary')} /><span>{t(`beneficiaries.${option}`)}</span></label>)}</div>
        {errorText('beneficiary')}
      </fieldset>
      <label className="lead-honeypot" aria-hidden="true" tabIndex={-1}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {serverError && <div className="lead-server-error" role="alert"><p>{serverError}</p><p>{t('fallback')}</p><nav aria-label={t('contactAlternatives')}>
        <a href={siteConfig.quickContact.phone}>{t('methods.call')}</a>
        <a href={siteConfig.quickContact.whatsapp} onClick={() => trackMessengerClick('whatsapp')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={siteConfig.quickContact.viber} onClick={() => trackMessengerClick('viber')}>Viber</a>
      </nav></div>}
      <button className="lead-submit" type="submit" disabled={loading}>{loading ? t('sending') : t('submit')}</button>
      <p className="lead-privacy">{t('privacyBefore')}<a href={legalPath(locale, 'privacy')}>{t('privacyLink')}</a>{t('privacyAfter')}</p>
    </form>
  </section>;
}
