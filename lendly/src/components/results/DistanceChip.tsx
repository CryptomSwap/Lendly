import { MapPin } from 'lucide-react'
import { formatDistance } from '@/lib/ui'

interface DistanceChipProps {
  distance: number
  className?: string
}

export function DistanceChip({ distance, className = '' }: DistanceChipProps) {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 bg-black/80 text-white rounded-full text-xs font-medium backdrop-blur-sm ${className}`}>
      <MapPin className="w-3 h-3" />
      {formatDistance(distance)}
    </div>
  )
}
