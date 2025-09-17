'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { t } from '@/lib/i18n';
import { GoogleMaps } from '@/components/GoogleMaps';
import { ClientOnly } from '@/components/ClientOnly';

interface MapWithClustersProps {
  items: Item[];
  focusedItem?: Item | null;
  onItemFocus?: (item: Item | null) => void;
  onSearchArea?: () => void;
  locale?: 'en' | 'he';
}

export function MapWithClusters({ 
  items, 
  focusedItem, 
  onItemFocus, 
  onSearchArea,
  locale = 'en' 
}: MapWithClustersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral mx-auto mb-4"></div>
            <p className="text-gray-500">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-0 h-full">
        <ClientOnly
          fallback={
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral mx-auto mb-4"></div>
                <p className="text-gray-500">Loading map...</p>
              </div>
            </div>
          }
        >
          <GoogleMaps
            items={items}
            focusedItem={focusedItem}
            onItemFocus={onItemFocus}
            onSearchArea={onSearchArea}
            locale={locale}
            className="h-full"
          />
        </ClientOnly>
      </CardContent>
    </Card>
  );
}
