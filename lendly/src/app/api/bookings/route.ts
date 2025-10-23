import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';

const bookingSchema = z.object({
  itemId: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  insurance: z.boolean().default(false),
  pickupMethod: z.enum(['pickup', 'delivery']).default('pickup'),
  specialRequests: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { itemId, startDate, endDate, insurance, pickupMethod, specialRequests } = bookingSchema.parse(body);

    // Get the item and owner
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { owner: true },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Calculate pricing
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    const subtotal = item.dailyPriceILS * days;
    const insuranceCost = insurance ? Math.round(subtotal * 0.1) : 0; // 10% insurance
    const platformFee = Math.round(subtotal * 0.05); // 5% platform fee
    const total = subtotal + insuranceCost + platformFee;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        itemId,
        renterId: session.user.id,
        ownerId: item.ownerId,
        startDate: start,
        endDate: end,
        subtotalILS: subtotal,
        insuranceILS: insuranceCost,
        platformFeeILS: platformFee,
        depositILS: item.depositILS,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { ok: true, bookingId: booking.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
