'use client'

import { createContext, useContext, ReactNode } from 'react';
import { Locale } from './config';
import { he } from './dictionaries/he';
import { en } from './dictionaries/en';

const dictionaries = {
  he,
  en,
} as const;

type Dictionary = typeof he;

interface I18nContextType {
  locale: Locale;
  t: (key: keyof Dictionary, vars?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslation() {
  return useI18n();
}

/**
 * Translation function with variable interpolation
 */
export function createTFunction(locale: Locale) {
  const dict = dictionaries[locale];
  
  return (key: keyof Dictionary, vars?: Record<string, string | number>): string => {
    let text = dict[key] as string;
    
    if (vars) {
      Object.entries(vars).forEach(([varKey, value]) => {
        text = text.replace(new RegExp(`{${varKey}}`, 'g'), String(value));
      });
    }
    
    return text;
  };
}

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export function I18nProvider({ children, locale, setLocale }: I18nProviderProps) {
  const t = createTFunction(locale);
  
  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export { dictionaries };
export type { Dictionary };
export { getLocaleFromSearchParams } from './config';