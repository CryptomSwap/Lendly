/**
 * Lendly Typography — Hebrew tuned
 */

export const typography = {
  display: { fontSize: 34, lineHeight: 48, fontWeight: '800' as const, letterSpacing: -0.25 },
  h1: { fontSize: 28, lineHeight: 40, fontWeight: '700' as const, letterSpacing: -0.2 },
  h2: { fontSize: 22, lineHeight: 32, fontWeight: '700' as const, letterSpacing: -0.15 },
  body: { fontSize: 17, lineHeight: 26, fontWeight: '400' as const, letterSpacing: -0.1 },
  body18: { fontSize: 18, lineHeight: 28, fontWeight: '400' as const, letterSpacing: -0.1 },
  caption: { fontSize: 13, lineHeight: 20, fontWeight: '400' as const, letterSpacing: -0.05 },
  families: {
    primary: 'Rubik',
    secondary: 'Heebo',
  },
} as const;

export type Typography = typeof typography;


