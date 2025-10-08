import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, Clock, XCircle } from 'lucide-react'

interface VerifyBadgeProps {
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'UNVERIFIED'
}

export function VerifyBadge({ status }: VerifyBadgeProps) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          text: 'Verified'
        }
      case 'PENDING':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          text: 'Pending Verification'
        }
      case 'REJECTED':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          text: 'Verification Failed'
        }
      case 'UNVERIFIED':
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-600 border-gray-200',
          icon: Shield,
          text: 'Unverified'
        }
    }
  }

  const config = getBadgeConfig()
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={`${config.className} flex items-center`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>
  )
}
