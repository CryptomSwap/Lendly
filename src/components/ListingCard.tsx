'use client';

import { Item } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  MapPin, 
  Shield, 
  CheckCircle, 
  Calendar,
  Heart
} from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { formatDistance } from '@/lib/geo';
import { t } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

interface ListingCardProps {
  item: Item;
  distanceKm?: number;
  onHover?: (item: Item | null) => void;
  locale?: 'en' | 'he';
}

export function ListingCard({ 
  item, 
  distanceKm, 
  onHover, 
  locale = 'en' 
}: ListingCardProps) {
  const handleMouseEnter = () => {
    onHover?.(item);
  };

  const handleMouseLeave = () => {
    onHover?.(null);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white hover:bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={item.images[0] || '/api/placeholder/400/300'}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
            aria-label="Add to favorites"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </Button>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {item.verifiedOwner && (
              <Badge className="bg-green-500 text-white text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t('listing.verified', locale)}
              </Badge>
            )}
            {item.insured && (
              <Badge className="bg-blue-500 text-white text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {t('listing.insured', locale)}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Rating */}
          <div className="space-y-1">
            <Link href={`/items/${item.id}`}>
              <h3 className="font-semibold text-lg text-deep-ink group-hover:text-coral transition-colors line-clamp-2">
                {item.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({item.reviews} {t('listing.reviews', locale)})
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>

          {/* Price and Distance */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-deep-ink">
                  {formatPrice(item.dailyPriceILS)}
                </span>
                <span className="text-sm text-gray-500">
                  {t('listing.price_per_day', locale)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {t('listing.deposit', locale)}: {formatPrice(item.depositILS)}
              </div>
            </div>
            
            {distanceKm !== undefined && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{formatDistance(distanceKm)}</span>
              </div>
            )}
          </div>

          {/* Availability Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {item.availability.length > 0 
                ? `${item.availability.length} available periods`
                : 'Check availability'
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
