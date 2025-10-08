'use client'

import { useState, useEffect } from 'react'
import { ListingCard } from './ListingCard'
import { getNearbyItems } from '@/lib/mock'
import { Filters, Item } from '@/lib/types'
import { TEL_AVIV_COORDS } from '@/lib/geo'
import { cx } from '@/lib/ui'

interface ListingGridProps {
  filters: Filters
}

export function ListingGrid({ filters }: ListingGridProps) {
  const [items, setItems] = useState<Item[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [userLocation] = useState(TEL_AVIV_COORDS)

  useEffect(() => {
    // Filter and sort items based on current filters
    let filteredItems = getNearbyItems({
      city: filters.city,
      start: filters.startDate,
      end: filters.endDate,
      category: filters.category,
      radiusKm: filters.radiusKm
    })

    // Apply additional filters
    if (filters.availableOnly) {
      filteredItems = filteredItems.filter(item => item.available)
    }
    if (filters.verifiedOnly) {
      filteredItems = filteredItems.filter(item => item.verified)
    }
    if (filters.insuredOnly) {
      filteredItems = filteredItems.filter(item => item.insured)
    }

    // Sort items
    filteredItems.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.pricePerDay - b.pricePerDay
        case 'price-desc':
          return b.pricePerDay - a.pricePerDay
        case 'rating':
          return b.rating - a.rating
        case 'nearest':
        default:
          // Sort by distance (already calculated in getNearbyItems)
          return 0
      }
    })

    setItems(filteredItems)
  }, [filters])

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          No listings found
        </h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Try adjusting your filters or search terms to see more results in your area.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          <span className="font-semibold text-slate-900">{items.length}</span> results found
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Live availability</span>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ListingCard
            key={item.id}
            item={item}
            userLocation={userLocation}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
