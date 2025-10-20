'use client'

import { useState, useEffect } from 'react'
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
import { mockListings } from '@/lib/mock-data'
import { Filters } from '@/lib/types'

interface ListingGridProps {
  filters: Filters
  sortBy: string
}

export function ListingGrid({ filters, sortBy }: ListingGridProps) {
  const [listings, setListings] = useState(mockListings)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const router = useRouter()

  useEffect(() => {
    // Mock geolocation
    setUserLocation(TEL_AVIV_COORDS)
  }, [])

  // Filter listings
  const filteredListings = listings.filter(listing => {
    if (filters.category && listing.category !== filters.category) return false
    if (filters.city && !listing.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.priceMin && listing.dailyPriceILS < filters.priceMin) return false
    if (filters.priceMax && listing.dailyPriceILS > filters.priceMax) return false
    return true
  })

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.dailyPriceILS - b.dailyPriceILS
      case 'price_high':
        return b.dailyPriceILS - a.dailyPriceILS
      case 'rating':
        return b.rating.average - a.rating.average
      case 'nearest':
      default:
        if (!userLocation) return 0
        const distA = haversineDistance(
          userLocation.lat, 
          userLocation.lng, 
          a.location.coordinates.lat, 
          a.location.coordinates.lng
        )
        const distB = haversineDistance(
          userLocation.lat, 
          userLocation.lng, 
          b.location.coordinates.lat, 
          b.location.coordinates.lng
        )
        return distA - distB
    }
  })

  const getDistance = (listing: typeof mockListings[0]) => {
    if (!userLocation) return null
    return haversineDistance(
      userLocation.lat,
      userLocation.lng,
      listing.location.coordinates.lat,
      listing.location.coordinates.lng
    )
  }

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId)
      } else {
        newFavorites.add(listingId)
      }
      return newFavorites
    })
  }

  const handleListingClick = (listingId: string) => {
    router.push(`/items/${listingId}`)
  }

  if (sortedListings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-12 h-12 text-neutral-400" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          No listings found
        </h3>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Try adjusting your filters or search terms to see more results in your area.
        </p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          Reset Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          <span className="font-semibold text-neutral-900">{sortedListings.length}</span> results found
        </p>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Zap className="w-4 h-4" />
          <span>Live availability</span>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedListings.map((listing, index) => {
          const distance = getDistance(listing)
          const isFavorite = favorites.has(listing.id)
          
          return (
            <Card 
              key={listing.id} 
              className="group cursor-pointer bg-white border border-neutral-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleListingClick(listing.id)}
            >
              <div className="aspect-video bg-neutral-200 relative overflow-hidden">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(listing.id)
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-600'
                    }`} 
                  />
                </button>
                
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {distance && (
                    <Badge className="bg-black/80 text-white border-0 backdrop-blur-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {distance.toFixed(1)} km
                    </Badge>
                  )}
                  <Badge className="bg-success-500/90 text-white border-0 backdrop-blur-sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Available
                  </Badge>
                </div>
                
                {/* Trust badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {listing.trustFeatures.verified && (
                    <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {listing.trustFeatures.insured && (
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {listing.trustFeatures.instantBook && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {listing.description}
                  </p>
                </div>
                
                {/* Rating and reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold ml-1 text-neutral-900">
                      {listing.rating.average}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500 ml-2">
                    ({listing.rating.count} reviews)
                  </span>
                  <div className="ml-auto flex items-center text-xs text-neutral-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {listing.owner.responseTime}
                  </div>
                </div>

                {/* Owner info */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    <img 
                      src={listing.owner.avatar || `https://ui-avatars.com/api/?name=${listing.owner.name}&background=f0fdf4&color=16a34a`}
                      alt={listing.owner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      by {listing.owner.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {listing.owner.verification.status === 'VERIFIED' && (
                        <Badge className="trust-badge verified text-xs">
                          <Shield className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                      {listing.owner.insurance && (
                        <Badge className="trust-badge insured text-xs">
                          <Shield className="w-3 h-3" />
                          Insured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div>
                    <span className="text-2xl font-bold text-neutral-900">
                      {formatILS(listing.dailyPriceILS)}
                    </span>
                    <span className="text-sm text-neutral-500 ml-1">/day</span>
                    {listing.depositILS > 0 && (
                      <p className="text-xs text-neutral-500 mt-1">
                        + {formatILS(listing.depositILS)} deposit
                      </p>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-4 py-2 group-hover:scale-105 transition-transform"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
