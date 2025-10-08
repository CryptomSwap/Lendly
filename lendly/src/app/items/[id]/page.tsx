'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { Gallery } from '@/components/listing/Gallery'
import { SpecsBlock } from '@/components/listing/SpecsBlock'
import { StickyBookingCard } from '@/components/listing/StickyBookingCard'
import { SafetySummary } from '@/components/listing/SafetySummary'
import { AvailabilityCalendar } from '@/components/listing/AvailabilityCalendar'
import { OwnerCard } from '@/components/listing/OwnerCard'
import { Reviews } from '@/components/listing/Reviews'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Shield, 
  Clock, 
  Heart,
  Share2,
  Flag,
  ArrowLeft,
  CheckCircle,
  Zap,
  Umbrella,
  Lock
} from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { getItemById } from '@/lib/mock'
import { Item } from '@/lib/types'
import { cx } from '@/lib/ui'

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [selectedDates, setSelectedDates] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  })
  const [depositQuote, setDepositQuote] = useState<{
    amount: number
    explanation: string[]
  } | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // In production, fetch item data based on params.id
    const foundItem = getItemById(params.id as string)
    if (foundItem) {
      setItem(foundItem)
    }
  }, [params.id])

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setSelectedDates({ start, end })
    
    // Calculate deposit quote when dates change
    if (start && end && item) {
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      
      // Mock risk inputs - in production, get from user profile
      const riskInputs = {
        itemValueILS: item.pricePerDay * 30, // Estimate item value
        category: item.category,
        itemFragility: 0.3,
        theftAppeal: 0.7,
        itemAgeYears: 2,
        hasTelemetry: false,
        renter: {
          idv: 'VERIFIED' as const,
          completed: 5,
          disputes: 0,
          accountDays: 365,
          billingMatch: true
        },
        context: {
          days,
          pickupMethod: 'IN_PERSON' as const,
          locationRisk: 0.3,
          nightPickup: false
        }
      }

      // Call deposit API
      fetch('/api/risk/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(riskInputs)
      })
      .then(res => res.json())
      .then(data => setDepositQuote(data))
      .catch(err => console.error('Error calculating deposit:', err))
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-fog flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-slate-600">Loading item details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1 hover:text-emerald transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to search
              </button>
              <span>/</span>
              <span className="text-slate-900 font-medium">{item.category}</span>
              <span>/</span>
              <span className="text-slate-900 font-medium">{item.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <Gallery images={item.images} />
              </div>

              {/* Item Details */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {item.category}
                      </Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                      {item.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-emerald-600">
                          {formatILS(item.pricePerDay)}
                        </span>
                        <span className="text-slate-500 ml-1">/day</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
                        <span className="font-semibold text-slate-900">{item.rating}</span>
                        <span className="ml-1">({item.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{item.location.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleFavorite}
                      className={cx(
                        "p-3 rounded-xl border transition-all",
                        isFavorite 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600'
                      )}
                    >
                      <Heart className={cx("w-5 h-5", isFavorite ? 'fill-current' : '')} />
                    </button>
                    <button className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-700 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-700 transition-all">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Trust Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {item.verified && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Verified Owner</span>
                    </div>
                  )}
                  {item.insured && (
                    <div className="flex items-center gap-2 p-3 bg-sky-50 rounded-xl">
                      <Umbrella className="w-5 h-5 text-sky-600" />
                      <span className="text-sm font-medium text-sky-700">Fully Insured</span>
                    </div>
                  )}
                  {item.instantBook && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Instant Book</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                    <Lock className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Protected Deposit</span>
                  </div>
                </div>

                {/* Specs */}
                <SpecsBlock specs={item.specs} category={item.category} />
              </div>

              {/* Owner Information */}
              <OwnerCard owner={item.owner} />

              {/* Availability Calendar */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Your Dates</h2>
                <AvailabilityCalendar 
                  availability={item.availability}
                  bookings={item.bookings}
                  onDateChange={handleDateChange}
                />
              </div>

              {/* Safety Summary */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <SafetySummary category={item.category} />
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Reviews itemId={item.id} />
              </div>
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <StickyBookingCard
                  item={item}
                  selectedDates={selectedDates}
                  depositQuote={depositQuote}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}