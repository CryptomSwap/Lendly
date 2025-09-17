'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchBar } from './SearchBar'
import { TrustBadgesRow } from './TrustBadgesRow'
import { Locale, t } from '@/lib/i18n'

interface HomeHeroProps {
  locale: Locale
}

export function HomeHero({ locale }: HomeHeroProps) {
  const isRTL = locale === 'he'

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t(locale, 'heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t(locale, 'heroSubtitle')}
          </p>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar locale={locale} />
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              <Link href="/il/tel-aviv">
                {t(locale, 'startRenting')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-3">
              <Link href="/list-item">
                {t(locale, 'listYourGear')}
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <TrustBadgesRow locale={locale} />
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}