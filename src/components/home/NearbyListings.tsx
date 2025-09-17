'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Locale, t } from '@/lib/i18n'
import { MockItem, getNearbyItems } from '@/lib/mock'
import { getUserLocation } from '@/lib/geo'
import { formatPricePerDay, formatDeposit } from '@/lib/currency'
import { formatDistance } from '@/lib/geo'

interface NearbyListingsProps {
  locale: Locale
}

export function NearbyListings({ locale }: NearbyListingsProps) {
  const [items, setItems] = useState<MockItem[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'weekend' | 'nextWeek'>('today')
  const [isLoading, setIsLoading] = useState(true)

  const isRTL = locale === 'he'

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true)
      try {
        const userLocation = getUserLocation()
        const nearbyItems = getNearbyItems(userLocation, 6)
        setItems(nearbyItems)
      } catch (error) {
        console.error('Failed to load nearby items:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadItems()
  }, [])

  const getDateRange = (period: string) => {
    const today = new Date()
    switch (period) {
      case 'today':
        return {
          start: today.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      case 'weekend':
        const saturday = new Date(today)
        saturday.setDate(today.getDate() + (6 - today.getDay()))
        const sunday = new Date(saturday)
        sunday.setDate(saturday.getDate() + 1)
        return {
          start: saturday.toISOString().split('T')[0],
          end: sunday.toISOString().split('T')[0]
        }
      case 'nextWeek':
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        const endWeek = new Date(nextWeek)
        endWeek.setDate(nextWeek.getDate() + 6)
        return {
          start: nextWeek.toISOString().split('T')[0],
          end: endWeek.toISOString().split('T')[0]
        }
      default:
        return {
          start: today.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
    }
  }

  const periodChips = [
    { key: 'today', label: t(locale, 'today') },
    { key: 'weekend', label: t(locale, 'weekend') },
    { key: 'nextWeek', label: t(locale, 'nextWeek') }
  ]

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-96 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6">
                    <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'popularNearYou')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {t(locale, 'popularNearYouDescription')}
          </p>

          {/* Period Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {periodChips.map((chip) => (
              <Button
                key={chip.key}
                variant={selectedPeriod === chip.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(chip.key as any)}
                className={selectedPeriod === chip.key ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {chip.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={isRTL ? item.titleHe || item.title : item.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {item.verifiedOwner && (
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {item.insured && (
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <Shield className="h-3 w-3 mr-1" />
                      Insured
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {isRTL ? item.titleHe || item.title : item.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">
                      {item.rating}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({item.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {formatDistance(item.distance || 0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-slate-900 tabular-nums">
                      {formatPricePerDay(item.pricePerDay)}
                      <span className="text-sm font-normal text-slate-500">/day</span>
                    </div>
                    <div className="text-sm text-slate-500">
                      Deposit: {formatDeposit(item.deposit)}
                    </div>
                  </div>
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {t(locale, 'viewDetails')}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/il/tel-aviv"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {t(locale, 'viewAllIn')} Tel Aviv
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}