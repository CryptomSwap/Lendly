'use client'

import { LennyLogo } from '@/components/LennyLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'drone',
    emoji: '🚁',
    title: 'Drones & Aerial',
    description: 'Professional drones for photography and videography',
    count: '24 items',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'camera',
    emoji: '📷',
    title: 'Cameras & Lenses',
    description: 'DSLR, mirrorless, and professional camera equipment',
    count: '31 items',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'dj',
    emoji: '🎧',
    title: 'DJ & Audio',
    description: 'Controllers, speakers, and professional audio gear',
    count: '18 items',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'party',
    emoji: '🎉',
    title: 'Party & Events',
    description: 'Projectors, lighting, and event equipment',
    count: '12 items',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'tools',
    emoji: '🔧',
    title: 'Power Tools',
    description: 'Drills, saws, and construction equipment',
    count: '28 items',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'ladder',
    emoji: '🪜',
    title: 'Ladders & Safety',
    description: 'Extension ladders, scaffolding, and safety gear',
    count: '15 items',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'pressure',
    emoji: '💧',
    title: 'Pressure Washers',
    description: 'High-pressure cleaning equipment',
    count: '8 items',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'camping',
    emoji: '⛺',
    title: 'Camping & Outdoors',
    description: 'Tents, sleeping bags, and outdoor gear',
    count: '22 items',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'appliance',
    emoji: '🏠',
    title: 'Home Appliances',
    description: 'Vacuum cleaners, air conditioners, and more',
    count: '16 items',
    color: 'from-gray-500 to-gray-600'
  }
]

export default function CategoriesPage() {
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
                Categories
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
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect equipment for your project. All items are verified, insured, and ready to rent.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 group"
              onClick={() => window.location.href = `/category/${category.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-coral transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-coral">
                    Browse items
                  </span>
                  <ArrowRight className="w-4 h-4 text-coral group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Most Popular</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { emoji: '📷', label: 'Cameras & Drones', count: '55 items' },
              { emoji: '🎧', label: 'DJ & Party', count: '30 items' },
              { emoji: '🔧', label: 'Handyman Tools', count: '43 items' },
              { emoji: '⛺', label: 'Camping & Outdoors', count: '37 items' },
              { emoji: '🏠', label: 'Home Appliances', count: '16 items' }
            ].map((category) => (
              <Card 
                key={category.label}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 p-4 text-center group"
                onClick={() => {
                  const categoryMap: { [key: string]: string } = {
                    'Cameras & Drones': 'camera',
                    'DJ & Party': 'dj',
                    'Handyman Tools': 'tools',
                    'Camping & Outdoors': 'camping',
                    'Home Appliances': 'appliance'
                  }
                  window.location.href = `/category/${categoryMap[category.label] || 'tools'}`
                }}
              >
                <CardContent className="space-y-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h4 className="font-semibold text-sm">{category.label}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-coral to-teal text-white p-8">
            <CardContent className="space-y-4">
              <h3 className="text-2xl font-bold">Can't find what you're looking for?</h3>
              <p className="text-lg opacity-90">
                Request a specific item or browse all available equipment
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
