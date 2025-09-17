'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Shield, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { Filters } from '@/lib/types';
import { t } from '@/lib/i18n';
import { DistanceChips } from './DistanceChips';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface FiltersBarProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  locale?: 'en' | 'he';
}

export function FiltersBar({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  locale = 'en' 
}: FiltersBarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateRangeSelect = (start: string, end: string) => {
    onFiltersChange({ start, end });
    setIsCalendarOpen(false);
  };

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: number) => {
    onFiltersChange({ [field]: value });
  };

  const handleToggle = (field: keyof Filters) => {
    onFiltersChange({ [field]: !filters[field] });
  };

  const handleRadiusChange = (radiusKm: number) => {
    onFiltersChange({ radiusKm });
  };

  const hasActiveFilters = 
    filters.start || 
    filters.end || 
    filters.radiusKm || 
    filters.priceMin || 
    filters.priceMax || 
    filters.verifiedOnly || 
    filters.insuredOnly || 
    filters.availableOnly;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-coral" />
            {t('filters.title', locale)}
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearFilters}
              className="text-gray-600 hover:text-gray-800"
            >
              {t('filters.clear', locale)}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('filters.dates', locale)}
          </label>
          <Sheet open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal"
                aria-label={t('filters.dates', locale)}
              >
                {filters.start && filters.end 
                  ? `${filters.start} - ${filters.end}`
                  : t('booking.select_dates', locale)
                }
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>{t('filters.dates', locale)}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <AvailabilityCalendar 
                  onDateRangeSelect={handleDateRangeSelect}
                  locale={locale}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t('filters.price_range', locale)}
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin || ''}
                onChange={(e) => handlePriceChange('priceMin', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
                aria-label="Minimum price"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax || ''}
                onChange={(e) => handlePriceChange('priceMax', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
                aria-label="Maximum price"
              />
            </div>
            <p className="text-xs text-gray-500">₪ per day</p>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t('filters.distance', locale)}
          </label>
          <DistanceChips 
            selectedRadius={filters.radiusKm || 5}
            onRadiusChange={handleRadiusChange}
          />
        </div>

        <Separator />

        {/* Toggle Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {t('filters.available_only', locale)}
            </label>
            <Button
              variant={filters.availableOnly ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('availableOnly')}
              className={filters.availableOnly ? "bg-coral hover:bg-coral/90" : ""}
            >
              {filters.availableOnly ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('filters.verified_owners', locale)}
            </label>
            <Button
              variant={filters.verifiedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('verifiedOnly')}
              className={filters.verifiedOnly ? "bg-coral hover:bg-coral/90" : ""}
            >
              {filters.verifiedOnly ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('filters.insured', locale)}
            </label>
            <Button
              variant={filters.insuredOnly ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('insuredOnly')}
              className={filters.insuredOnly ? "bg-coral hover:bg-coral/90" : ""}
            >
              {filters.insuredOnly ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
