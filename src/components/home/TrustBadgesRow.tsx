'use client'

import { Shield, CheckCircle, Zap, Star } from 'lucide-react'
import { Locale, t } from '@/lib/i18n'

interface TrustBadgesRowProps {
  locale: Locale
}

export function TrustBadgesRow({ locale }: TrustBadgesRowProps) {
  const badges = [
    {
      icon: Shield,
      text: t(locale, 'insured'),
      color: 'text-emerald-600'
    },
    {
      icon: CheckCircle,
      text: t(locale, 'idVerified'),
      color: 'text-blue-600'
    },
    {
      icon: Zap,
      text: t(locale, 'instantBooking'),
      color: 'text-purple-600'
    },
    {
      icon: Star,
      text: t(locale, 'rating'),
      color: 'text-amber-600'
    }
  ]

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <div key={index} className="flex items-center space-x-2 text-sm font-medium">
            <Icon className={`h-5 w-5 ${badge.color}`} />
            <span className="text-slate-700">{badge.text}</span>
          </div>
        )
      })}
    </div>
  )
}