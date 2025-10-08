'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  MapPin, 
  Calendar,
  Navigation
} from 'lucide-react'
import { cx } from '@/lib/ui'
import { Category } from '@/lib/types'

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [dates, setDates] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (location) params.set('location', location)
    if (dates) params.set('dates', dates)
    if (category) params.set('category', category)
    
    router.push(`/browse?${params.toString()}`)
  }

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In production, reverse geocode to get city name
          setLocation('Tel Aviv, Israel')
        },
        (error) => {
          console.warn('Geolocation error:', error.message)
          setLocation('Tel Aviv, Israel')
        }
      )
    }
  }

  const categories: { value: Category; label: string }[] = [
    { value: 'cameras', label: 'Cameras' },
    { value: 'drones', label: 'Drones' },
    { value: 'construction', label: 'Construction' },
    { value: 'gardening', label: 'Gardening' },
    { value: 'event-equipment', label: 'Event Equipment' },
    { value: 'power-tools', label: 'Power Tools' },
    { value: 'camping', label: 'Camping' },
    { value: 'audio-pa', label: 'Audio/PA' }
  ]

  return (
    <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Select */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | '')}
            className="w-full h-12 pl-4 pr-10 rounded-pill border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:border-sky transition-all duration-200 appearance-none"
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 pr-12 h-12"
          />
          <button
            type="button"
            onClick={handleGeolocate}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Navigation className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        </div>
        
        {/* Date Range */}
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Dates"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="pl-12 h-12"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 bg-gradient-to-r from-emerald to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Equipment
        </Button>
      </div>
      
      {/* Popular Searches */}
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>Popular:</span>
        {['Camera', 'Garden Tools', 'DJ Equipment'].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => setSearchQuery(term)}
            className="hover:text-emerald transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </form>
  )
}
