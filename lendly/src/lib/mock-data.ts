// Comprehensive mock data for lendly. marketplace
export interface User {
  id: string
  name: string
  avatar?: string
  verification: {
    status: 'VERIFIED' | 'PENDING' | 'UNVERIFIED'
    level: 'BASIC' | 'PREMIUM' | 'PROFESSIONAL'
    badges: string[]
  }
  rating: {
    average: number
    count: number
  }
  location: {
    city: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  joinedDate: string
  responseTime: string
  insurance: boolean
}

export interface Listing {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  images: string[]
  dailyPriceILS: number
  weeklyPriceILS?: number
  monthlyPriceILS?: number
  depositILS: number
  location: {
    city: string
    neighborhood?: string
    coordinates: {
      lat: number
      lng: number
    }
    address: string
  }
  owner: User
  specs: {
    brand?: string
    model?: string
    year?: number
    condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
    features: string[]
  }
  availability: {
    status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE'
    nextAvailable?: string
    blackoutDates: string[]
  }
  rating: {
    average: number
    count: number
    breakdown: {
      5: number
      4: number
      3: number
      2: number
      1: number
    }
  }
  reviews: Review[]
  trustFeatures: {
    verified: boolean
    insured: boolean
    instantBook: boolean
    backgroundCheck: boolean
    depositProtection: boolean
  }
  rules: string[]
  includedItems: string[]
  pickupInstructions: string
  returnInstructions: string
  createdAt: string
  updatedAt: string
  views: number
  bookings: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  verified: boolean
  images?: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  color: string
  subcategories: string[]
  popularItems: string[]
}

export interface RecentActivity {
  id: string
  type: 'BOOKING' | 'LISTING' | 'REVIEW' | 'VERIFICATION'
  title: string
  description: string
  location: string
  distance: number
  timestamp: string
  user: {
    name: string
    avatar?: string
  }
  listing?: {
    id: string
    title: string
    image: string
    price: number
  }
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'David M.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verification: {
      status: 'VERIFIED',
      level: 'PREMIUM',
      badges: ['ID_VERIFIED', 'PHONE_VERIFIED', 'EMAIL_VERIFIED']
    },
    rating: { average: 4.8, count: 12 },
    location: {
      city: 'Tel Aviv',
      country: 'Israel',
      coordinates: { lat: 32.0853, lng: 34.7818 }
    },
    joinedDate: '2023-01-15',
    responseTime: '< 1 hour',
    insurance: true
  },
  {
    id: '2',
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verification: {
      status: 'VERIFIED',
      level: 'BASIC',
      badges: ['ID_VERIFIED', 'EMAIL_VERIFIED']
    },
    rating: { average: 4.6, count: 8 },
    location: {
      city: 'Tel Aviv',
      country: 'Israel',
      coordinates: { lat: 32.0753, lng: 34.7718 }
    },
    joinedDate: '2023-03-22',
    responseTime: '< 2 hours',
    insurance: false
  },
  {
    id: '3',
    name: 'Mike R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verification: {
      status: 'VERIFIED',
      level: 'PROFESSIONAL',
      badges: ['ID_VERIFIED', 'PHONE_VERIFIED', 'EMAIL_VERIFIED', 'BUSINESS_VERIFIED']
    },
    rating: { average: 4.9, count: 15 },
    location: {
      city: 'Tel Aviv',
      country: 'Israel',
      coordinates: { lat: 32.0953, lng: 34.7918 }
    },
    joinedDate: '2022-11-08',
    responseTime: '< 30 min',
    insurance: true
  }
]

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'gardening',
    name: 'Gardening',
    icon: 'Sprout',
    description: 'Tools for your garden and outdoor spaces',
    color: 'bg-green-500',
    subcategories: ['Lawn Mowers', 'Hedge Trimmers', 'Leaf Blowers', 'Garden Tools'],
    popularItems: ['Professional Lawn Mower', 'Electric Hedge Trimmer', 'Garden Tool Set']
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: 'Hammer',
    description: 'Professional construction and renovation tools',
    color: 'bg-orange-500',
    subcategories: ['Power Tools', 'Hand Tools', 'Safety Equipment', 'Measuring Tools'],
    popularItems: ['Cordless Drill Set', 'Circular Saw', 'Safety Helmet']
  },
  {
    id: 'events',
    name: 'Events',
    icon: 'PartyPopper',
    description: 'Party and event equipment for celebrations',
    color: 'bg-pink-500',
    subcategories: ['Tables & Chairs', 'Sound Systems', 'Lighting', 'Decorations'],
    popularItems: ['DJ Equipment Package', 'Event Lighting Kit', 'Portable Sound System']
  },
  {
    id: 'drones',
    name: 'Drones',
    icon: 'Drone',
    description: 'Aerial photography and videography equipment',
    color: 'bg-blue-500',
    subcategories: ['Consumer Drones', 'Professional Drones', 'Accessories', 'Gimbals'],
    popularItems: ['DJI Mavic 3', 'Professional Drone Kit', 'Gimbal Stabilizer']
  },
  {
    id: 'cameras',
    name: 'Cameras',
    icon: 'Camera',
    description: 'Professional photography and videography gear',
    color: 'bg-purple-500',
    subcategories: ['DSLR Cameras', 'Mirrorless', 'Lenses', 'Accessories'],
    popularItems: ['Canon EOS R5', 'Sony A7IV', 'Professional Lens Kit']
  },
  {
    id: 'power-tools',
    name: 'Power Tools',
    icon: 'Wrench',
    description: 'Electric and battery-powered tools',
    color: 'bg-red-500',
    subcategories: ['Drills', 'Saws', 'Sanders', 'Grinders'],
    popularItems: ['Cordless Drill Set', 'Circular Saw', 'Angle Grinder']
  },
  {
    id: 'camping',
    name: 'Camping',
    icon: 'Tent',
    description: 'Outdoor adventure and camping equipment',
    color: 'bg-yellow-500',
    subcategories: ['Tents', 'Sleeping Bags', 'Cooking Gear', 'Backpacks'],
    popularItems: ['4-Person Tent', 'Sleeping Bag Set', 'Portable Stove']
  },
  {
    id: 'audio-pa',
    name: 'Audio/PA',
    icon: 'Volume2',
    description: 'Sound systems and audio equipment',
    color: 'bg-indigo-500',
    subcategories: ['Speakers', 'Mixers', 'Microphones', 'Amplifiers'],
    popularItems: ['PA Speaker System', 'DJ Mixer', 'Wireless Microphone Set']
  }
]

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Professional Camera Kit - Canon EOS R5 + Lenses',
    description: 'Complete professional photography setup including Canon EOS R5 body, 24-70mm f/2.8L lens, 70-200mm f/2.8L lens, and essential accessories. Perfect for weddings, events, and commercial photography.',
    category: 'cameras',
    subcategory: 'DSLR Cameras',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'
    ],
    dailyPriceILS: 450,
    weeklyPriceILS: 2800,
    monthlyPriceILS: 10000,
    depositILS: 2000,
    location: {
      city: 'Tel Aviv',
      neighborhood: 'Ramat Aviv',
      coordinates: { lat: 32.0853, lng: 34.7818 },
      address: 'Ramat Aviv, Tel Aviv'
    },
    owner: mockUsers[0],
    specs: {
      brand: 'Canon',
      model: 'EOS R5',
      year: 2020,
      condition: 'EXCELLENT',
      features: ['4K Video', '45MP Sensor', 'IBIS', 'Dual Card Slots', 'Weather Sealed']
    },
    availability: {
      status: 'AVAILABLE',
      nextAvailable: '2024-01-15',
      blackoutDates: ['2024-01-10', '2024-01-11', '2024-01-12']
    },
    rating: {
      average: 4.8,
      count: 12,
      breakdown: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [],
    trustFeatures: {
      verified: true,
      insured: true,
      instantBook: true,
      backgroundCheck: true,
      depositProtection: true
    },
    rules: [
      'No smoking near equipment',
      'Handle with care - professional gear',
      'Return in same condition',
      'Report any issues immediately'
    ],
    includedItems: [
      'Canon EOS R5 Body',
      '24-70mm f/2.8L Lens',
      '70-200mm f/2.8L Lens',
      '3x Batteries',
      'Battery Charger',
      'Memory Cards (2x 64GB)',
      'Camera Bag'
    ],
    pickupInstructions: 'Meet at my studio in Ramat Aviv. Parking available. I\'ll provide detailed usage instructions.',
    returnInstructions: 'Same location. Please clean equipment before return. I\'ll inspect for any damage.',
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-01-08T15:30:00Z',
    views: 1247,
    bookings: 23
  },
  {
    id: '2',
    title: 'Garden Tools Set - Professional Quality',
    description: 'Complete set of professional gardening tools including electric lawn mower, hedge trimmer, leaf blower, and hand tools. Perfect for maintaining large gardens and outdoor spaces.',
    category: 'gardening',
    subcategory: 'Garden Tools',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop'
    ],
    dailyPriceILS: 120,
    weeklyPriceILS: 700,
    monthlyPriceILS: 2500,
    depositILS: 500,
    location: {
      city: 'Tel Aviv',
      neighborhood: 'Neve Tzedek',
      coordinates: { lat: 32.0753, lng: 34.7718 },
      address: 'Neve Tzedek, Tel Aviv'
    },
    owner: mockUsers[1],
    specs: {
      brand: 'Bosch',
      model: 'Garden Pro Set',
      year: 2022,
      condition: 'GOOD',
      features: ['Electric Powered', 'Cordless Options', 'Professional Grade', 'Weather Resistant']
    },
    availability: {
      status: 'AVAILABLE',
      nextAvailable: '2024-01-12',
      blackoutDates: []
    },
    rating: {
      average: 4.6,
      count: 8,
      breakdown: { 5: 5, 4: 2, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [],
    trustFeatures: {
      verified: true,
      insured: false,
      instantBook: false,
      backgroundCheck: true,
      depositProtection: true
    },
    rules: [
      'Clean tools after use',
      'Store in dry place',
      'No use in rain',
      'Return all items'
    ],
    includedItems: [
      'Electric Lawn Mower',
      'Hedge Trimmer',
      'Leaf Blower',
      'Garden Fork',
      'Trowel Set',
      'Pruning Shears',
      'Garden Hose'
    ],
    pickupInstructions: 'Tools stored in my garage. I\'ll show you how to use each item safely.',
    returnInstructions: 'Please clean and dry all tools before return. Check for any damage.',
    createdAt: '2023-11-15T14:20:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    views: 892,
    bookings: 15
  },
  {
    id: '3',
    title: 'DJ Equipment Package - Professional Setup',
    description: 'Complete DJ setup perfect for parties, events, and clubs. Includes Pioneer DJ controller, speakers, mixer, and all necessary cables. Professional sound quality guaranteed.',
    category: 'audio-pa',
    subcategory: 'Mixers',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571266028243-e4733b0b0a0e?w=800&h=600&fit=crop'
    ],
    dailyPriceILS: 600,
    weeklyPriceILS: 3500,
    monthlyPriceILS: 12000,
    depositILS: 3000,
    location: {
      city: 'Tel Aviv',
      neighborhood: 'Florentin',
      coordinates: { lat: 32.0953, lng: 34.7918 },
      address: 'Florentin, Tel Aviv'
    },
    owner: mockUsers[2],
    specs: {
      brand: 'Pioneer',
      model: 'DJ Pro Kit',
      year: 2023,
      condition: 'EXCELLENT',
      features: ['4-Channel Mixer', 'Built-in Effects', 'USB Connectivity', 'Professional Speakers']
    },
    availability: {
      status: 'AVAILABLE',
      nextAvailable: '2024-01-10',
      blackoutDates: ['2024-01-20', '2024-01-21']
    },
    rating: {
      average: 4.9,
      count: 15,
      breakdown: { 5: 12, 4: 2, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [],
    trustFeatures: {
      verified: true,
      insured: true,
      instantBook: true,
      backgroundCheck: true,
      depositProtection: true
    },
    rules: [
      'Professional use only',
      'No food or drinks near equipment',
      'Handle cables carefully',
      'Test all connections before use'
    ],
    includedItems: [
      'Pioneer DJ Controller',
      '2x Professional Speakers',
      '4-Channel Mixer',
      'Microphone',
      'All Cables',
      'DJ Headphones',
      'Carrying Cases'
    ],
    pickupInstructions: 'Professional studio setup. I\'ll provide full training on equipment operation.',
    returnInstructions: 'Same location. Please test all equipment before return. Report any issues.',
    createdAt: '2023-10-20T16:45:00Z',
    updatedAt: '2024-01-07T11:20:00Z',
    views: 2156,
    bookings: 31
  }
]

// Mock Recent Activity
export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'BOOKING',
    title: 'Camera Kit Booked',
    description: 'David M. just booked a professional camera kit for a wedding shoot',
    location: 'Ramat Aviv, Tel Aviv',
    distance: 2.1,
    timestamp: '2024-01-08T14:30:00Z',
    user: {
      name: 'David M.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    listing: {
      id: '1',
      title: 'Professional Camera Kit',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop',
      price: 450
    }
  },
  {
    id: '2',
    type: 'LISTING',
    title: 'New Drone Listed',
    description: 'Sarah K. just listed a DJI Mavic 3 Pro for aerial photography',
    location: 'Neve Tzedek, Tel Aviv',
    distance: 1.8,
    timestamp: '2024-01-08T13:15:00Z',
    user: {
      name: 'Sarah K.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    listing: {
      id: '4',
      title: 'DJI Mavic 3 Pro',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      price: 300
    }
  },
  {
    id: '3',
    type: 'REVIEW',
    title: '5-Star Review Received',
    description: 'Mike R. received a glowing review for his DJ equipment rental',
    location: 'Florentin, Tel Aviv',
    distance: 3.2,
    timestamp: '2024-01-08T12:45:00Z',
    user: {
      name: 'Mike R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: '4',
    type: 'VERIFICATION',
    title: 'New Verified User',
    description: 'Tom L. just completed ID verification and joined the platform',
    location: 'Jaffa, Tel Aviv',
    distance: 4.1,
    timestamp: '2024-01-08T11:20:00Z',
    user: {
      name: 'Tom L.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    }
  }
]

// Trust badges and features
export const trustFeatures = [
  {
    id: 'verified',
    title: 'Verified Users',
    description: 'All users are ID verified',
    icon: 'Shield',
    color: 'text-success-600'
  },
  {
    id: 'insured',
    title: 'Fully Insured',
    description: 'Up to ₪50,000 coverage',
    icon: 'Umbrella',
    color: 'text-accent-600'
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Always here to help',
    icon: 'Headphones',
    color: 'text-primary-600'
  },
  {
    id: 'deposits',
    title: 'Secure Deposits',
    description: 'Protected by lendly.',
    icon: 'Lock',
    color: 'text-neutral-600'
  }
]

// Popular search terms
export const popularSearches = [
  'Camera equipment',
  'Garden tools',
  'DJ equipment',
  'Power tools',
  'Camping gear',
  'Event equipment',
  'Drone rental',
  'Audio systems'
]

// Trust statistics
export const trustStats = {
  verifiedUsers: 12500,
  totalBookings: 45000,
  averageRating: 4.8,
  responseTime: '< 2 hours',
  insuranceCoverage: 50000
}
