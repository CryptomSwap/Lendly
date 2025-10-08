'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { FiltersBar } from '@/components/results/FiltersBar'
import { SortMenu } from '@/components/results/SortMenu'
import { MapSplit } from '@/components/results/MapSplit'
import { ListingGrid } from '@/components/results/ListingGrid'
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
import { cx } from '@/lib/ui'
import { Category, Filters } from '@/lib/types'

interface ResultsPageProps {
  params: Promise<{
    country: string
    city: string
    category: string
  }>
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { country, city, category } = await params
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'split'>('split')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: category as Category,
    city: city,
    startDate: searchParams.get('start') || undefined,
    endDate: searchParams.get('end') || undefined,
    priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
    priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
    radiusKm: searchParams.get('radius') ? parseInt(searchParams.get('radius')!) : 25,
    availableOnly: searchParams.get('available') === 'true',
    verifiedOnly: searchParams.get('verified') === 'true',
    insuredOnly: searchParams.get('insured') === 'true',
    sortBy: (searchParams.get('sort') as any) || 'nearest'
  })

  const activeFiltersCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ''
  ).length

  const clearAllFilters = () => {
    setFilters({
      category: category as Category,
      city: city
    })
  }

  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  {filters.category ? `${filters.category} equipment in ${filters.city}` : `Equipment in ${filters.city}`}
                </h1>
                <p className="text-lg text-slate-600">
                  {filters.category ? `Find ${filters.category} equipment` : 'Discover premium equipment from trusted local owners'}
                </p>
              </div>
              
              {/* Quick Search */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-emerald focus:ring-emerald/20 w-64 h-12"
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
                    <Badge className="ml-1 bg-emerald-100 text-emerald-700 text-xs">
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
          <div className="bg-white border-b border-slate-200 animate-slide-up">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <FiltersBar 
                filters={filters} 
                onFiltersChange={setFilters} 
              />
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="bg-slate-100 border-b border-slate-200">
            <div className="max-w-[1200px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-700">Active filters:</span>
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
                  {filters.startDate && filters.endDate && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {filters.startDate} - {filters.endDate}
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
                  className="text-slate-600 hover:text-slate-900"
                >
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* View Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                <button
                  onClick={() => setViewMode('list')}
                  className={cx(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === 'list'
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={cx(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === 'split'
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Map className="w-4 h-4" />
                  Split
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={cx(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === 'map'
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Map className="w-4 h-4" />
                  Map
                </button>
              </div>
            </div>
            
            <SortMenu 
              value={filters.sortBy || 'nearest'} 
              onChange={(sortBy) => setFilters(prev => ({ ...prev, sortBy }))} 
            />
          </div>

          {/* Content Area */}
          <div className={cx(
            "grid gap-8",
            viewMode === 'split' 
              ? 'lg:grid-cols-2' 
              : 'grid-cols-1'
          )}>
            {/* List View */}
            {(viewMode === 'list' || viewMode === 'split') && (
              <div className={cx(viewMode === 'split' ? 'order-2 lg:order-1' : '')}>
                <ListingGrid 
                  filters={filters} 
                />
              </div>
            )}
            
            {/* Map View */}
            {(viewMode === 'map' || viewMode === 'split') && (
              <div className={cx(viewMode === 'split' ? 'order-1 lg:order-2' : '')}>
                <div className="sticky top-24">
                  <MapSplit 
                    filters={filters} 
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
