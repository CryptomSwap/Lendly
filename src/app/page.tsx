import { HomeHero } from '@/components/home/HomeHero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { NearbyListings } from '@/components/home/NearbyListings'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Safety } from '@/components/home/Safety'
import { OwnersSection } from '@/components/home/OwnersSection'
import { Testimonials } from '@/components/home/Testimonials'
import { FAQ } from '@/components/home/FAQ'
import { getLocaleFromSearchParams } from '@/lib/i18n'

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const locale = getLocaleFromSearchParams(new URLSearchParams(resolvedSearchParams as Record<string, string>))

  return (
    <>
      <HomeHero locale={locale} />
      <CategoryGrid locale={locale} />
      <NearbyListings locale={locale} />
      <HowItWorks locale={locale} />
      <Safety locale={locale} />
      <OwnersSection locale={locale} />
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
    </>
  )
}