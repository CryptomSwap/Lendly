'use client'

import { useState } from 'react'
import { ItemCard } from '@/components/ItemCard'
import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react'

// Import mock data from centralized source
import { getItemsByCategoryAsItems } from '@/lib/mock'

// Get items for the current category
const getCategoryItems = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'DRONE': 'drones',
    'CAMERA': 'cameras',
    'LENS': 'lenses',
    'DJ_TOOL': 'eventEquipment',
    'PARTY_GEAR': 'eventEquipment',
    'PROJECTOR': 'eventEquipment',
    'POWER_TOOL': 'powerTools',
    'LADDER': 'construction',
    'PRESSURE_WASHER': 'gardening',
    'CAMPING': 'camping',
    'APPLIANCE': 'eventEquipment'
  }
  
  const mockCategory = categoryMap[category] || 'cameras'
  return getItemsByCategoryAsItems(mockCategory).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: category as any,
    dailyPrice: item.dailyPriceILS * 100, // Convert to agorot
    deposit: item.depositILS * 100, // Convert to agorot
    images: item.images,
    owner: { 
      name: 'Mock Owner', // You could add owner data to the conversion
      verificationStatus: item.verifiedOwner ? 'VERIFIED' : 'PENDING' 
    },
    reviews: Array.from({ length: item.reviews }, (_, i) => ({ 
      rating: Math.floor(Math.random() * 2) + 4 // Random 4-5 star ratings
    }))
  }))
}

const categoryInfo = {
  'drone': { name: 'Drones & Aerial', emoji: '🚁', description: 'Professional drones for photography and videography' },
  'camera': { name: 'Cameras & Lenses', emoji: '📷', description: 'DSLR, mirrorless, and professional camera equipment' },
  'dj': { name: 'DJ & Audio', emoji: '🎧', description: 'Controllers, speakers, and professional audio gear' },
  'party': { name: 'Party & Events', emoji: '🎉', description: 'Projectors, lighting, and event equipment' },
  'tools': { name: 'Power Tools', emoji: '🔧', description: 'Drills, saws, and construction equipment' },
  'ladder': { name: 'Ladders & Safety', emoji: '🪜', description: 'Extension ladders, scaffolding, and safety gear' },
  'pressure': { name: 'Pressure Washers', emoji: '💧', description: 'High-pressure cleaning equipment' },
  'camping': { name: 'Camping & Outdoors', emoji: '⛺', description: 'Tents, sleeping bags, and outdoor gear' },
  'appliance': { name: 'Home Appliances', emoji: '🏠', description: 'Vacuum cleaners, air conditioners, and more' }
}

export default function CategoryResultsPage({ params }: { params: { category: string } }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)

  const category = params.category
  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || { 
    name: 'Equipment', 
    emoji: '🔧', 
    description: 'Professional equipment for rent' 
  }

  // Get items for the current category
  const categoryItems = getCategoryItems(category.toUpperCase())
  
  // Filter items based on search query
  const filteredItems = categoryItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
                         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.dailyPrice - b.dailyPrice
      case 'price-high':
        return b.dailyPrice - a.dailyPrice
      case 'rating':
        const aRating = a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
        const bRating = b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length
        return bRating - aRating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-warm-yellow/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <LennyLogo size="md" />
                <span className="text-xl font-bold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                  Lendly
                </span>
              </Link>
              <div className="text-sm text-muted-foreground">
                {categoryData.name}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/categories" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to categories
          </Link>
        </div>

        {/* Category Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{categoryData.emoji}</div>
          <h1 className="text-4xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {categoryData.description}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${categoryData.name.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range (₪)</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                      <Input
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tel Aviv, Israel"
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'} found
            </h2>
            <p className="text-muted-foreground">
              Available for rent in Tel Aviv
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {sortedItems.length} available
            </Badge>
          </div>
        </div>

        {/* Items Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No items found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse other categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
                <Button asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-coral to-teal text-white p-8">
            <CardContent className="space-y-4">
              <h3 className="text-2xl font-bold">Can't find what you're looking for?</h3>
              <p className="text-lg opacity-90">
                Request a specific item or list your own equipment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-50" asChild>
                  <Link href="/marketing">
                    Browse All Items
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-coral" asChild>
                  <Link href="/auth/signup">
                    List Your Equipment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
