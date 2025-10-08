'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Star, Shield } from 'lucide-react'
import { formatILS } from '@/lib/currency'
import { calcPricing } from '@/lib/pricing'
import { DepositWidget } from './DepositWidget'

interface StickyBookingPanelProps {
  item: {
    id: string
    title: string
    dailyPriceILS: number
    depositILS: number
    city: string
    averageRating: number
    reviewCount: number
    owner: {
      name: string
      verification: { status: string }
    }
  }
  selectedDates: { start: Date | null, end: Date | null }
  depositQuote: any
}

export function StickyBookingPanel({ item, selectedDates, depositQuote }: StickyBookingPanelProps) {
  const [insuranceEnabled, setInsuranceEnabled] = useState(true)
  const [isBooking, setIsBooking] = useState(false)

  const days = selectedDates.start && selectedDates.end 
    ? Math.ceil((selectedDates.end.getTime() - selectedDates.start.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const pricing = days > 0 ? calcPricing(days, item.dailyPriceILS) : null

  const handleBookNow = async () => {
    if (!selectedDates.start || !selectedDates.end || !pricing) return

    setIsBooking(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          startDate: selectedDates.start.toISOString(),
          endDate: selectedDates.end.toISOString(),
          depositILS: depositQuote?.depositILS || item.depositILS
        })
      })

      const data = await response.json()
      
      if (data.clientSecret) {
        // Redirect to Stripe Checkout or handle payment
        console.log('Booking created:', data)
        // TODO: Implement Stripe payment flow
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {item.city}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {formatILS(item.dailyPriceILS)}
              </div>
              <div className="text-sm text-gray-500">per day</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Owner Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium">
                  {item.owner.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium">{item.owner.name}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {item.averageRating} ({item.reviewCount} reviews)
                </div>
              </div>
            </div>
            {item.owner.verification.status === 'VERIFIED' && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Dates
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="date"
                  placeholder="Start date"
                  value={selectedDates.start?.toISOString().split('T')[0] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Handle date change
                  }}
                />
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="End date"
                  value={selectedDates.end?.toISOString().split('T')[0] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Handle date change
                  }}
                />
              </div>
            </div>
          </div>

          {/* Insurance Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Insurance Coverage</div>
              <div className="text-sm text-gray-600">
                Protect against damage and theft
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={insuranceEnabled}
                onChange={(e) => setInsuranceEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Pricing Breakdown */}
          {pricing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{formatILS(item.dailyPriceILS)} × {days} days</span>
                <span>{formatILS(pricing.subtotal)}</span>
              </div>
              {insuranceEnabled && (
                <div className="flex justify-between text-sm">
                  <span>Insurance</span>
                  <span>{formatILS(pricing.insurance)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Platform fee</span>
                <span>{formatILS(pricing.fee)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatILS(pricing.total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Deposit Widget */}
          {depositQuote && (
            <DepositWidget depositQuote={depositQuote} />
          )}

          {/* Book Button */}
          <Button
            className="w-full"
            size="lg"
            disabled={!selectedDates.start || !selectedDates.end || isBooking}
            onClick={handleBookNow}
          >
            {isBooking ? 'Processing...' : 'Book Now'}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            You won't be charged until the owner confirms your booking
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
