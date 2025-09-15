import { Badge } from '@/components/ui/badge'
import { ItemCategory } from '@prisma/client'

interface CategoryPillsProps {
  categories: ItemCategory[]
  selectedCategories: ItemCategory[]
  onCategoryToggle: (category: ItemCategory) => void
}

const categoryLabels: Record<ItemCategory, string> = {
  DRONE: 'Drones',
  CAMERA: 'Cameras',
  LENS: 'Lenses',
  DJ_TOOL: 'DJ Tools',
  PARTY_GEAR: 'Party Gear',
  PROJECTOR: 'Projectors',
  POWER_TOOL: 'Power Tools',
  LADDER: 'Ladders',
  PRESSURE_WASHER: 'Pressure Washers',
  CAMPING: 'Camping',
  APPLIANCE: 'Appliances'
}

const categoryEmojis: Record<ItemCategory, string> = {
  DRONE: '🚁',
  CAMERA: '📷',
  LENS: '🔍',
  DJ_TOOL: '🎧',
  PARTY_GEAR: '🎉',
  PROJECTOR: '📽️',
  POWER_TOOL: '🔧',
  LADDER: '🪜',
  PRESSURE_WASHER: '💧',
  CAMPING: '⛺',
  APPLIANCE: '🏠'
}

export function CategoryPills({ categories, selectedCategories, onCategoryToggle }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategories.includes(category) ? "default" : "outline"}
          className={`cursor-pointer transition-colors ${
            selectedCategories.includes(category)
              ? 'bg-coral text-white'
              : 'hover:bg-coral/10'
          }`}
          onClick={() => onCategoryToggle(category)}
        >
          {categoryEmojis[category]} {categoryLabels[category]}
        </Badge>
      ))}
    </div>
  )
}
