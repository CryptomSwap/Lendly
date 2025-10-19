import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            verified: true,
            phone: true,
          },
        },
        availability: true,
        bookings: {
          where: {
            status: {
              in: ['RESERVED', 'CONFIRMED', 'PICKED_UP'],
            },
          },
        },
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Not found', message: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
