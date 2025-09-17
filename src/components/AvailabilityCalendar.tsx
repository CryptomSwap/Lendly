'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Shield, AlertCircle } from 'lucide-react';
import { formatPrice, calculatePricing, calculateDays } from '@/lib/pricing';
import { t } from '@/lib/i18n';

interface AvailabilityCalendarProps {
  onDateRangeSelect: (start: string, end: string) => void;
  locale?: 'en' | 'he';
}

export function AvailabilityCalendar({ 
  onDateRangeSelect, 
  locale = 'en' 
}: AvailabilityCalendarProps) {
  const [selectedStart, setSelectedStart] = useState<string>('');
  const [selectedEnd, setSelectedEnd] = useState<string>('');

  const handleStartDateChange = (date: string) => {
    setSelectedStart(date);
    if (selectedEnd && date > selectedEnd) {
      setSelectedEnd('');
    }
  };

  const handleEndDateChange = (date: string) => {
    setSelectedEnd(date);
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      onDateRangeSelect(selectedStart, selectedEnd);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={selectedStart}
            onChange={(e) => handleStartDateChange(e.target.value)}
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={selectedEnd}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={selectedStart || today}
            disabled={!selectedStart}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral disabled:bg-gray-100"
          />
        </div>
      </div>

      {selectedStart && selectedEnd && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {calculateDays(selectedStart, selectedEnd)} days selected
            </span>
          </div>
        </div>
      )}

      <Button 
        onClick={handleApply}
        disabled={!selectedStart || !selectedEnd}
        className="w-full bg-coral hover:bg-coral/90"
      >
        Apply Dates
      </Button>
    </div>
  );
}
