'use client';

import { Category } from '@/lib/types';
import { CategoryTile } from './CategoryTile';

interface CategoryGridProps {
  categories: Category[];
  locale?: 'en' | 'he';
}

export function CategoryGrid({ categories, locale = 'en' }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryTile 
          key={category.key} 
          category={category} 
          locale={locale}
        />
      ))}
    </div>
  );
}
