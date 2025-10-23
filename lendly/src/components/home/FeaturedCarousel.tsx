'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Shield, 
  Clock, 
  Heart,
  ArrowRight,
  CheckCircle,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { haversineDistance, TEL_AVIV_COORDS } from '@/lib/geo'
import { getFeaturedItems } from '@/lib/mock'
import { cx } from '@/lib/ui'
import { useI18n } from '@/i18n'

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { t, locale } = useI18n()
  
  const featuredItems = getFeaturedItems(8)
  const itemsPerView = 3
  const maxIndex = Math.max(0, featuredItems.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  const handleItemClick = (itemId: string) => {
    router.push(`/items/${itemId}`)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('featured.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${locale === 'he' ? 'right-0' : 'left-0'}`}
          >
            <ChevronLeft className={`w-6 h-6 text-slate-600 ${locale === 'he' ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${locale === 'he' ? 'left-0' : 'right-0'}`}
          >
            <ChevronRight className={`w-6 h-6 text-slate-600 ${locale === 'he' ? 'rotate-180' : ''}`} />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {featuredItems.map((item, index) => {
                const distance = haversineDistance(
                  TEL_AVIV_COORDS.lat,
                  TEL_AVIV_COORDS.lng,
                  item.location.coordinates.lat,
                  item.location.coordinates.lng
                )
                const isFavorite = favorites.has(item.id)
                
                return (
                  <div key={item.id} className="w-full flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
                    <Card 
                      className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden animate-slide-up h-[380px]"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <div className="aspect-video bg-slate-200 relative overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(item.id)
                          }}
                          className={`absolute top-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors ${locale === 'he' ? 'left-3' : 'right-3'}`}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
                            }`} 
                          />
                        </button>
                        
                        {/* Overlay badges */}
                        <div className={`absolute top-3 flex flex-col gap-2 ${locale === 'he' ? 'right-3' : 'left-3'}`}>
                          <Badge className="bg-black/80 text-white border-0 backdrop-blur-sm">
                            <MapPin className={`w-3 h-3 ${locale === 'he' ? 'ml-1' : 'mr-1'}`} />
                            {distance.toFixed(1)} km
                          </Badge>
                          <Badge className="bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
                            <CheckCircle className={`w-3 h-3 ${locale === 'he' ? 'ml-1' : 'mr-1'}`} />
                            Available
                          </Badge>
                        </div>
                        
                        {/* Trust badges */}
                        <div className={`absolute bottom-3 flex gap-2 ${locale === 'he' ? 'right-3' : 'left-3'}`}>
                          {item.verified && (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {item.insured && (
                            <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {item.instantBook && (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Rating and reviews */}
                        <div className={`flex items-center mb-3 ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className={`text-sm font-semibold text-slate-900 ${locale === 'he' ? 'mr-1' : 'ml-1'}`}>
                              {item.rating}
                            </span>
                          </div>
                          <span className={`text-sm text-slate-500 ${locale === 'he' ? 'mr-2' : 'ml-2'}`}>
                            ({item.reviewCount} reviews)
                          </span>
                          <div className={`flex items-center text-xs text-slate-500 ${locale === 'he' ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
                            <Clock className={`w-3 h-3 ${locale === 'he' ? 'ml-1' : 'mr-1'}`} />
                            {item.owner.responseTime}
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className={`flex items-center justify-between pt-3 border-t border-slate-100 ${locale === 'he' ? 'flex-row-reverse' : ''}`}>
                          <div>
                            <span className="text-xl font-bold text-slate-900">
                              {formatILS(item.pricePerDay)}
                            </span>
                            <span className={`text-sm text-slate-500 ${locale === 'he' ? 'mr-1' : 'ml-1'}`}>/day</span>
                            {item.deposit > 0 && (
                              <p className="text-xs text-slate-500 mt-1">
                                + {formatILS(item.deposit)} deposit
                              </p>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            className={`bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-3 py-1 group-hover:scale-105 transition-transform ${locale === 'he' ? 'flex-row-reverse' : ''}`}
                          >
                            <span>View</span>
                            <ArrowRight className={`w-3 h-3 transition-transform ${locale === 'he' ? 'mr-1 group-hover:-translate-x-1' : 'ml-1 group-hover:translate-x-1'}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => router.push('/browse')}
          >
            View All Featured Items
          </Button>
        </div>
      </div>
    </section>
  )
}
