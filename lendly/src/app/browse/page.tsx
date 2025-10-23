'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { FiltersBar } from '@/components/results/FiltersBar'
import { SortDropdown } from '@/components/browse/SortDropdown'
import { ListingGrid } from '@/components/browse/ListingGrid'
import { MapWithClusters } from '@/components/browse/MapWithClusters'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Map, 
  List, 
  SlidersHorizontal, 
  X,
  Search,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react'
import { Filters, Category } from '@/lib/types'

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'split'>('split')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get('category') as Category || undefined,
    city: searchParams.get('location') || searchParams.get('q') || undefined,
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
    priceMin: 0,
    priceMax: 1000,
    radiusKm: 25,
    availableOnly: false,
    verifiedOnly: false,
    insuredOnly: false,
    sortBy: 'nearest'
  })
  const [sortBy, setSortBy] = useState('nearest')

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== '' && value !== false && 
    (typeof value !== 'number' || (value !== 0 && value !== 25 && value !== 1000))
  ).length

  const clearAllFilters = () => {
    setFilters({
      category: undefined,
      city: undefined,
      startDate: undefined,
      endDate: undefined,
      priceMin: 0,
      priceMax: 1000,
      radiusKm: 25,
      availableOnly: false,
      verifiedOnly: false,
      insuredOnly: false,
      sortBy: 'nearest'
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                  {filters.city ? `Equipment in ${filters.city}` : 'Browse Equipment'}
                </h1>
                <p className="text-lg text-neutral-600">
                  {filters.category ? `Find ${filters.category} equipment` : 'Discover premium equipment from trusted local owners'}
                </p>
              </div>
              
              {/* Quick Search */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    value={filters.city || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    className="pl-10 pr-4 py-2 border border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 w-64"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-primary-100 text-primary-700 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        {showFilters && (
          <div className="bg-white border-b border-neutral-200 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <FiltersBar 
                filters={filters} 
                onFiltersChange={setFilters} 
              />
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="bg-neutral-100 border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-neutral-700">Active filters:</span>
                  {filters.category && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.category}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.city && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {filters.city}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, city: undefined }))}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {(filters.startDate || filters.endDate) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {filters.startDate && filters.endDate ? `${filters.startDate} - ${filters.endDate}` : filters.startDate || filters.endDate}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, startDate: undefined, endDate: undefined }))}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="text-neutral-600 hover:text-neutral-900"
                >
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* View Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-neutral-200">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'split'
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Split
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'map'
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Map
                </button>
              </div>
            </div>
            
            <SortDropdown 
              value={sortBy} 
              onChange={setSortBy} 
            />
          </div>

          {/* Content Area */}
          <div className={`grid gap-8 ${
            viewMode === 'split' 
              ? 'lg:grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {/* List View */}
            {(viewMode === 'list' || viewMode === 'split') && (
              <div className={`${viewMode === 'split' ? 'order-2 lg:order-1' : ''}`}>
                <ListingGrid 
                  filters={filters} 
                  sortBy={sortBy} 
                />
              </div>
            )}
            
            {/* Map View */}
            {(viewMode === 'map' || viewMode === 'split') && (
              <div className={`${viewMode === 'split' ? 'order-1 lg:order-2' : ''}`}>
                <div className="sticky top-24">
                  <MapWithClusters 
                    filters={filters} 
                    sortBy={sortBy} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
