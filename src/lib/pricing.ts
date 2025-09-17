import { PricingBreakdown } from './types';

/**
 * Calculate pricing breakdown for a booking
 * @param dailyPriceILS Daily price in ILS
 * @param days Number of days
 * @param addInsurance Whether to add insurance
 * @returns Pricing breakdown object
 */
export function calculatePricing(
  dailyPriceILS: number,
  days: number,
  addInsurance: boolean = false
): PricingBreakdown {
  const subtotal = dailyPriceILS * days;
  const insurance = addInsurance ? Math.round(subtotal * 0.05) : 0;
  const serviceFee = Math.round(subtotal * 0.18);
  const total = subtotal + insurance + serviceFee;
  const deposit = Math.round(dailyPriceILS * 0.5); // 50% of daily price as deposit

  return {
    subtotal,
    insurance,
    serviceFee,
    total,
    deposit,
  };
}

/**
 * Format price for display
 * @param price Price in ILS
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return `₪${price.toLocaleString()}`;
}

/**
 * Format distance for display
 * @param distanceKm Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distanceKm: number): string {
  return `${distanceKm} km`;
}

/**
 * Alias for calculatePricing (for backward compatibility)
 */
export const calcPricing = calculatePricing;

/**
 * Calculate number of days between two dates
 * @param startDate Start date string (ISO format)
 * @param endDate End date string (ISO format)
 * @returns Number of days
 */
export function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}