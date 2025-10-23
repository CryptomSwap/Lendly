export const i18nConfig = {
  defaultLocale: 'he' as const,
  locales: ['he', 'en'] as const,
} as const;

export type Locale = typeof i18nConfig.locales[number];

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

export function getLocaleFromSearchParams(searchParams: URLSearchParams): Locale {
  const lang = searchParams.get('lang');
  return isValidLocale(lang) ? lang : i18nConfig.defaultLocale;
}
