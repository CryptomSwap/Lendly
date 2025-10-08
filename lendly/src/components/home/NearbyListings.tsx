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
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { haversineDistance, TEL_AVIV_COORDS } from '@/lib/geo'
import { mockListings } from '@/lib/mock-data'

export function NearbyListings() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [listings, setListings] = useState(mockListings)
  const router = useRouter()

  useEffect(() => {
    // Mock geolocation - in production, use actual geolocation API
    setUserLocation(TEL_AVIV_COORDS)
  }, [])

  const getDistance = (listing: typeof mockListings[0]) => {
    if (!userLocation) return null
    return haversineDistance(
      userLocation.lat,
      userLocation.lng,
      listing.location.coordinates.lat,
      listing.location.coordinates.lng
    )
  }

  const sortedListings = [...listings].sort((a, b) => {
    const distA = getDistance(a)
    const distB = getDistance(b)
    if (distA === null && distB === null) return 0
    if (distA === null) return 1
    if (distB === null) return -1
    return distA - distB
  })

  const handleListingClick = (listingId: string) => {
    router.push(`/items/${listingId}`)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary-100 text-primary-700 border-primary-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Recently Rented Near You
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Premium Equipment
            <span className="block text-accent-600">In Your Area</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover high-quality equipment from verified local owners. Every rental is protected and insured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedListings.map((listing, index) => {
            const distance = getDistance(listing)
            return (
              <Card 
                key={listing.id} 
                className="group cursor-pointer bg-white/80 backdrop-blur-sm border border-neutral-200/50 hover:border-primary-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleListingClick(listing.id)}
              >
                <div className="aspect-video bg-neutral-200 relative overflow-hidden">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
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
                  
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-neutral-700 border-0 backdrop-blur-sm">
                      {listing.category}
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Ready to Find Your Perfect Equipment?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Lendly for their equipment rental needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => router.push('/browse')}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Browse All Listings</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-200 text-primary-700 hover:bg-primary-50 rounded-2xl px-8 py-4"
              >
                <Heart className="w-5 h-5 mr-2" />
                <span>Save Favorites</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
