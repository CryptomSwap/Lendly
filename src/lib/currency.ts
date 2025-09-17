// Currency formatting utilities for ILS (Israeli Shekel) with tabular numbers

export function formatPricePerDay(priceInAgorot: number): string {
  const shekels = priceInAgorot / 100
  return `₪${shekels.toFixed(0)}`
}

export function formatDeposit(depositInAgorot: number): string {
  const shekels = depositInAgorot / 100
  return `₪${shekels.toFixed(0)}`
}

export function formatPrice(priceInAgorot: number, showDecimals: boolean = false): string {
  const shekels = priceInAgorot / 100
  if (showDecimals) {
    return `₪${shekels.toFixed(2)}`
  }
  return `₪${shekels.toFixed(0)}`
}

export function formatPriceRange(minPrice: number, maxPrice: number): string {
  const minShekels = minPrice / 100
  const maxShekels = maxPrice / 100
  return `₪${minShekels.toFixed(0)} - ₪${maxShekels.toFixed(0)}`
}

// Format price with tabular numbers for consistent alignment
export function formatPriceTabular(priceInAgorot: number): string {
  const shekels = priceInAgorot / 100
  return `₪${shekels.toFixed(0)}`
}

// Convert USD to ILS (approximate rate)
export function convertUsdToIls(usdAmount: number, rate: number = 3.7): number {
  return Math.round(usdAmount * rate * 100) // Convert to agorot
}

// Convert ILS to USD (approximate rate)
export function convertIlsToUsd(ilsAmount: number, rate: number = 3.7): number {
  return ilsAmount / 100 / rate
}