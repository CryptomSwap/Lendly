import { Locale } from '../i18n/config';

/**
 * Format currency in ILS with proper RTL support
 */
export function formatCurrencyILS(amount: number, locale: Locale = 'he'): string {
  const formatter = new Intl.NumberFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatted = formatter.format(amount);
  
  // For Hebrew, ensure ₪ symbol is on the right side
  if (locale === 'he') {
    return formatted.replace(/₪\s*/, '') + ' ₪';
  }
  
  return formatted;
}

/**
 * Format date with proper locale support
 */
export function formatDate(date: Date, locale: Locale = 'he'): string {
  const formatter = new Intl.DateTimeFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(date);
}

/**
 * Format date range
 */
export function formatDateRange(startDate: Date, endDate: Date, locale: Locale = 'he'): string {
  const start = formatDate(startDate, locale);
  const end = formatDate(endDate, locale);
  
  if (locale === 'he') {
    return `${start} - ${end}`;
  }
  
  return `${start} - ${end}`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date, locale: Locale = 'he'): string {
  const rtf = new Intl.RelativeTimeFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    numeric: 'auto',
  });

  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return rtf.format(diffInDays, 'day');
}

/**
 * Format number with proper locale support
 */
export function formatNumber(number: number, locale: Locale = 'he'): string {
  return new Intl.NumberFormat(locale === 'he' ? 'he-IL' : 'en-US').format(number);
}

/**
 * Format distance in kilometers
 */
export function formatDistance(km: number, locale: Locale = 'he'): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return locale === 'he' ? `${meters} מ` : `${meters}m`;
  }
  
  const roundedKm = Math.round(km * 10) / 10;
  return locale === 'he' ? `${roundedKm} ק"מ` : `${roundedKm}km`;
}

/**
 * Format duration in days
 */
export function formatDuration(days: number, locale: Locale = 'he'): string {
  if (days === 1) {
    return locale === 'he' ? 'יום אחד' : '1 day';
  }
  
  return locale === 'he' ? `${days} ימים` : `${days} days`;
}
