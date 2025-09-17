'use client';

import { Category } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TreePine, 
  Hammer, 
  PartyPopper, 
  Drone, 
  Camera, 
  Wrench, 
  Tent,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { t } from '@/lib/i18n';

// Icon mapping for categories
const iconMap = {
  gardening: TreePine,
  construction: Hammer,
  events: PartyPopper,
  drones: Drone,
  cameras: Camera,
  power_tools: Wrench,
  camping: Tent,
};

interface CategoryTileProps {
  category: Category;
  locale?: 'en' | 'he';
}

export function CategoryTile({ category, locale = 'en' }: CategoryTileProps) {
  const IconComponent = iconMap[category.key];
  const categoryTitle = t(`category.${category.key}`, locale);

  return (
    <Link href={`/il/tel-aviv/${category.key}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white hover:bg-gray-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-coral/10 group-hover:bg-coral/20 transition-colors">
              <IconComponent className="h-6 w-6 text-coral" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-coral transition-colors" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-deep-ink group-hover:text-coral transition-colors">
              {categoryTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {category.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {category.exampleItems.slice(0, 3).map((item, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
