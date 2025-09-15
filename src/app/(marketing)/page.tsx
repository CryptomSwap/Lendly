import { ItemCard } from '@/components/ItemCard'
import { CategoryPills } from '@/components/CategoryPills'
import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ItemCategory } from '@prisma/client'
import { useState, useEffect } from 'react'

// Mock data - in real app this would come from API
const mockItems = [
  {
    id: '1',
    title: 'DJI Mini 4 Pro Drone',
    description: 'Professional drone with 4K camera, perfect for aerial photography.',
    category: 'DRONE' as ItemCategory,
    dailyPrice: 15000,
    deposit: 50000,
    images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
    owner: { name: 'David Cohen', verificationStatus: 'VERIFIED' },
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: '2',
    title: 'Sony A7S III Camera',
    description: 'Professional mirrorless camera with 24-70mm lens.',
    category: 'CAMERA' as ItemCategory,
    dailyPrice: 20000,
    deposit: 80000,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
    owner: { name: 'Sarah Levy', verificationStatus: 'VERIFIED' },
    reviews: [{ rating: 5 }]
  },
  {
    id: '3',
    title: 'Pioneer DDJ-400 DJ Controller',
    description: 'Professional DJ controller with Rekordbox integration.',
    category: 'DJ_TOOL' as ItemCategory,
    dailyPrice: 12000,
    deposit: 40000,
    images: ['https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800'],
    owner: { name: 'Michael Ben-David', verificationStatus: 'VERIFIED' },
    reviews: [{ rating: 4 }, { rating: 5 }]
  }
]

const allCategories: ItemCategory[] = [
  'DRONE', 'CAMERA', 'LENS', 'DJ_TOOL', 'PARTY_GEAR', 
  'PROJECTOR', 'POWER_TOOL', 'LADDER', 'PRESSURE_WASHER', 
  'CAMPING', 'APPLIANCE'
]

export default function Page() {
  const [selectedCategories, setSelectedCategories] = useState<ItemCategory[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategoryToggle = (category: ItemCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <LennyLogo size="lg" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
            Lendly
          </h1>
        </div>
        <h2 className="text-4xl font-extrabold">
          Rent cool stuff in Tel Aviv — 🎥 🎧 🔧 ⛺ insured, verified, instant.
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Book in minutes. Earn from your gear when you're not using it.
        </p>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="What do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button size="lg" className="px-8">
                🔍 Search
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <CategoryPills
                categories={allCategories}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Featured Items */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Featured Gear</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-center">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h4 className="text-xl font-semibold">1. Search & Book</h4>
              <p className="text-muted-foreground">
                Find the perfect gear for your needs and book instantly with secure payments.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="text-4xl">🤝</div>
              <h4 className="text-xl font-semibold">2. Meet & Rent</h4>
              <p className="text-muted-foreground">
                Connect with the owner, pick up your gear, and start your adventure!
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="text-4xl">⭐</div>
              <h4 className="text-xl font-semibold">3. Return & Review</h4>
              <p className="text-muted-foreground">
                Return the gear and leave a review to help the community grow.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { emoji: '📷', label: 'Cameras & Drones', categories: ['DRONE', 'CAMERA', 'LENS'] },
            { emoji: '🎧', label: 'DJ & Party', categories: ['DJ_TOOL', 'PARTY_GEAR', 'PROJECTOR'] },
            { emoji: '🏠', label: 'Event Appliances', categories: ['APPLIANCE'] },
            { emoji: '🔧', label: 'Handyman Tools', categories: ['POWER_TOOL', 'LADDER', 'PRESSURE_WASHER'] },
            { emoji: '⛺', label: 'Camping & Outdoors', categories: ['CAMPING'] }
          ].map((group) => (
            <Card 
              key={group.label}
              className="cursor-pointer hover:shadow-lg transition-shadow p-4 text-center"
              onClick={() => setSelectedCategories(group.categories as ItemCategory[])}
            >
              <CardContent className="space-y-2">
                <div className="text-3xl">{group.emoji}</div>
                <h4 className="font-semibold">{group.label}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
