import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';

const CategoryRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
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
    const validatedData = CategoryRequestSchema.parse(body);

    const categoryRequest = await prisma.categoryRequest.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        requesterId: user.sub,
      },
    });

    return NextResponse.json(categoryRequest);
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

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    const categoryRequests = await prisma.categoryRequest.findMany({
      where: {
        requesterId: user.sub,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(categoryRequests);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
