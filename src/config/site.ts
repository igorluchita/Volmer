import {appointmentConfig} from './appointments';
import {createQuickContactLinks} from './contact-links';
const companyPhoneInternational = '+37379331839';
const quickContact = createQuickContactLinks(companyPhoneInternational, process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? '');

export const siteConfig = {
  brandName: 'Volmer',
  demoMode: false,
  // TODO(business): Fill only after the registered legal entity is verified.
  legalName: null,
  phone: '079331839',
  phoneDisplay: '079 331 839',
  phoneInternational: companyPhoneInternational,
  email: 'expert@volmer.md',
  address: 'Str. Mitropolit Varlaam 69',
  city: 'Chișinău',
  country: 'Republica Moldova',
  businessHours: [
    {id: 'weekdays', daysKey: 'weekdays', hours: `${appointmentConfig.weekdayHours.open}–${appointmentConfig.weekdayHours.close}`},
    {id: 'saturday', daysKey: 'saturday', hours: `${appointmentConfig.saturdayHours.open}–${appointmentConfig.saturdayHours.close}`},
    {id: 'sunday', daysKey: 'sunday', hoursKey: 'closed'}
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://volmer.md',
  googleMapsEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? '',
  googleMapsDirectionsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL?.trim() || 'https://www.google.com/maps/search/?api=1&query=Str.%20Mitropolit%20Varlaam%2069%2C%20Chi%C8%99in%C4%83u%2C%20Moldova',
  quickContact,
  logoPath: '/images/brand/volmer-logo.jpg',
  faviconPath: '/favicon.png',
  services: [
    {id: 'hearing-evaluation', titleKey: 'evaluation.title', descriptionKey: 'evaluation.description'},
    {id: 'hearing-aid-consultation', titleKey: 'consultation.title', descriptionKey: 'consultation.description'},
    {id: 'adjustment', titleKey: 'adjustment.title', descriptionKey: 'adjustment.description'},
    {id: 'service', titleKey: 'service.title', descriptionKey: 'service.description'}
  ]
} as const;

export const site = siteConfig;
