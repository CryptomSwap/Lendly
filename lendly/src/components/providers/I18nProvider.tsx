'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { I18nProvider as BaseI18nProvider, Locale, getLocaleFromSearchParams } from '@/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('he');

  useEffect(() => {
    const currentLocale = getLocaleFromSearchParams(searchParams);
    setLocale(currentLocale);
    
    // Update HTML attributes
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === 'he' ? 'rtl' : 'ltr';
  }, [searchParams]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    
    // Update URL with new locale
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLocale);
    router.push(url.pathname + url.search);
    
    // Update HTML attributes
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <BaseI18nProvider locale={locale} setLocale={handleSetLocale}>
      {children}
    </BaseI18nProvider>
  );
}