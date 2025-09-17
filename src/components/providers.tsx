'use client'

import { SessionProvider, useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'

function AutoSignIn() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // Auto-signin for demo purposes
    if (status === 'unauthenticated') {
      signIn('credentials', {
        email: 'demo@lendly.com',
        password: 'demo',
        redirect: false,
      })
    }
  }, [status])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AutoSignIn />
      {children}
    </SessionProvider>
  )
}
