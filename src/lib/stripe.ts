import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true
})

export const formatAmountForStripe = (amount: number): number => {
  // Convert ILS agorot to shekels for Stripe (Stripe expects shekels, not agorot)
  return Math.round(amount / 100)
}

export const formatAmountFromStripe = (amount: number): number => {
  // Convert shekels from Stripe to ILS agorot
  return Math.round(amount * 100)
}
