'use client';

import { Item } from '@/lib/types';
import { ListingCard } from './ListingCard';

interface ListingGridProps {
  items: Item[];
  distances?: { [itemId: string]: number };
  onItemHover?: (item: Item | null) => void;
  locale?: 'en' | 'he';
}

export function ListingGrid({ 
  items, 
  distances = {}, 
  onItemHover, 
  locale = 'en' 
}: ListingGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">
          No items found
        </div>
        <p className="text-gray-400">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ListingCard
          key={item.id}
          item={item}
          distanceKm={distances[item.id]}
          onHover={onItemHover}
          locale={locale}
        />
      ))}
    </div>
  );
}
