'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  ArrowUpDown,
  MapPin,
  DollarSign,
  Star
} from 'lucide-react'
import { cx } from '@/lib/ui'

interface SortMenuProps {
  value: string
  onChange: (value: string) => void
}

export function SortMenu({ value, onChange }: SortMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    {
      value: 'nearest',
      label: 'Nearest',
      icon: MapPin,
      description: 'Sort by distance'
    },
    {
      value: 'price-asc',
      label: 'Price: Low to High',
      icon: DollarSign,
      description: 'Sort by price ascending'
    },
    {
      value: 'price-desc',
      label: 'Price: High to Low',
      icon: DollarSign,
      description: 'Sort by price descending'
    },
    {
      value: 'rating',
      label: 'Highest Rated',
      icon: Star,
      description: 'Sort by rating'
    }
  ]

  const currentOption = sortOptions.find(option => option.value === value) || sortOptions[0]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Sort by {currentOption.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border-slate-200 shadow-lg rounded-xl">
        {sortOptions.map((option) => {
          const Icon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cx(
                "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                value === option.value
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <Icon className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-slate-500">{option.description}</span>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
