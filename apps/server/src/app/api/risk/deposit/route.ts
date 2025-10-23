import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { assessRisk } from '@lendly/shared';
import { z } from 'zod';

const RiskAssessmentSchema = z.object({
  itemId: z.string(),
  category: z.enum(['DRONE', 'CAMERA', 'POWER_TOOL', 'EVENTS', 'OTHER']),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  pickupMethod: z.enum(['SELF_PICKUP', 'COURIER', 'LOCKER']),
  insuranceEnabled: z.boolean(),
  renterVerified: z.boolean(),
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
    const validatedData = RiskAssessmentSchema.parse(body);

    // Perform risk assessment
    const assessment = assessRisk({
      category: validatedData.category,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      pickupMethod: validatedData.pickupMethod,
      insuranceEnabled: validatedData.insuranceEnabled,
      renterVerified: validatedData.renterVerified,
    });

    return NextResponse.json({
      depositILS: assessment.finalDepositILS,
      factors: assessment.factors,
      explanation: assessment.factors.map(f => f.description).join(', '),
      deductibleILS: assessment.deductibleILS,
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
