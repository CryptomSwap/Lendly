'use client'

import { Star, Quote } from 'lucide-react'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function Testimonials() {
  const { t, locale } = useI18n()
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Event Planner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: t('testimonials.testimonial1.text')
    },
    {
      name: 'David R.',
      role: 'DIY Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: t('testimonials.testimonial2.text')
    },
    {
      name: 'Lisa K.',
      role: 'Photographer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      text: t('testimonials.testimonial3.text')
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-slate-50 rounded-2xl p-8 relative animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`absolute top-6 ${locale === 'he' ? 'left-6' : 'right-6'}`}>
                <Quote className="w-8 h-8 text-emerald-200" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className={`flex items-center ${locale === 'he' ? 'flex-row-reverse gap-4' : 'gap-4'}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}