import { HomeHero } from '@/components/home/HomeHero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel'
import { ActivityFeed } from '@/components/home/ActivityFeed'
import { HowItWorks } from '@/components/home/HowItWorks'
import { SafetyBlock } from '@/components/home/SafetyBlock'
import { OwnersCTA } from '@/components/home/OwnersCTA'
import { Testimonials } from '@/components/home/Testimonials'
import { FAQ } from '@/components/home/FAQ'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <CategoryGrid />
      <FeaturedCarousel />
      <ActivityFeed />
      <HowItWorks />
      <SafetyBlock />
      <OwnersCTA />
      <Testimonials />
      <FAQ />
    </div>
  )
}
