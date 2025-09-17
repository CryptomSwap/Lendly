'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface DistanceChipsProps {
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
}

const radiusOptions = [2, 5, 10, 25];

export function DistanceChips({ selectedRadius, onRadiusChange }: DistanceChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {radiusOptions.map((radius) => (
        <Button
          key={radius}
          variant={selectedRadius === radius ? "default" : "outline"}
          size="sm"
          onClick={() => onRadiusChange(radius)}
          className={`flex items-center gap-1 ${
            selectedRadius === radius 
              ? "bg-coral hover:bg-coral/90 text-white" 
              : "hover:bg-gray-50"
          }`}
        >
          <MapPin className="h-3 w-3" />
          {radius} km
        </Button>
      ))}
    </div>
  );
}
