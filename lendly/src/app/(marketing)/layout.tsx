import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
