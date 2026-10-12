import {appointmentConfig} from '@/config/appointments';
import {siteConfig} from '@/config/site';

export function StructuredData() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const data = [
    {'@context': 'https://schema.org', '@type': 'Organization', name: 'Volmer', url: siteConfig.siteUrl, email: siteConfig.email, telephone: siteConfig.phoneInternational},
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Volmer',
      url: siteConfig.siteUrl,
      email: siteConfig.email,
      telephone: siteConfig.phoneInternational,
      address: {'@type': 'PostalAddress', streetAddress: siteConfig.address, addressLocality: siteConfig.city, addressCountry: 'MD'},
      openingHoursSpecification: [
        {'@type': 'OpeningHoursSpecification', dayOfWeek: weekdays, opens: appointmentConfig.weekdayHours.open, closes: appointmentConfig.weekdayBreak.start},
        {'@type': 'OpeningHoursSpecification', dayOfWeek: weekdays, opens: appointmentConfig.weekdayBreak.end, closes: appointmentConfig.weekdayHours.close},
        {'@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: appointmentConfig.saturdayHours.open, closes: appointmentConfig.saturdayHours.close}
      ]
    }
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}
