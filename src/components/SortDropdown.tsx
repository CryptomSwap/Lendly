'use client';

import { SortOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ArrowUp, ArrowDown, Star } from 'lucide-react';
import { t } from '@/lib/i18n';

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
  locale?: 'en' | 'he';
}

const sortOptions: SortOption[] = [
  { value: 'nearest', label: 'sort.nearest' },
  { value: 'price_asc', label: 'sort.price_low' },
  { value: 'price_desc', label: 'sort.price_high' },
  { value: 'rating', label: 'sort.rating' },
];

export function SortDropdown({ selectedSort, onSortChange, locale = 'en' }: SortDropdownProps) {
  const selectedOption = sortOptions.find(option => option.value === selectedSort) || sortOptions[0];

  const getSortIcon = (value: string) => {
    switch (value) {
      case 'nearest':
        return <ArrowUpDown className="h-4 w-4" />;
      case 'price_asc':
        return <ArrowUp className="h-4 w-4" />;
      case 'price_desc':
        return <ArrowDown className="h-4 w-4" />;
      case 'rating':
        return <Star className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 min-w-[160px] justify-between"
          aria-label="Sort options"
        >
          {getSortIcon(selectedSort)}
          <span>{t(selectedOption.label, locale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {getSortIcon(option.value)}
            <span>{t(option.label, locale)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
