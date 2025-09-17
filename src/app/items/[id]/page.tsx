'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LennyLogo } from '@/components/LennyLogo'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Calendar, Shield, User, MessageCircle, Heart } from 'lucide-react'

// Import mock data from centralized source
import { mockItems } from '@/lib/mock'

// Get item by ID from mock data
const getItemById = (id: string) => {
  const item = mockItems.find(item => item.id === id)
  if (!item) return null
  
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category.toUpperCase(),
    dailyPrice: item.pricePerDay,
    deposit: item.deposit,
    location: 'Tel Aviv, Israel', // You could add city data to mock items
    images: [
      item.image,
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'
    ],
    owner: {
      name: item.owner.name,
      avatar: item.owner.avatar,
      verificationStatus: item.owner.verified ? 'VERIFIED' : 'PENDING',
      rating: item.rating,
      reviewCount: item.reviewCount
    },
    reviews: [
      {
        id: 1,
        user: 'David K.',
        rating: 5,
        comment: 'Excellent equipment, owner was very helpful and the item was in perfect condition.',
        date: '2 days ago'
      },
      {
        id: 2,
        user: 'Mike R.',
        rating: 5,
        comment: 'Great rental experience. The equipment worked flawlessly and owner provided great tips.',
        date: '1 week ago'
      }
    ],
    availability: [
      { date: '2024-12-20', available: true },
      { date: '2024-12-21', available: true },
      { date: '2024-12-22', available: false },
      { date: '2024-12-23', available: true },
      { date: '2024-12-24', available: true }
    ]
  }
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDates, setSelectedDates] = useState<{ start: string; end: string } | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  
  const item = getItemById(params.id)
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    )
  }


  const handleBooking = async () => {
    // Skip authentication check for demo purposes
    setIsBooking(true)
    // In a real app, you'd process the booking here
    setTimeout(() => {
      setIsBooking(false)
      alert('Booking request sent! The owner will confirm within 24 hours.')
    }, 2000)
  }

  const calculateTotal = () => {
    if (!selectedDates) return 0
    const start = new Date(selectedDates.start)
    const end = new Date(selectedDates.end)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return days * item.dailyPrice
  }

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
                Item Details
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
          <Link href="/marketing" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={item.images[selectedImage]}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-coral' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Reviews ({item.reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-warm-yellow text-warm-yellow' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.owner.avatar}
                    alt={item.owner.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{item.owner.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-xs">Verified</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
                        <span className="text-sm">{item.owner.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.owner.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Owner
                </Button>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily rate</span>
                  <span className="font-semibold">₪{item.dailyPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span className="font-semibold">₪{item.deposit}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total (2 days)</span>
                    <span>₪{calculateTotal() || item.dailyPrice * 2}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Book This Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select dates</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="px-3 py-2 border rounded-lg text-sm"
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border rounded-lg text-sm"
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-coral to-teal hover:from-coral/90 hover:to-teal/90"
                  onClick={handleBooking}
                  disabled={isBooking || !selectedDates}
                >
                  {isBooking ? 'Processing...' : 'Request to Book'}
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Fully insured rental</span>
                </div>
              </CardContent>
            </Card>

            {/* Save for Later */}
            <Button variant="outline" className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}