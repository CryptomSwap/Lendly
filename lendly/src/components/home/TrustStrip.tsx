'use client'

import { Shield, Zap, Users } from 'lucide-react'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function TrustStrip() {
  const { t, locale } = useI18n()
  
  const trustFeatures = [
    {
      icon: Shield,
      title: t('trust.insuredVerified'),
      description: t('trust.insuredVerifiedDesc')
    },
    {
      icon: Zap,
      title: t('trust.instantBooking'),
      description: t('trust.instantBookingDesc')
    },
    {
      icon: Users,
      title: t('trust.localCommunity'),
      description: t('trust.localCommunityDesc')
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trustFeatures.map((feature, index) => {
        const Icon = feature.icon
        return (
          <div 
            key={feature.title}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        )
      })}
    </div>
  )
}
