'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SearchBar } from './SearchBar'
import { TrustStrip } from './TrustStrip'
import { 
  TrendingUp,
  Shield,
  Star,
  Clock
} from 'lucide-react'
import { cx } from '@/lib/ui'
import { trustStats } from '@/lib/mock'

export function HomeHero() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Mock geolocation - in production, use actual geolocation API
    setUserLocation({ lat: 32.0853, lng: 34.7818 })
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-fog via-white to-mint/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A7F3D0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Blurred blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="pt-20 pb-16 text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 transition-colors">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trustStats.totalBookings.toLocaleString()}+ successful rentals
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Rent anything near you —
              <span className="block bg-gradient-to-r from-emerald to-sky bg-clip-text text-transparent">
                insured & verified
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover premium equipment from verified owners in your area. 
              <span className="font-medium text-slate-700"> Everything insured, every rental protected.</span>
            </p>
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield className="w-4 h-4" />
              <span className="font-medium">{trustStats.verifiedUsers.toLocaleString()}+ verified users</span>
            </div>
            <div className="flex items-center gap-2 text-sky-600">
              <Star className="w-4 h-4" />
              <span className="font-medium">{trustStats.averageRating}/5 average rating</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{trustStats.responseTime} response time</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto mb-16">
          <SearchBar />
        </div>

        {/* Trust Features */}
        <div className="mb-20">
          <TrustStrip />
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => router.push('/browse')}
            className="w-full sm:w-auto"
          >
            Browse categories
          </Button>
          <Button 
            size="lg"
            onClick={() => router.push('/list')}
            className="w-full sm:w-auto"
          >
            List your gear
          </Button>
        </div>
      </div>
    </div>
  )
}