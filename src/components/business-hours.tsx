import {getTranslations} from 'next-intl/server';

import {siteConfig} from '@/config/site';
import {appointmentConfig} from '@/config/appointments';

export async function BusinessHours({className = '', showWeekdayBreak = false}: {className?: string; showWeekdayBreak?: boolean}) {
  const t = await getTranslations('BusinessHours');
  return <dl className={`business-hours ${className}`.trim()}>
    {siteConfig.businessHours.map(item => <div key={item.id}>
      <dt>{t(item.daysKey)}</dt>
      <dd>{'hours' in item ? item.hours : t(item.hoursKey)}{showWeekdayBreak && item.id === 'weekdays' && <small className="business-hours-break">{t('break')}: {appointmentConfig.weekdayBreak.start}–{appointmentConfig.weekdayBreak.end}</small>}</dd>
    </div>)}
  </dl>;
}
