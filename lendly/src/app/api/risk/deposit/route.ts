import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const depositSchema = z.object({
  itemId: z.string(),
  category: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  insurance: z.boolean().default(false),
  pickupMethod: z.enum(['pickup', 'delivery']).default('pickup'),
});

// Risk factors by category
const riskFactors = {
  GARDENING: {
    baseDeposit: 500,
    riskMultiplier: 1.0,
    factors: ['Weather damage', 'Soil contamination', 'Wear and tear'],
  },
  CONSTRUCTION: {
    baseDeposit: 2000,
    riskMultiplier: 1.5,
    factors: ['Heavy usage', 'Safety hazards', 'Equipment damage'],
  },
  EVENTS: {
    baseDeposit: 1000,
    riskMultiplier: 1.2,
    factors: ['High traffic', 'Potential misuse', 'Setup complexity'],
  },
  DRONE: {
    baseDeposit: 3000,
    riskMultiplier: 2.0,
    factors: ['Flight risks', 'Weather sensitivity', 'Technical complexity'],
  },
  CAMERA: {
    baseDeposit: 1500,
    riskMultiplier: 1.3,
    factors: ['Precision equipment', 'Environmental exposure', 'Technical handling'],
  },
  LENS: {
    baseDeposit: 2000,
    riskMultiplier: 1.4,
    factors: ['Optical precision', 'Fragile components', 'Professional use'],
  },
  POWER_TOOL: {
    baseDeposit: 800,
    riskMultiplier: 1.1,
    factors: ['Heavy usage', 'Safety requirements', 'Maintenance needs'],
  },
  CAMPING: {
    baseDeposit: 300,
    riskMultiplier: 0.8,
    factors: ['Outdoor exposure', 'Weather conditions', 'General wear'],
  },
  AUDIO_PA: {
    baseDeposit: 1200,
    riskMultiplier: 1.2,
    factors: ['Technical complexity', 'Volume damage risk', 'Setup requirements'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, category, startDate, endDate, insurance, pickupMethod } = depositSchema.parse(body);

    // Calculate duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Get risk factors for category
    const categoryRisk = riskFactors[category as keyof typeof riskFactors] || riskFactors.GARDENING;

    // Calculate base deposit
    let deposit = categoryRisk.baseDeposit;

    // Apply duration multiplier (longer rentals = higher risk)
    if (days > 7) {
      deposit *= 1.2;
    } else if (days > 3) {
      deposit *= 1.1;
    }

    // Apply pickup method multiplier
    if (pickupMethod === 'delivery') {
      deposit *= 1.1; // 10% higher for delivery
    }

    // Apply insurance discount
    if (insurance) {
      deposit *= 0.8; // 20% discount with insurance
    }

    // Round to nearest 50
    deposit = Math.round(deposit / 50) * 50;

    return NextResponse.json({
      depositAmount: deposit,
      riskFactors: categoryRisk.factors,
      deductible: Math.round(deposit * 0.1), // 10% deductible
      claimWindow: '72-48 hours',
      explanation: {
        baseAmount: categoryRisk.baseDeposit,
        durationMultiplier: days > 7 ? 1.2 : days > 3 ? 1.1 : 1.0,
        pickupMultiplier: pickupMethod === 'delivery' ? 1.1 : 1.0,
        insuranceDiscount: insurance ? 0.8 : 1.0,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Deposit calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}