import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, rating, comment } = body

    // TODO: Add authentication check
    const reviewerId = 'temp-reviewer-id' // Replace with actual user ID from session

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { item: true }
    })

    if (!booking || booking.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Booking not found or not completed' }, { status: 400 })
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        bookingId,
        reviewerId,
        revieweeId: booking.ownerId,
        itemId: booking.itemId,
        rating,
        comment
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
