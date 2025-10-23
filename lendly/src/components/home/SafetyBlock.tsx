'use client'

import { Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function SafetyBlock() {
  const { t, locale } = useI18n()
  
  const safetyFeatures = [
    t('safety.feature1'),
    t('safety.feature2'),
    t('safety.feature3'),
    t('safety.feature4')
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className={locale === 'he' ? 'lg:order-2' : ''}>
            <div className={`flex items-center mb-6 ${locale === 'he' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                {t('safety.title')}
              </h2>
            </div>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {t('safety.subtitle')}
            </p>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => window.location.href = '/safety'}
            >
              {t('safety.button')}
            </Button>
          </div>

          {/* Right side - Features */}
          <div className={`space-y-6 ${locale === 'he' ? 'lg:order-1' : ''}`}>
            {safetyFeatures.map((feature, index) => (
              <div 
                key={feature}
                className={`flex items-center p-4 bg-white rounded-xl border border-slate-200 animate-slide-up ${locale === 'he' ? 'flex-row-reverse gap-4' : 'gap-4'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-slate-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
