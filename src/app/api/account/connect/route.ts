import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for OWNER role
    const userId = 'temp-user-id' // Replace with actual user ID from session

    // Create Stripe Connect Express account link
    const accountLink = await stripe.accountLinks.create({
      account: userId, // This should be the Stripe Connect account ID
      refresh_url: `${process.env.NEXTAUTH_URL}/dashboard?refresh=true`,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      type: 'account_onboarding'
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    console.error('Error creating Connect link:', error)
    return NextResponse.json({ error: 'Failed to create Connect link' }, { status: 500 })
  }
}
