import { Shield } from 'lucide-react'

interface InsuranceBadgeProps {
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function InsuranceBadge({ size = 'sm', className = '' }: InsuranceBadgeProps) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8'
  }

  const iconSizes = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  }

  return (
    <div className={`${sizeClasses[size]} bg-sky-500 rounded-full flex items-center justify-center ${className}`}>
      <Shield className={`${iconSizes[size]} text-white`} />
    </div>
  )
}
