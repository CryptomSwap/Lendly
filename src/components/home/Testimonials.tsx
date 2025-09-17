'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { Locale, t } from '@/lib/i18n'

interface TestimonialsProps {
  locale: Locale
}

export function Testimonials({ locale }: TestimonialsProps) {
  const isRTL = locale === 'he'

  const testimonials = [
    {
      id: 1,
      quote: t(locale, 'testimonial1'),
      author: t(locale, 'testimonial1Author'),
      role: t(locale, 'testimonial1Role'),
      avatar: 'https://picsum.photos/100/100?random=201',
      rating: 5
    },
    {
      id: 2,
      quote: t(locale, 'testimonial2'),
      author: t(locale, 'testimonial2Author'),
      role: t(locale, 'testimonial2Role'),
      avatar: 'https://picsum.photos/100/100?random=202',
      rating: 5
    },
    {
      id: 3,
      quote: t(locale, 'testimonial3'),
      author: t(locale, 'testimonial3Author'),
      role: t(locale, 'testimonial3Role'),
      avatar: 'https://picsum.photos/100/100?random=203',
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t(locale, 'testimonialsTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t(locale, 'testimonialsDescription')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-slate-200">
                <Quote className="h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Message */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t(locale, 'joinThousands')}
            </h3>
            <p className="text-slate-600">
              Join our growing community of equipment owners and renters in Tel Aviv
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}