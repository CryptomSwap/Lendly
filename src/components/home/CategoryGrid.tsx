'use client'

import Link from 'next/link'
import { Camera, Drone, Hammer, Sprout, PartyPopper, Zap, Tent, Music, Search } from 'lucide-react'
import { Locale, t } from '@/lib/i18n'

interface CategoryGridProps {
  locale: Locale
}

export function CategoryGrid({ locale }: CategoryGridProps) {
  const isRTL = locale === 'he'

  const categories = [
    {
      id: 'cameras',
      name: 'Cameras',
      nameHe: 'מצלמות',
      icon: Camera,
      examples: 'DSLR, Mirrorless, Action',
      examplesHe: 'DSLR, מראה, אקשן',
      href: '/il/tel-aviv/cameras'
    },
    {
      id: 'drones',
      name: 'Drones',
      nameHe: 'רחפנים',
      icon: Drone,
      examples: 'DJI, Mini, Pro',
      examplesHe: 'DJI, מיני, מקצועי',
      href: '/il/tel-aviv/drones'
    },
    {
      id: 'construction',
      name: 'Construction',
      nameHe: 'בנייה',
      icon: Hammer,
      examples: 'Saws, Drills, Tools',
      examplesHe: 'מסורים, מקדחות, כלים',
      href: '/il/tel-aviv/construction'
    },
    {
      id: 'gardening',
      name: 'Gardening',
      nameHe: 'גינון',
      icon: Sprout,
      examples: 'Mowers, Trimmers, Tools',
      examplesHe: 'מכסחות, גוזמים, כלים',
      href: '/il/tel-aviv/gardening'
    },
    {
      id: 'eventEquipment',
      name: 'Event Equipment',
      nameHe: 'ציוד אירועים',
      icon: PartyPopper,
      examples: 'Sound, Lighting, Tables',
      examplesHe: 'סאונד, תאורה, שולחנות',
      href: '/il/tel-aviv/event-equipment'
    },
    {
      id: 'powerTools',
      name: 'Power Tools',
      nameHe: 'כלי עבודה',
      icon: Zap,
      examples: 'Drills, Saws, Sanders',
      examplesHe: 'מקדחות, מסורים, ליטושים',
      href: '/il/tel-aviv/power-tools'
    },
    {
      id: 'camping',
      name: 'Camping',
      nameHe: 'קמפינג',
      icon: Tent,
      examples: 'Tents, Sleeping bags',
      examplesHe: 'אוהלים, שקי שינה',
      href: '/il/tel-aviv/camping'
    },
    {
      id: 'audioPA',
      name: 'Audio/PA',
      nameHe: 'אודיו/PA',
      icon: Music,
      examples: 'Speakers, Mixers, Mics',
      examplesHe: 'רמקולים, מיקסרים, מיקרופונים',
      href: '/il/tel-aviv/audio-pa'
    },
    {
      id: 'lenses',
      name: 'Lenses',
      nameHe: 'עדשות',
      icon: Search,
      examples: 'Wide, Telephoto, Macro',
      examplesHe: 'רחב, טלפוטו, מקרו',
      href: '/il/tel-aviv/lenses'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'browseCategories')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'browseCategoriesDescription')}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {isRTL ? category.nameHe : category.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {isRTL ? category.examplesHe : category.examples}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Categories Link */}
        <div className="text-center">
          <Link
            href="/categories"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {t(locale, 'viewAllCategories')}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}