import NextAuth from 'next-auth'
import { UserRole, VerificationStatus } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: UserRole
      verificationStatus: VerificationStatus
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    role: UserRole
    verificationStatus: VerificationStatus
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    verificationStatus: VerificationStatus
  }
}
