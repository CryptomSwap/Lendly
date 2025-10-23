'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Camera,
  Drone, 
  Hammer, 
  Sprout, 
  PartyPopper, 
  Wrench, 
  Tent, 
  Volume2,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { cx } from '@/lib/ui'
import { Category } from '@/lib/types'
import { useI18n } from '@/i18n'

export function CategoryGrid() {
  const router = useRouter()
  const { t, locale } = useI18n()

  const categories: {
    id: Category
    name: string
    icon: any
    description: string
    examples: string[]
  }[] = [
    {
      id: 'cameras',
      name: t('categories.cameras'),
      icon: Camera,
      description: 'Professional photography equipment',
      examples: ['DSLR Cameras', 'Lenses', 'Tripods', 'Lighting']
    },
    {
      id: 'drones',
      name: t('categories.drones'),
      icon: Drone,
      description: 'Aerial photography and videography',
      examples: ['DJI Mavic', 'Professional Drones', 'Accessories']
    },
    {
      id: 'construction',
      name: t('categories.construction'),
      icon: Hammer,
      description: 'Professional construction tools',
      examples: ['Power Tools', 'Safety Equipment', 'Measuring Tools']
    },
    {
      id: 'gardening',
      name: t('categories.gardening'),
      icon: Sprout,
      description: 'Garden and landscaping tools',
      examples: ['Lawn Mowers', 'Hedge Trimmers', 'Garden Tools']
    },
    {
      id: 'event-equipment',
      name: t('categories.eventEquipment'),
      icon: PartyPopper,
      description: 'Party and event supplies',
      examples: ['Tables & Chairs', 'Sound Systems', 'Lighting']
    },
    {
      id: 'power-tools',
      name: t('categories.powerTools'),
      icon: Wrench,
      description: 'Electric and battery tools',
      examples: ['Drills', 'Saws', 'Sanders', 'Grinders']
    },
    {
      id: 'camping',
      name: t('categories.camping'),
      icon: Tent,
      description: 'Outdoor adventure gear',
      examples: ['Tents', 'Sleeping Bags', 'Cooking Gear']
    },
    {
      id: 'audio-pa',
      name: t('categories.audioPa'),
      icon: Volume2,
      description: 'Sound systems and audio equipment',
      examples: ['Speakers', 'Mixers', 'Microphones']
    }
  ]

  const handleCategoryClick = (categoryId: Category) => {
    router.push(`/browse?category=${categoryId}`)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-fog/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200">
            <TrendingUp className={`w-3 h-3 ${locale === 'he' ? 'ml-1' : 'mr-1'}`} />
            {t('categories.popular')}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('categories.title')}
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={category.id}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden animate-slide-up hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6">
                  <div className={`flex items-start justify-between mb-6 ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:bg-emerald-200">
                      <Icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-all duration-300 ${locale === 'he' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {category.examples.slice(0, 2).map((example) => (
                        <Badge 
                          key={example} 
                          variant="secondary" 
                          className="text-xs bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/browse')}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group ${locale === 'he' ? 'flex-row-reverse' : ''}`}
          >
            <span>{t('categories.viewAll')}</span>
            <ArrowRight className={`w-5 h-5 transition-transform ${locale === 'he' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>
      </div>
    </section>
  )
}