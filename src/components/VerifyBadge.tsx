import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface VerifyBadgeProps {
  status: 'PENDING' | 'VERIFIED' | 'REJECTED'
  size?: 'sm' | 'md' | 'lg'
}

export function VerifyBadge({ status, size = 'md' }: VerifyBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  const statusConfig = {
    VERIFIED: {
      label: 'Verified',
      icon: '✅',
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    PENDING: {
      label: 'Pending',
      icon: '⏳',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    REJECTED: {
      label: 'Rejected',
      icon: '❌',
      className: 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const config = statusConfig[status]

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${sizeClasses[size]} border`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  )
}

interface TrustRowProps {
  className?: string
}

export function TrustRow({ className = '' }: TrustRowProps) {
  return (
    <div className={`flex items-center gap-4 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-1">
        <span>✅</span>
        <span>ID verified</span>
      </div>
      <div className="flex items-center gap-1">
        <span>🔒</span>
        <span>Secure payments</span>
      </div>
      <div className="flex items-center gap-1">
        <span>🛡️</span>
        <span>Insurance optional</span>
      </div>
    </div>
  )
}
