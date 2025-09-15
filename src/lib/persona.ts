import { prisma } from './prisma'

export async function markUserVerified(userId: string, riskScore?: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      verificationStatus: 'VERIFIED',
      riskScore: riskScore || 0
    }
  })
}

export async function markUserRejected(userId: string, riskScore?: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      verificationStatus: 'REJECTED',
      riskScore: riskScore || 100
    }
  })
}
