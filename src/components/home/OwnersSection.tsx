'use client'

import Link from 'next/link'
import { DollarSign, Shield, Zap, ArrowRight, TrendingUp, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Locale, t } from '@/lib/i18n'

interface OwnersSectionProps {
  locale: Locale
}

export function OwnersSection({ locale }: OwnersSectionProps) {
  const isRTL = locale === 'he'

  const features = [
    {
      icon: DollarSign,
      title: t(locale, 'setPrice'),
      description: t(locale, 'setPriceDescription'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: Shield,
      title: t(locale, 'depositsInsurance'),
      description: t(locale, 'depositsInsuranceDescription'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Zap,
      title: t(locale, 'fastPayouts'),
      description: t(locale, 'fastPayoutsDescription'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const stats = [
    {
      icon: TrendingUp,
      value: '₪2,400',
      label: t(locale, 'avgMonthlyEarnings'),
      description: 'Average per owner'
    },
    {
      icon: Users,
      value: '94%',
      label: t(locale, 'ownerRetention'),
      description: 'Stay active'
    },
    {
      icon: Clock,
      value: '<24h',
      label: t(locale, 'fastPayouts'),
      description: 'Payment time'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'ownersTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {t(locale, 'ownersDescription')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-6 w-6 text-slate-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-slate-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-500">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t(locale, 'earnMore')}
            </h3>
            <p className="text-slate-600 mb-6">
              {t(locale, 'earnMoreDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/list-item">
                  {t(locale, 'listYourGear')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">
                  {t(locale, 'learnMore')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}