import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Shield, 
  Clock,
  MessageCircle,
  Phone
} from 'lucide-react'
import { Owner } from '@/lib/types'
import { cx } from '@/lib/ui'

interface OwnerCardProps {
  owner: Owner
}

export function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">About the Owner</h2>
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img 
            src={owner.avatar || `https://ui-avatars.com/api/?name=${owner.name}&background=ecfdf5&color=10b981`}
            alt={owner.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-slate-900">{owner.name}</h3>
            {owner.verified && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="font-medium">{owner.rating}</span>
              <span>({owner.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{owner.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Joined {new Date(owner.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-slate-600 mb-6">
            Professional equipment owner with {owner.reviewCount}+ successful rentals. 
            All equipment is well-maintained and regularly serviced.
          </p>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
