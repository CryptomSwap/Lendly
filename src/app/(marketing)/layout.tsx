import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { getLocaleFromSearchParams, getDirection } from '@/lib/i18n'
import { Suspense } from 'react'

interface MarketingLayoutProps {
  children: React.ReactNode
  params: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MarketingLayout({ 
  children, 
  searchParams 
}: MarketingLayoutProps) {
  const resolvedSearchParams = await searchParams
  const locale = getLocaleFromSearchParams(new URLSearchParams(resolvedSearchParams as Record<string, string>))
  const direction = getDirection(locale)

  return (
    <html lang={locale} dir={direction}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar locale={locale} />
          <main className="flex-1">
            <Suspense fallback={<div className="h-32" />}>
              {children}
            </Suspense>
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  )
}