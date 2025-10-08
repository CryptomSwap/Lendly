'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Calendar,
  Shield,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { formatILS, calculateBookingCost, formatBookingCost } from '@/lib/currency'
import { Item } from '@/lib/types'
import { cx } from '@/lib/ui'
import { DepositWidget } from './DepositWidget'

interface StickyBookingCardProps {
  item: Item
  selectedDates: { start: Date | null; end: Date | null }
  depositQuote?: {
    amount: number
    explanation: string[]
  }
}

export function StickyBookingCard({ item, selectedDates, depositQuote }: StickyBookingCardProps) {
  const [insuranceEnabled, setInsuranceEnabled] = useState(true)
  const [isBooking, setIsBooking] = useState(false)

  const days = selectedDates.start && selectedDates.end 
    ? Math.ceil((selectedDates.end.getTime() - selectedDates.start.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const cost = days > 0 ? calculateBookingCost(item.pricePerDay, days) : null
  const formattedCost = cost ? formatBookingCost(cost) : null

  const handleBookNow = async () => {
    if (!selectedDates.start || !selectedDates.end) return
    
    setIsBooking(true)
    
    // TODO: Implement actual booking API call
    try {
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     itemId: item.id,
      //     startDate: selectedDates.start,
      //     endDate: selectedDates.end,
      //     insurance: insuranceEnabled
      //   })
      // })
      
      // Mock success
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Booking successful!')
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-slate-900">
          Book This Item
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Rental Period
          </label>
          <div className="p-4 bg-slate-50 rounded-xl">
            {selectedDates.start && selectedDates.end ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-slate-900">
                  {selectedDates.start.toLocaleDateString()} - {selectedDates.end.toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600">
                  {days} day{days !== 1 ? 's' : ''}
                </p>
              </div>
            ) : (
              <p className="text-slate-500 text-center">
                Select dates to see pricing
              </p>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        {cost && formattedCost && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Price Breakdown</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {formatILS(item.pricePerDay)} × {days} day{days !== 1 ? 's' : ''}
                </span>
                <span className="text-slate-900">{formattedCost.subtotal}</span>
              </div>
              
              {insuranceEnabled && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Insurance (5%)</span>
                  <span className="text-slate-900">{formattedCost.insurance}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Platform fee (18%)</span>
                <span className="text-slate-900">{formattedCost.platformFee}</span>
              </div>
              
              <div className="border-t border-slate-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">{formattedCost.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Toggle */}
        <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-sky-600" />
            <div>
              <p className="font-medium text-slate-900">Rental Insurance</p>
              <p className="text-sm text-slate-600">Protection against damage & theft</p>
            </div>
          </div>
          <Switch
            checked={insuranceEnabled}
            onCheckedChange={setInsuranceEnabled}
          />
        </div>

        {/* Deposit Widget */}
        {depositQuote && (
          <DepositWidget 
            amount={depositQuote.amount}
            explanation={depositQuote.explanation}
          />
        )}

        {/* Trust Indicators */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle className="w-4 h-4" />
            <span>Verified owner</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-sky-600">
            <Shield className="w-4 h-4" />
            <span>Fully insured</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <CreditCard className="w-4 h-4" />
            <span>Secure payment</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBookNow}
          disabled={!selectedDates.start || !selectedDates.end || isBooking}
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isBooking ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            'Book Now'
          )}
        </Button>

        {/* Safety Note */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            Your payment is secure and protected. You'll only be charged after the owner confirms your booking.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
