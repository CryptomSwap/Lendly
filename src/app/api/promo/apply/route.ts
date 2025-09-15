import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    const promoCode = await prisma.promoCode.findUnique({
      where: { code }
    })

    if (!promoCode || !promoCode.isActive) {
      return NextResponse.json({ error: 'Invalid promo code' }, { status: 400 })
    }

    if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
      return NextResponse.json({ error: 'Promo code usage limit reached' }, { status: 400 })
    }

    if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
      return NextResponse.json({ error: 'Promo code expired' }, { status: 400 })
    }

    return NextResponse.json({
      discount: promoCode.discount,
      code: promoCode.code
    })
  } catch (error) {
    console.error('Error applying promo code:', error)
    return NextResponse.json({ error: 'Failed to apply promo code' }, { status: 500 })
  }
}
