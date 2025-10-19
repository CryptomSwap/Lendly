import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, createAccessToken } from '@/lib/auth';
import { z } from 'zod';

const RefreshSchema = z.object({
  refreshToken: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = RefreshSchema.parse(body);

    // Verify refresh token
    const { verifyRefreshToken } = await import('@/lib/auth');
    const payload = await verifyRefreshToken(refreshToken);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid refresh token', message: 'Refresh token is invalid or expired' },
        { status: 401 }
      );
    }

    // Check if refresh token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invalid refresh token', message: 'Refresh token is invalid or expired' },
        { status: 401 }
      );
    }

    // Create new access token
    const accessToken = await createAccessToken({
      sub: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    return NextResponse.json({
      accessToken,
      user: {
        id: storedToken.user.id,
        email: storedToken.user.email,
        name: storedToken.user.name,
        phone: storedToken.user.phone,
        role: storedToken.user.role,
        verified: storedToken.user.verified,
        createdAt: storedToken.user.createdAt,
        updatedAt: storedToken.user.updatedAt,
      },
    });
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
