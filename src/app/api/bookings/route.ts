import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import { calcPricing } from '@/lib/pricing'
import { isDateRangeAvailable, calculateDaysBetween } from '@/lib/availability'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, startDate, endDate, insuranceEnabled, promoCode } = body

    // TODO: Add authentication check
    const renterId = 'temp-renter-id' // Replace with actual user ID from session

    // Get item details
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        owner: true,
        availability: true
      }
    })

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Check availability
    const requestedStart = new Date(startDate)
    const requestedEnd = new Date(endDate)
    
    if (!isDateRangeAvailable(requestedStart, requestedEnd, item.availability)) {
      return NextResponse.json({ error: 'Item not available for selected dates' }, { status: 400 })
    }

    // Calculate pricing
    const days = calculateDaysBetween(requestedStart, requestedEnd)
    const pricing = calcPricing(item.dailyPrice, days, insuranceEnabled)

    // Apply promo code if provided
    let promoDiscount = 0
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { code: promoCode }
      })
      
      if (promo && promo.isActive && (promo.maxUses === null || promo.usedCount < promo.maxUses)) {
        promoDiscount = promo.discount
      }
    }

    const finalTotal = Math.max(0, pricing.total - promoDiscount)

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        itemId,
        renterId,
        ownerId: item.ownerId,
        startDate: requestedStart,
        endDate: requestedEnd,
        totalDays: days,
        subtotal: pricing.subtotal,
        insurance: pricing.insurance,
        fee: pricing.serviceFee,
        total: finalTotal,
        deposit: item.deposit,
        promoCode: promoCode || null,
        promoDiscount,
        insuranceEnabled
      }
    })

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(finalTotal),
      currency: 'ils',
      metadata: {
        bookingId: booking.id,
        itemId: item.id,
        renterId
      }
    })

    // Update booking with payment intent ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripePaymentIntentId: paymentIntent.id }
    })

    return NextResponse.json({
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
