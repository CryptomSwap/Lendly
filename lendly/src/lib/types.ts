// Core types for Lendly marketplace

export type Category = 
  | 'cameras'
  | 'drones' 
  | 'construction'
  | 'gardening'
  | 'event-equipment'
  | 'power-tools'
  | 'camping'
  | 'audio-pa'

export interface Location {
  city: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Owner {
  id: string
  name: string
  avatar?: string
  verified: boolean
  rating: number
  reviewCount: number
  responseTime: string
  joinedDate: string
}

export interface Item {
  id: string
  title: string
  description: string
  category: Category
  images: string[]
  pricePerDay: number
  deposit: number
  location: Location
  owner: Owner
  rating: number
  reviewCount: number
  available: boolean
  verified: boolean
  insured: boolean
  instantBook: boolean
  specs: Record<string, string>
  availability: {
    startDate: string
    endDate: string
  }[]
  bookings: {
    startDate: string
    endDate: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Filters {
  category?: Category
  city?: string
  startDate?: string
  endDate?: string
  priceMin?: number
  priceMax?: number
  radiusKm?: number
  availableOnly?: boolean
  verifiedOnly?: boolean
  insuredOnly?: boolean
  sortBy?: 'nearest' | 'price-asc' | 'price-desc' | 'rating'
}

export interface BookingPrice {
  subtotal: number
  insurance: number
  fee: number
  total: number
  deposit: number
  days: number
}

export interface RecentActivity {
  id: string
  type: 'booking' | 'listing' | 'review'
  title: string
  description: string
  location: string
  distance: number
  timestamp: string
  user: {
    name: string
    avatar?: string
  }
  item?: {
    id: string
    title: string
    image: string
    price: number
  }
}

export interface DepositQuote {
  amount: number
  explanation: string[]
  riskFactors: string[]
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form types
export interface SearchForm {
  category?: Category
  location: string
  startDate?: Date
  endDate?: Date
}

export interface BookingForm {
  itemId: string
  startDate: Date
  endDate: Date
  insurance: boolean
  specialRequests?: string
}

// UI State types
export interface ViewMode {
  type: 'list' | 'map' | 'split'
}

export interface MapState {
  center: { lat: number; lng: number }
  zoom: number
  bounds?: {
    north: number
    south: number
    east: number
    west: number
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
}

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fonts: {
    sans: string
    mono: string
  }
  spacing: {
    base: number
    scale: number[]
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}
