/**
 * Lendly Design System — Minimal Premium (Glass)
 */

export const theme = {
  colors: {
    bg: '#F6F7F9',
    surface: '#FFFFFF',
    surfaceElev: '#F2F4F7',
    text: {
      primary: '#0F172A',
      inverse: '#E2E8F0',
      muted: '#64748B',
    },
    muted: '#CBD5E1',
    accent: '#0EA5A5',
    accentAlt: '#7C3AED',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  radii: {
    md: 14,
    xl: 22,
    '3xl': 28,
    full: 9999,
  },
  elevation: {
    e1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    e2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 4,
    },
    e3: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  glass: {
    blur: 20,
    border: 'rgba(255,255,255,0.6)',
    background: 'rgba(255,255,255,0.55)',
    darkBackground: 'rgba(15,23,42,0.35)',
  },
  gradients: {
    primary: ['#0EA5A5', '#0891B2'],
    alt: ['#7C3AED', '#A855F7'],
    success: ['#22C55E', '#16A34A'],
    progress: ['#0EA5A5', '#7C3AED'],
  },
} as const;

export type Theme = typeof theme;
