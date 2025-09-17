'use client'

import { Search, Shield, Handshake } from 'lucide-react'
import { Locale, t } from '@/lib/i18n'

interface HowItWorksProps {
  locale: Locale
}

export function HowItWorks({ locale }: HowItWorksProps) {
  const isRTL = locale === 'he'

  const steps = [
    {
      number: 1,
      icon: Search,
      title: t(locale, 'step1Title'),
      description: t(locale, 'step1Description'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      number: 2,
      icon: Shield,
      title: t(locale, 'step2Title'),
      description: t(locale, 'step2Description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      number: 3,
      icon: Handshake,
      title: t(locale, 'step3Title'),
      description: t(locale, 'step3Description'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'howItWorksTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'howItWorksDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="text-center">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-200 transform translate-x-4"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}