import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';

const ManualPaymentSchema = z.object({
  bookingId: z.string(),
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

    // Check if user is admin or owner of the item
    if (user.role !== 'ADMIN') {
      const body = await request.json();
      const { bookingId } = ManualPaymentSchema.parse(body);

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { item: true },
      });

      if (!booking || booking.item.ownerId !== user.sub) {
        return NextResponse.json(
          { error: 'Forbidden', message: 'Only item owners or admins can confirm payments' },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { bookingId } = ManualPaymentSchema.parse(body);

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
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
        renter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(updatedBooking);
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
