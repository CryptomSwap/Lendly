import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  providers: [
    // Add your authentication providers here
    // For now, we'll use a simple mock provider
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
  // Add secret to prevent runtime errors
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
