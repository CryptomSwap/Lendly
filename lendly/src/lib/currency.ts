// Currency formatting utilities for Lendly

/**
 * Format number as Israeli Shekel (ILS) currency
 * @param amount Amount in ILS
 * @param options Formatting options
 * @returns Formatted currency string
 */
export function formatILS(
  amount: number,
  options: {
    showSymbol?: boolean
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    tabularNums?: boolean
  } = {}
): string {
  const {
    showSymbol = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    tabularNums = true
  } = options

  const formatter = new Intl.NumberFormat('he-IL', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'ILS',
    minimumFractionDigits,
    maximumFractionDigits,
    // Use tabular numbers for consistent alignment
    ...(tabularNums && {
      numberingSystem: 'latn'
    })
  })

  return formatter.format(amount)
}

/**
 * Format price per day with currency
 * @param amount Amount in ILS
 * @returns Formatted price string
 */
export function formatPricePerDay(amount: number): string {
  return `${formatILS(amount)}/day`
}

/**
 * Format deposit amount with currency
 * @param amount Amount in ILS
 * @returns Formatted deposit string
 */
export function formatDeposit(amount: number): string {
  return `+${formatILS(amount)} deposit`
}

/**
 * Format price range
 * @param min Minimum price
 * @param max Maximum price
 * @returns Formatted range string
 */
export function formatPriceRange(min: number, max: number): string {
  if (min === max) {
    return formatILS(min)
  }
  return `${formatILS(min)} - ${formatILS(max)}`
}

/**
 * Parse currency string to number
 * @param currencyString Currency string (e.g., "₪150" or "150₪")
 * @returns Number or null if invalid
 */
export function parseCurrency(currencyString: string): number | null {
  // Remove currency symbols and whitespace
  const cleaned = currencyString
    .replace(/[₪$€£¥₹]/g, '')
    .replace(/,/g, '')
    .trim()
  
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? null : parsed
}

/**
 * Calculate total booking cost
 * @param pricePerDay Daily price
 * @param days Number of days
 * @param insuranceFee Insurance fee percentage (default: 0.05)
 * @param platformFee Platform fee percentage (default: 0.18)
 * @returns Booking cost breakdown
 */
export function calculateBookingCost(
  pricePerDay: number,
  days: number,
  insuranceFee: number = 0.05,
  platformFee: number = 0.18
): {
  subtotal: number
  insurance: number
  platformFee: number
  total: number
} {
  const subtotal = pricePerDay * days
  const insurance = subtotal * insuranceFee
  const platformFeeAmount = subtotal * platformFee
  const total = subtotal + insurance + platformFeeAmount

  return {
    subtotal,
    insurance,
    platformFee: platformFeeAmount,
    total
  }
}

/**
 * Format booking cost breakdown
 * @param cost Cost breakdown object
 * @returns Formatted breakdown
 */
export function formatBookingCost(cost: {
  subtotal: number
  insurance: number
  platformFee: number
  total: number
}): {
  subtotal: string
  insurance: string
  platformFee: string
  total: string
} {
  return {
    subtotal: formatILS(cost.subtotal),
    insurance: formatILS(cost.insurance),
    platformFee: formatILS(cost.platformFee),
    total: formatILS(cost.total)
  }
}

/**
 * Get currency symbol
 * @returns Currency symbol
 */
export function getCurrencySymbol(): string {
  return '₪'
}

/**
 * Check if amount is valid (positive number)
 * @param amount Amount to validate
 * @returns True if valid
 */
export function isValidAmount(amount: number): boolean {
  return typeof amount === 'number' && amount >= 0 && !isNaN(amount)
}

/**
 * Round to nearest shekel
 * @param amount Amount to round
 * @returns Rounded amount
 */
export function roundToShekel(amount: number): number {
  return Math.round(amount)
}

/**
 * Format large numbers with K/M suffixes
 * @param amount Amount to format
 * @returns Formatted string
 */
export function formatCompactAmount(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`
  }
  return amount.toString()
}

/**
 * Format percentage
 * @param percentage Percentage as decimal (e.g., 0.05 for 5%)
 * @returns Formatted percentage string
 */
export function formatPercentage(percentage: number): string {
  return `${(percentage * 100).toFixed(1)}%`
}