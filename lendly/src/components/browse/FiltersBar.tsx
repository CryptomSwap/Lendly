'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const categories = [
  'GARDENING',
  'CONSTRUCTION', 
  'EVENTS',
  'DRONE',
  'CAMERA',
  'LENS',
  'POWER_TOOL',
  'CAMPING',
  'AUDIO_PA'
]

const categoryLabels = {
  GARDENING: 'Gardening',
  CONSTRUCTION: 'Construction',
  EVENTS: 'Events',
  DRONE: 'Drones',
  CAMERA: 'Cameras',
  LENS: 'Lenses',
  POWER_TOOL: 'Power Tools',
  CAMPING: 'Camping',
  AUDIO_PA: 'Audio/PA'
}

interface FiltersBarProps {
  filters: {
    category: string
    location: string
    dates: string
    priceRange: [number, number]
    radius: number
  }
  onFiltersChange: (filters: any) => void
}

export function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      location: '',
      dates: '',
      priceRange: [0, 1000],
      radius: 25
    })
  }

  const hasActiveFilters = filters.category || filters.location || filters.dates

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Input
            placeholder="Enter city or address"
            value={filters.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('location', e.target.value)}
          />
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rental Dates
          </label>
          <Input
            type="text"
            placeholder="Select dates"
            value={filters.dates}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('dates', e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₪/day)
          </label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('priceRange', [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1]
                  ])}
            />
            <span className="text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('priceRange', [
                filters.priceRange[0],
                parseInt(e.target.value) || 1000
              ])}
            />
          </div>
        </div>

        {/* Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius: {filters.radius} km
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={filters.radius}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('radius', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary">
                  {categoryLabels[filters.category as keyof typeof categoryLabels]}
                  <button
                    onClick={() => updateFilter('category', '')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary">
                  {filters.location}
                  <button
                    onClick={() => updateFilter('location', '')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.dates && (
                <Badge variant="secondary">
                  {filters.dates}
                  <button
                    onClick={() => updateFilter('dates', '')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
