import posthog from 'posthog-js'

export function initAnalytics() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })
  }
}

export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

// Key events for Lendly
export const analyticsEvents = {
  LIST_ITEM_PUBLISHED: 'list_item_published',
  SEARCH_PERFORMED: 'search_performed', 
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_SUCCEEDED: 'payment_succeeded',
  BOOKING_CONFIRMED: 'booking_confirmed',
  DEPOSIT_HOLD_SUCCEEDED: 'deposit_hold_succeeded',
  PROMO_APPLIED: 'promo_applied'
} as const
