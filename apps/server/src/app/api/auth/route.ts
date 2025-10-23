import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // Mock authentication for demo
    if (email === 'demo@lendly.co.il' && password === 'demo123') {
      return NextResponse.json({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: {
          id: 'demo-user-id',
          email: 'demo@lendly.co.il',
          name: 'דוד כהן',
          phone: '050-1234567',
          role: 'RENTER',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials', message: 'שגיאה בהתחברות' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation error', message: 'קלט לא תקין' },
      { status: 422 }
    );
  }
}