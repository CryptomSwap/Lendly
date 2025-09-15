import { NextRequest, NextResponse } from 'next/server'
import { markUserVerified, markUserRejected } from '@/lib/persona'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, status, riskScore } = body

    if (status === 'verified') {
      await markUserVerified(userId, riskScore)
    } else if (status === 'rejected') {
      await markUserRejected(userId, riskScore)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating verification status:', error)
    return NextResponse.json({ error: 'Failed to update verification' }, { status: 500 })
  }
}
