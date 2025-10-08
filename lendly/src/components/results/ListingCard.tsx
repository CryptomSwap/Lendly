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
  Zap
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { haversineDistance, TEL_AVIV_COORDS } from '@/lib/geo'
import { Item } from '@/lib/types'
import { cx } from '@/lib/ui'
import { VerifiedBadge } from './VerifiedBadge'
import { InsuranceBadge } from './InsuranceBadge'
import { DistanceChip } from './DistanceChip'

interface ListingCardProps {
  item: Item
  userLocation?: { lat: number; lng: number }
  isFavorite?: boolean
  onToggleFavorite?: (itemId: string) => void
}

export function ListingCard({ 
  item, 
  userLocation = TEL_AVIV_COORDS, 
  isFavorite = false, 
  onToggleFavorite 
}: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const distance = haversineDistance(
    userLocation.lat,
    userLocation.lng,
    item.location.coordinates.lat,
    item.location.coordinates.lng
  )

  const handleCardClick = () => {
    router.push(`/items/${item.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite?.(item.id)
  }

  const handleImageHover = () => {
    if (item.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }

  const handleImageLeave = () => {
    setCurrentImageIndex(0)
  }

  return (
    <Card 
      className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden animate-slide-up hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
        <img
          src={item.images[currentImageIndex]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        />
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
            }`} 
          />
        </button>
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <DistanceChip distance={distance} />
          <Badge className="bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Available
          </Badge>
        </div>
        
        {/* Trust badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {item.verified && <VerifiedBadge />}
          {item.insured && <InsuranceBadge />}
          {item.instantBook && (
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {item.description}
          </p>
        </div>
        
        {/* Rating and reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-semibold ml-1 text-slate-900">
              {item.rating}
            </span>
          </div>
          <span className="text-sm text-slate-500 ml-2">
            ({item.reviewCount} reviews)
          </span>
          <div className="ml-auto flex items-center text-xs text-slate-500">
            <Clock className="w-3 h-3 mr-1" />
            {item.owner.responseTime}
          </div>
        </div>

        {/* Owner info */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
            <img 
              src={item.owner.avatar || `https://ui-avatars.com/api/?name=${item.owner.name}&background=ecfdf5&color=10b981`}
              alt={item.owner.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">
              by {item.owner.name}
            </p>
            <div className="flex items-center gap-2">
              {item.owner.verified && (
                <VerifiedBadge size="xs" />
              )}
              {item.insured && (
                <InsuranceBadge size="xs" />
              )}
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {formatILS(item.pricePerDay)}
            </span>
            <span className="text-sm text-slate-500 ml-1">/day</span>
            {item.deposit > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                + {formatILS(item.deposit)} deposit
              </p>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 group-hover:scale-105 transition-transform"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
