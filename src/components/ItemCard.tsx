import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItemCategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface ItemCardProps {
  id: string
  title: string
  description: string
  category: ItemCategory
  dailyPrice: number
  deposit: number
  images: string[]
  owner: {
    name: string | null
    verificationStatus: string
  }
  reviews: Array<{ rating: number }>
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

const categoryColors: Record<ItemCategory, string> = {
  DRONE: 'bg-blue-100 text-blue-800',
  CAMERA: 'bg-purple-100 text-purple-800',
  LENS: 'bg-indigo-100 text-indigo-800',
  DJ_TOOL: 'bg-pink-100 text-pink-800',
  PARTY_GEAR: 'bg-yellow-100 text-yellow-800',
  PROJECTOR: 'bg-orange-100 text-orange-800',
  POWER_TOOL: 'bg-gray-100 text-gray-800',
  LADDER: 'bg-slate-100 text-slate-800',
  PRESSURE_WASHER: 'bg-cyan-100 text-cyan-800',
  CAMPING: 'bg-green-100 text-green-800',
  APPLIANCE: 'bg-red-100 text-red-800'
}

export function ItemCard({ 
  id, 
  title, 
  description, 
  category, 
  dailyPrice, 
  deposit, 
  images, 
  owner, 
  reviews 
}: ItemCardProps) {
  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const formatPrice = (price: number) => `₪${(price / 100).toFixed(0)}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={images[0] || '/placeholder-item.jpg'}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className={`${categoryColors[category]} border-0`}>
              {categoryEmojis[category]} {category.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-1">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={owner.avatar || undefined} />
            <AvatarFallback className="text-xs">
              {owner.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{owner.name}</span>
          {owner.verificationStatus === 'VERIFIED' && (
            <Badge variant="secondary" className="text-xs">✅ Verified</Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-semibold">{formatPrice(dailyPrice)}</span>
            <span className="text-muted-foreground">/day</span>
          </div>
          {avgRating > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span>{avgRating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/items/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
