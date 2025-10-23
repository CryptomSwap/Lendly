import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';
import { calculateTotalDays, getBookingExpiration } from '@lendly/shared';

const CreateBookingSchema = z.object({
  itemId: z.string(),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  pickupMethod: z.enum(['SELF_PICKUP', 'COURIER', 'LOCKER']).default('SELF_PICKUP'),
  insuranceEnabled: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = CreateBookingSchema.parse(body);

    // Get item details
    const item = await prisma.item.findUnique({
      where: { id: validatedData.itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Not found', message: 'Item not found' },
        { status: 404 }
      );
    }

    // Check availability
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        itemId: validatedData.itemId,
        status: {
          in: ['RESERVED', 'CONFIRMED', 'PICKED_UP'],
        },
        OR: [
          {
            startDate: {
              lte: validatedData.endDate,
            },
            endDate: {
              gte: validatedData.startDate,
            },
          },
        ],
      },
    });

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Conflict', message: 'Item is not available for the selected dates' },
        { status: 409 }
      );
    }

    // Calculate pricing
    const totalDays = calculateTotalDays(validatedData.startDate, validatedData.endDate);
    const subtotalILS = item.dailyPriceILS * totalDays;
    
    // Simple deposit calculation (20% of rental)
    const depositILS = Math.round(subtotalILS * 0.2);
    const totalPriceILS = subtotalILS;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        itemId: validatedData.itemId,
        renterId: user.sub,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        totalPriceILS,
        depositILS,
        pickupMethod: validatedData.pickupMethod,
        insuranceEnabled: validatedData.insuranceEnabled,
        expiresAt: getBookingExpiration(),
        status: 'RESERVED',
        paymentStatus: 'UNPAID',
      },
      include: {
        item: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                verified: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', message: error.errors[0].message },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
