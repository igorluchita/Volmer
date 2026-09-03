export const siteConfig = {
  brandName: 'Volmer',
  demoMode: false,
  legalName: 'Denumirea juridică a companiei',
  phone: '079331839',
  phoneDisplay: '079 331 839',
  phoneInternational: '+37379331839',
  email: 'expert@volmer.md',
  address: 'Str. Mitropolit Varlaam 69',
  city: 'Chișinău',
  country: 'Republica Moldova',
  businessHours: [
    {id: 'weekdays', daysKey: 'weekdays', hours: '09:00–18:00'},
    {id: 'lunch', daysKey: 'lunchBreak', hours: '13:00–14:00'},
    {id: 'saturday', daysKey: 'saturday', hours: '09:00–13:00'},
    {id: 'sunday', daysKey: 'sunday', hoursKey: 'closed'}
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://volmer.md',
  googleMapsEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? '',
  googleMapsDirectionsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL ?? 'https://maps.google.com/?q=Str.%20Mitropolit%20Varlaam%2069%2C%20Chi%C8%99in%C4%83u',
  logoPath: '/logo-volmer-clean.png',
  faviconPath: '/favicon.png',
  services: [
    {id: 'hearing-evaluation', titleKey: 'evaluation.title', descriptionKey: 'evaluation.description'},
    {id: 'hearing-aid-consultation', titleKey: 'consultation.title', descriptionKey: 'consultation.description'},
    {id: 'adjustment', titleKey: 'adjustment.title', descriptionKey: 'adjustment.description'},
    {id: 'service', titleKey: 'service.title', descriptionKey: 'service.description'}
  ]
} as const;

export const site = siteConfig;
