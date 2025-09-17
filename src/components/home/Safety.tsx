'use client'

import Link from 'next/link'
import { Shield, CheckCircle, CreditCard, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Locale, t } from '@/lib/i18n'

interface SafetyProps {
  locale: Locale
}

export function Safety({ locale }: SafetyProps) {
  const isRTL = locale === 'he'

  const safetyFeatures = [
    {
      icon: CheckCircle,
      title: t(locale, 'idVerification'),
      description: t(locale, 'idVerificationDescription'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: CreditCard,
      title: t(locale, 'depositHolds'),
      description: t(locale, 'depositHoldsDescription'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: t(locale, 'perRentalInsurance'),
      description: t(locale, 'perRentalInsuranceDescription'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: t(locale, 'disputeResolution'),
      description: t(locale, 'disputeResolutionDescription'),
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ]

  const stats = [
    {
      value: '99.8%',
      label: t(locale, 'successRate'),
      description: 'Successful rentals'
    },
    {
      value: '24/7',
      label: t(locale, 'support'),
      description: 'Customer support'
    },
    {
      value: '72h',
      label: t(locale, 'disputeResolution'),
      description: 'Resolution time'
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'safetyTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {t(locale, 'safetyDescription')}
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2 tabular-nums">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-slate-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-slate-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/safety">
              {t(locale, 'howProtectionWorks')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}