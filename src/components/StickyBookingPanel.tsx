'use client';

import { useState } from 'react';
import { Item } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Shield, AlertCircle, CreditCard } from 'lucide-react';
import { formatPrice, calculatePricing, calculateDays } from '@/lib/pricing';
import { t } from '@/lib/i18n';

interface StickyBookingPanelProps {
  item: Item;
  locale?: 'en' | 'he';
}

export function StickyBookingPanel({ item, locale = 'en' }: StickyBookingPanelProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [addInsurance, setAddInsurance] = useState(false);

  const days = startDate && endDate ? calculateDays(startDate, endDate) : 0;
  const pricing = days > 0 ? calculatePricing(item.dailyPriceILS, days, addInsurance) : null;

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }
    
    alert(`Booking ${item.title} from ${startDate} to ${endDate}`);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-deep-ink">
          {formatPrice(item.dailyPriceILS)}
          <span className="text-sm font-normal text-gray-500 ml-1">
            {t('listing.price_per_day', locale)}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('booking.select_dates', locale)}
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
              aria-label="Start date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              disabled={!startDate}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral disabled:bg-gray-100"
              aria-label="End date"
            />
          </div>
        </div>

        {/* Insurance Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('booking.add_insurance', locale)}
          </label>
          <Button
            variant={addInsurance ? "default" : "outline"}
            size="sm"
            onClick={() => setAddInsurance(!addInsurance)}
            className={addInsurance ? "bg-coral hover:bg-coral/90" : ""}
          >
            {addInsurance ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Price Breakdown */}
        {pricing && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t('booking.subtotal', locale)}</span>
                <span>{formatPrice(pricing.subtotal)}</span>
              </div>
              
              {addInsurance && (
                <div className="flex justify-between text-sm">
                  <span>{t('booking.insurance', locale)}</span>
                  <span>{formatPrice(pricing.insurance)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span>{t('booking.service_fee', locale)}</span>
                <span>{formatPrice(pricing.serviceFee)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>{t('booking.total', locale)}</span>
                <span>{formatPrice(pricing.total)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t('booking.deposit', locale)}</span>
                <span>{formatPrice(pricing.deposit)}</span>
              </div>
            </div>
          </>
        )}

        {/* Deposit Note */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              {t('booking.deposit_note', locale)}
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBooking}
          disabled={!startDate || !endDate}
          className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-3"
          size="lg"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          {t('booking.book_now', locale)}
        </Button>
      </CardContent>
    </Card>
  );
}
