'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

const sortOptions = [
  { value: 'nearest', label: 'Nearest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const selectedOption = sortOptions.find(option => option.value === value)

  return (
    <div className="relative">
      <Button variant="outline" className="min-w-[150px] justify-between">
        <span>{selectedOption?.label || 'Sort by'}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
      
      {/* Dropdown menu would be implemented with a proper dropdown component */}
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
