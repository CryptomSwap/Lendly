'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  Settings
} from 'lucide-react'
import { mockListings } from '@/lib/mock-data'
import { haversineDistance, TEL_AVIV_COORDS } from '@/lib/geo'
import { Filters } from '@/lib/types'

interface MapWithClustersProps {
  filters: Filters
  sortBy: string
}

export function MapWithClusters({ filters, sortBy }: MapWithClustersProps) {
  const [mapCenter, setMapCenter] = useState(TEL_AVIV_COORDS)
  const [zoom, setZoom] = useState(12)
  const [selectedListing, setSelectedListing] = useState<string | null>(null)
  const [mapStyle, setMapStyle] = useState<'default' | 'satellite' | 'terrain'>('default')

  // Filter listings based on current filters
  const filteredListings = mockListings.filter(listing => {
    if (filters.category && listing.category !== filters.category) return false
    if (filters.city && !listing.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.priceMin && listing.dailyPriceILS < filters.priceMin) return false
    if (filters.priceMax && listing.dailyPriceILS > filters.priceMax) return false
    return true
  })

  const handleListingClick = (listingId: string) => {
    setSelectedListing(selectedListing === listingId ? null : listingId)
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 18))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 8))

  return (
    <Card className="h-[600px] lg:h-[800px] bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg">
      <CardContent className="p-0 h-full relative">
        {/* Map Container */}
        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e5e5' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {/* Zoom Controls */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-neutral-50 transition-colors rounded-t-xl"
              >
                <ZoomIn className="w-4 h-4 text-neutral-600" />
              </button>
              <div className="border-t border-neutral-200"></div>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-neutral-50 transition-colors rounded-b-xl"
              >
                <ZoomOut className="w-4 h-4 text-neutral-600" />
              </button>
            </div>
            
            {/* Map Style Toggle */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200">
              <button
                onClick={() => setMapStyle('default')}
                className={`p-2 hover:bg-neutral-50 transition-colors rounded-t-xl ${
                  mapStyle === 'default' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
              <div className="border-t border-neutral-200"></div>
              <button
                onClick={() => setMapStyle('satellite')}
                className={`p-2 hover:bg-neutral-50 transition-colors ${
                  mapStyle === 'satellite' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'
                }`}
              >
                <Navigation className="w-4 h-4" />
              </button>
              <div className="border-t border-neutral-200"></div>
              <button
                onClick={() => setMapStyle('terrain')}
                className={`p-2 hover:bg-neutral-50 transition-colors rounded-b-xl ${
                  mapStyle === 'terrain' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Pins */}
          <div className="absolute inset-0">
            {filteredListings.map((listing, index) => {
              // Mock positioning - in production, use actual coordinates
              const x = 20 + (index * 15) + Math.random() * 20
              const y = 30 + (index * 10) + Math.random() * 15
              const isSelected = selectedListing === listing.id
              
              return (
                <div
                  key={listing.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => handleListingClick(listing.id)}
                >
                  {/* Map Pin */}
                  <div className={`relative transition-all duration-200 ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}>
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      isSelected ? 'bg-accent-500' : 'bg-primary-500'
                    }`}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full ${
                      isSelected ? 'bg-accent-500' : 'bg-primary-500'
                    } animate-ping opacity-20`}></div>
                  </div>
                  
                  {/* Listing Info Popup */}
                  {isSelected && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 animate-scale-in">
                      <div className="flex items-start gap-3">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-neutral-900 text-sm line-clamp-1">
                            {listing.title}
                          </h4>
                          <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                            {listing.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-primary-600">
                              ₪{listing.dailyPriceILS}/day
                            </span>
                            <Button size="sm" className="text-xs px-3 py-1">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200 p-4 z-10">
            <h4 className="font-semibold text-neutral-900 text-sm mb-2">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-xs text-neutral-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-xs text-neutral-600">Selected</span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200 p-3 z-10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-900">
                {filteredListings.length} listings
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              {filters.city || 'Tel Aviv area'}
            </p>
          </div>
        </div>

        {/* Map Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80">
              <Navigation className="w-4 h-4" />
              <span className="text-sm">Interactive map view</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Maximize2 className="w-4 h-4 mr-1" />
              Fullscreen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
