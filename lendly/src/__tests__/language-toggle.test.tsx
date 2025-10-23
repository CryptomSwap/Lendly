import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nProvider } from '../components/providers/I18nProvider';
import { Navbar } from '../components/home/Navbar';

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

describe('Language Toggle', () => {
  it('should render Hebrew by default', () => {
    render(
      <I18nProvider>
        <Navbar />
      </I18nProvider>
    );

    expect(screen.getByText('עב')).toBeInTheDocument();
    expect(screen.getByLabelText('החלף לאנגלית')).toBeInTheDocument();
  });

  it('should toggle language when clicked', () => {
    render(
      <I18nProvider>
        <Navbar />
      </I18nProvider>
    );

    const toggleButton = screen.getByLabelText('החלף לאנגלית');
    fireEvent.click(toggleButton);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to Hebrew')).toBeInTheDocument();
  });

  it('should update URL when language changes', () => {
    render(
      <I18nProvider>
        <Navbar />
      </I18nProvider>
    );

    const toggleButton = screen.getByLabelText('החלף לאנגלית');
    fireEvent.click(toggleButton);

    expect(mockPush).toHaveBeenCalledWith('/?lang=en');
  });
});
