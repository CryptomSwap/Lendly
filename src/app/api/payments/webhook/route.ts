import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        const bookingId = paymentIntent.metadata.bookingId

        if (bookingId) {
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              status: 'CONFIRMED',
              paymentStatus: 'PAID'
            }
          })

          console.log(`✅ Booking ${bookingId} confirmed and paid`)
        }
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        const failedBookingId = failedPayment.metadata.bookingId

        if (failedBookingId) {
          await prisma.booking.update({
            where: { id: failedBookingId },
            data: {
              status: 'CANCELLED',
              paymentStatus: 'FAILED'
            }
          })

          console.log(`❌ Booking ${failedBookingId} payment failed`)
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
