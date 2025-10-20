import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Providers } from '@/app/providers'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-fog">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </Providers>
  )
}
