export const locales = ['en', 'es-MX', 'fr-CA', 'ar-AE'] as const;

export type Locale = (typeof locales)[number];
