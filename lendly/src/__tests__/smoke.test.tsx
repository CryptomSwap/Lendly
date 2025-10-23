import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { I18nProvider } from '@/i18n';
import SignInPage from '@/app/(auth)/sign-in/page';
import SignUpPage from '@/app/(auth)/sign-up/page';

// Mock fetch
global.fetch = vi.fn();

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>
        <I18nProvider locale="he" setLocale={() => {}}>
          {children}
        </I18nProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sign-in form with Hebrew labels', () => {
    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    expect(screen.getByText('התחברות')).toBeInTheDocument();
    expect(screen.getByLabelText('אימייל')).toBeInTheDocument();
    expect(screen.getByLabelText('סיסמה')).toBeInTheDocument();
  });

  it('should render sign-up form with Hebrew labels', () => {
    render(
      <TestWrapper>
        <SignUpPage />
      </TestWrapper>
    );

    expect(screen.getByText('הרשמה')).toBeInTheDocument();
    expect(screen.getByLabelText('שם מלא')).toBeInTheDocument();
    expect(screen.getByLabelText('אימייל')).toBeInTheDocument();
    expect(screen.getByLabelText('סיסמה')).toBeInTheDocument();
  });

  it('should handle sign-up form submission', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, userId: 'test-user-id' }),
    } as Response);

    render(
      <TestWrapper>
        <SignUpPage />
      </TestWrapper>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText('שם מלא'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('סיסמה'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('אישור סיסמה'), { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(screen.getByText('הרשמה'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        }),
      });
    });
  });

  it('should handle sign-in form submission', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('סיסמה'), { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(screen.getByText('התחברות'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
    });
  });
});

describe('Booking Flow', () => {
  it('should handle booking creation API call', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, bookingId: 'test-booking-id' }),
    } as Response);

    const bookingData = {
      itemId: 'test-item-id',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-03T00:00:00Z',
      insurance: true,
      pickupMethod: 'pickup',
    };

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    expect(result.ok).toBe(true);
    expect(result.bookingId).toBe('test-booking-id');
  });
});

describe('Deposit Calculation', () => {
  it('should calculate deposit amount correctly', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        depositAmount: 1000,
        riskFactors: ['Weather damage', 'Equipment wear'],
        deductible: 100,
        claimWindow: '72-48 hours',
      }),
    } as Response);

    const depositData = {
      itemId: 'test-item',
      category: 'GARDENING',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-03T00:00:00Z',
      insurance: false,
      pickupMethod: 'pickup',
    };

    const response = await fetch('/api/risk/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(depositData),
    });

    const result = await response.json();
    expect(result.depositAmount).toBe(1000);
    expect(result.riskFactors).toHaveLength(2);
  });
});
