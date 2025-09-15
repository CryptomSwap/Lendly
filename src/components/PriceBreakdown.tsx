import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { useState } from 'react'

interface PriceBreakdownProps {
  dailyPrice: number
  deposit: number
  days: number
  insuranceEnabled: boolean
  onInsuranceToggle: (enabled: boolean) => void
  promoDiscount?: number
}

export function PriceBreakdown({ 
  dailyPrice, 
  deposit, 
  days, 
  insuranceEnabled, 
  onInsuranceToggle,
  promoDiscount = 0 
}: PriceBreakdownProps) {
  const subtotal = days * dailyPrice
  const insurance = insuranceEnabled ? Math.round(subtotal * 0.05) : 0
  const fee = Math.round(subtotal * 0.18)
  const total = subtotal + insurance + fee - promoDiscount

  const formatPrice = (price: number) => `₪${(price / 100).toFixed(0)}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 Price Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{formatPrice(dailyPrice)} × {days} days</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>🛡️ Insurance</span>
              <Toggle
                pressed={insuranceEnabled}
                onPressedChange={onInsuranceToggle}
                size="sm"
              />
            </div>
            <span>{formatPrice(insurance)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Service fee (18%)</span>
            <span>{formatPrice(fee)}</span>
          </div>
          
          {promoDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>🎁 Promo discount</span>
              <span>-{formatPrice(promoDiscount)}</span>
            </div>
          )}
          
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <span>💳</span>
            <span>Deposit: {formatPrice(deposit)} (held, not charged)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
