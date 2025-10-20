/**
 * Lendly Motion System — RTL friendly
 */
import { Easing } from 'react-native-reanimated';

export const duration = { xfast: 120, fast: 180, base: 240, slow: 320, xslow: 420 } as const;
export const easing = {
  in: Easing.bezier(0.32, 0, 0.67, 0),
  out: Easing.bezier(0.33, 1, 0.68, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
} as const;

export const spring = { default: { stiffness: 240, damping: 26, mass: 1 } } as const;

export const patterns = {
  slideInRTL: { xFrom: 24, opacityFrom: 0, duration: duration.fast, easing: easing.out },
  sheetUp: { yFrom: 64, duration: duration.base, easing: easing.out, backdrop: { from: 0, to: 0.5 } },
  scalePop: { from: 0.96, to: 1, spring: spring.default },
  parallaxHeader: { range: [-40, 0], duration: duration.slow, easing: easing.out },
  countUp: { duration: duration.slow, easing: easing.out },
  shimmer: { duration: 1100 },
} as const;

export const haptics = { tap: 'light', primary: 'medium', success: 'success', error: 'error' } as const;
export const reducedMotion = { factor: 0.6 } as const;

export type DurationKey = keyof typeof duration;
