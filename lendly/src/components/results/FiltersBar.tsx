'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { X } from 'lucide-react'
import { cx } from '@/lib/ui'
import { Filters, Category } from '@/lib/types'

interface FiltersBarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const updateFilter = (key: keyof Filters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: Filters = {
      category: filters.category,
      city: filters.city
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.entries(localFilters).some(([key, value]) => 
    key !== 'category' && key !== 'city' && value !== undefined && value !== ''
  )

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

  const radiusOptions = [2, 5, 10, 25, 50]

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-900">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rental Dates
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              placeholder="Start date"
              value={localFilters.startDate || ''}
              onChange={(e) => updateFilter('startDate', e.target.value)}
            />
            <Input
              type="date"
              placeholder="End date"
              value={localFilters.endDate || ''}
              onChange={(e) => updateFilter('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price Range (₪/day)
          </label>
          <div className="space-y-4">
            <Slider
              value={[localFilters.priceMin || 0, localFilters.priceMax || 1000]}
              onValueChange={([min, max]) => {
                updateFilter('priceMin', min)
                updateFilter('priceMax', max)
              }}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>₪{localFilters.priceMin || 0}</span>
              <span>₪{localFilters.priceMax || 1000}</span>
            </div>
          </div>
        </div>

        {/* Radius */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search Radius
          </label>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((radius) => (
              <button
                key={radius}
                onClick={() => updateFilter('radiusKm', radius)}
                className={cx(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  localFilters.radiusKm === radius
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {radius} km
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Available only
            </label>
            <Switch
              checked={localFilters.availableOnly || false}
              onCheckedChange={(checked) => updateFilter('availableOnly', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Verified users only
            </label>
            <Switch
              checked={localFilters.verifiedOnly || false}
              onCheckedChange={(checked) => updateFilter('verifiedOnly', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Insured items only
            </label>
            <Switch
              checked={localFilters.insuredOnly || false}
              onCheckedChange={(checked) => updateFilter('insuredOnly', checked)}
            />
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Active Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {localFilters.startDate && localFilters.endDate && (
                <Badge variant="secondary">
                  {localFilters.startDate} - {localFilters.endDate}
                  <button
                    onClick={() => {
                      updateFilter('startDate', undefined)
                      updateFilter('endDate', undefined)
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.priceMin && localFilters.priceMax && (
                <Badge variant="secondary">
                  ₪{localFilters.priceMin} - ₪{localFilters.priceMax}
                  <button
                    onClick={() => {
                      updateFilter('priceMin', undefined)
                      updateFilter('priceMax', undefined)
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.radiusKm && (
                <Badge variant="secondary">
                  {localFilters.radiusKm}km radius
                  <button
                    onClick={() => updateFilter('radiusKm', undefined)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.availableOnly && (
                <Badge variant="secondary">
                  Available only
                  <button
                    onClick={() => updateFilter('availableOnly', false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.verifiedOnly && (
                <Badge variant="secondary">
                  Verified only
                  <button
                    onClick={() => updateFilter('verifiedOnly', false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.insuredOnly && (
                <Badge variant="secondary">
                  Insured only
                  <button
                    onClick={() => updateFilter('insuredOnly', false)}
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
