import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { I18nProvider } from '../components/providers/I18nProvider';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Test component
function TestComponent() {
  const { t, locale } = useI18n();
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}

describe('i18n Integration', () => {
  it('should render Hebrew text by default', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByText('השכרה בטוחה של ציוד מקצועי — קרוב אליך, מאומת ומבוטח')).toBeInTheDocument();
    expect(screen.getByText('Current locale: he')).toBeInTheDocument();
  });

  it('should format currency correctly', () => {
    const { formatCurrencyILS } = require('../lib/format');
    
    expect(formatCurrencyILS(100, 'he')).toBe('100 ₪');
    expect(formatCurrencyILS(100, 'en')).toBe('₪100');
  });

  it('should format numbers correctly', () => {
    const { formatNumber } = require('../lib/format');
    
    expect(formatNumber(1234, 'he')).toBe('1,234');
    expect(formatNumber(1234, 'en')).toBe('1,234');
  });
});
