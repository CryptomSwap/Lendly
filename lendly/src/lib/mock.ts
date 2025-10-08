// Mock data for Lendly marketplace

import { Item, Category, RecentActivity, Location, Owner } from './types'
import { TEL_AVIV_COORDS, NEARBY_AREAS } from './geo'

// Mock owners
const mockOwners: Owner[] = [
  {
    id: '1',
    name: 'David M.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.8,
    reviewCount: 12,
    responseTime: '< 1 hour',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.6,
    reviewCount: 8,
    responseTime: '< 2 hours',
    joinedDate: '2023-03-22'
  },
  {
    id: '3',
    name: 'Mike R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.9,
    reviewCount: 15,
    responseTime: '< 30 min',
    joinedDate: '2022-11-08'
  },
  {
    id: '4',
    name: 'Tom L.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    verified: false,
    rating: 4.7,
    reviewCount: 6,
    responseTime: '< 3 hours',
    joinedDate: '2023-05-10'
  },
  {
    id: '5',
    name: 'Rachel G.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.5,
    reviewCount: 9,
    responseTime: '< 1 hour',
    joinedDate: '2023-02-28'
  }
]

// Mock locations around Tel Aviv
const mockLocations: Location[] = [
  { city: 'Tel Aviv', country: 'Israel', coordinates: TEL_AVIV_COORDS },
  { city: 'Ramat Aviv', country: 'Israel', coordinates: { lat: 32.1153, lng: 34.8018 } },
  { city: 'Neve Tzedek', country: 'Israel', coordinates: { lat: 32.0653, lng: 34.7618 } },
  { city: 'Florentin', country: 'Israel', coordinates: { lat: 32.0553, lng: 34.7718 } },
  { city: 'Jaffa', country: 'Israel', coordinates: { lat: 32.0453, lng: 34.7518 } },
  { city: 'Ramat Gan', country: 'Israel', coordinates: { lat: 32.0853, lng: 34.8118 } }
]

// Mock items (18 realistic items around Tel Aviv)
export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Professional Camera Kit - Canon EOS R5 + Lenses',
    description: 'Complete professional photography setup including Canon EOS R5 body, 24-70mm f/2.8L lens, 70-200mm f/2.8L lens, and essential accessories. Perfect for weddings, events, and commercial photography.',
    category: 'cameras',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'
    ],
    pricePerDay: 450,
    deposit: 2000,
    location: mockLocations[0],
    owner: mockOwners[0],
    rating: 4.8,
    reviewCount: 12,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Canon',
      model: 'EOS R5',
      year: '2020',
      condition: 'Excellent',
      features: '4K Video, 45MP Sensor, IBIS, Dual Card Slots, Weather Sealed'
    },
    availability: [
      { startDate: '2024-01-15', endDate: '2024-01-20' },
      { startDate: '2024-01-25', endDate: '2024-01-30' }
    ],
    bookings: [
      { startDate: '2024-01-10', endDate: '2024-01-12' }
    ],
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-01-08T15:30:00Z'
  },
  {
    id: '2',
    title: 'Garden Tools Set - Professional Quality',
    description: 'Complete set of professional gardening tools including electric lawn mower, hedge trimmer, leaf blower, and hand tools. Perfect for maintaining large gardens and outdoor spaces.',
    category: 'gardening',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop'
    ],
    pricePerDay: 120,
    deposit: 500,
    location: mockLocations[1],
    owner: mockOwners[1],
    rating: 4.6,
    reviewCount: 8,
    available: true,
    verified: true,
    insured: false,
    instantBook: false,
    specs: {
      brand: 'Bosch',
      model: 'Garden Pro Set',
      year: '2022',
      condition: 'Good',
      features: 'Electric Powered, Cordless Options, Professional Grade, Weather Resistant'
    },
    availability: [
      { startDate: '2024-01-12', endDate: '2024-01-18' }
    ],
    bookings: [],
    createdAt: '2023-11-15T14:20:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  },
  {
    id: '3',
    title: 'DJ Equipment Package - Professional Setup',
    description: 'Complete DJ setup perfect for parties, events, and clubs. Includes Pioneer DJ controller, speakers, mixer, and all necessary cables. Professional sound quality guaranteed.',
    category: 'audio-pa',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571266028243-e4733b0b0a0e?w=800&h=600&fit=crop'
    ],
    pricePerDay: 600,
    deposit: 3000,
    location: mockLocations[2],
    owner: mockOwners[2],
    rating: 4.9,
    reviewCount: 15,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Pioneer',
      model: 'DJ Pro Kit',
      year: '2023',
      condition: 'Excellent',
      features: '4-Channel Mixer, Built-in Effects, USB Connectivity, Professional Speakers'
    },
    availability: [
      { startDate: '2024-01-10', endDate: '2024-01-15' }
    ],
    bookings: [
      { startDate: '2024-01-20', endDate: '2024-01-21' }
    ],
    createdAt: '2023-10-20T16:45:00Z',
    updatedAt: '2024-01-07T11:20:00Z'
  },
  {
    id: '4',
    title: 'DJI Mavic 3 Pro Drone',
    description: 'Professional drone for aerial photography and videography. Includes 4K camera, multiple batteries, carrying case, and all accessories. Perfect for real estate, events, and creative projects.',
    category: 'drones',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
    ],
    pricePerDay: 300,
    deposit: 1500,
    location: mockLocations[3],
    owner: mockOwners[3],
    rating: 4.7,
    reviewCount: 6,
    available: true,
    verified: false,
    insured: true,
    instantBook: false,
    specs: {
      brand: 'DJI',
      model: 'Mavic 3 Pro',
      year: '2023',
      condition: 'Excellent',
      features: '4K Video, 20MP Camera, 46min Flight Time, Obstacle Avoidance, ActiveTrack'
    },
    availability: [
      { startDate: '2024-01-14', endDate: '2024-01-19' }
    ],
    bookings: [],
    createdAt: '2023-09-10T12:30:00Z',
    updatedAt: '2024-01-06T14:45:00Z'
  },
  {
    id: '5',
    title: 'Construction Power Tools Set',
    description: 'Professional construction tools including cordless drill, circular saw, angle grinder, and safety equipment. All tools are well-maintained and ready for heavy-duty work.',
    category: 'construction',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop'
    ],
    pricePerDay: 180,
    deposit: 800,
    location: mockLocations[4],
    owner: mockOwners[4],
    rating: 4.5,
    reviewCount: 9,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'DeWalt',
      model: 'Construction Pro Set',
      year: '2022',
      condition: 'Good',
      features: 'Cordless, Professional Grade, Safety Equipment Included, Carrying Case'
    },
    availability: [
      { startDate: '2024-01-16', endDate: '2024-01-22' }
    ],
    bookings: [],
    createdAt: '2023-08-25T09:15:00Z',
    updatedAt: '2024-01-04T16:20:00Z'
  },
  {
    id: '6',
    title: 'Event Equipment Package',
    description: 'Complete event setup including tables, chairs, sound system, and lighting. Perfect for weddings, parties, and corporate events. Professional quality equipment.',
    category: 'event-equipment',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop'
    ],
    pricePerDay: 400,
    deposit: 1000,
    location: mockLocations[5],
    owner: mockOwners[0],
    rating: 4.8,
    reviewCount: 11,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Various',
      model: 'Event Pro Package',
      year: '2023',
      condition: 'Excellent',
      features: '50 Tables, 200 Chairs, Sound System, LED Lighting, Setup Service'
    },
    availability: [
      { startDate: '2024-01-18', endDate: '2024-01-25' }
    ],
    bookings: [],
    createdAt: '2023-07-12T11:45:00Z',
    updatedAt: '2024-01-03T13:30:00Z'
  },
  {
    id: '7',
    title: 'Camping Gear Complete Set',
    description: 'Full camping setup for 4 people including tent, sleeping bags, cooking equipment, and outdoor gear. Perfect for weekend trips and outdoor adventures.',
    category: 'camping',
    images: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    ],
    pricePerDay: 80,
    deposit: 300,
    location: mockLocations[0],
    owner: mockOwners[1],
    rating: 4.4,
    reviewCount: 7,
    available: true,
    verified: true,
    insured: false,
    instantBook: false,
    specs: {
      brand: 'Coleman',
      model: 'Camping Pro Set',
      year: '2023',
      condition: 'Good',
      features: '4-Person Tent, Sleeping Bags, Cooking Gear, Lanterns, Cooler'
    },
    availability: [
      { startDate: '2024-01-20', endDate: '2024-01-27' }
    ],
    bookings: [],
    createdAt: '2023-06-18T15:20:00Z',
    updatedAt: '2024-01-02T10:15:00Z'
  },
  {
    id: '8',
    title: 'Power Tools Workshop Set',
    description: 'Comprehensive power tools collection for DIY projects and professional work. Includes drill, saw, sander, and various accessories. All tools are in excellent condition.',
    category: 'power-tools',
    images: [
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'
    ],
    pricePerDay: 150,
    deposit: 600,
    location: mockLocations[1],
    owner: mockOwners[2],
    rating: 4.6,
    reviewCount: 10,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Makita',
      model: 'Workshop Pro Set',
      year: '2022',
      condition: 'Excellent',
      features: 'Cordless Tools, Professional Grade, Multiple Batteries, Carrying Case'
    },
    availability: [
      { startDate: '2024-01-22', endDate: '2024-01-28' }
    ],
    bookings: [],
    createdAt: '2023-05-22T14:30:00Z',
    updatedAt: '2024-01-01T12:45:00Z'
  },
  {
    id: '9',
    title: 'Sony A7IV Camera Kit',
    description: 'Professional mirrorless camera with 24-70mm lens, perfect for photography and videography. Includes extra batteries, memory cards, and camera bag.',
    category: 'cameras',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'
    ],
    pricePerDay: 350,
    deposit: 1500,
    location: mockLocations[2],
    owner: mockOwners[3],
    rating: 4.7,
    reviewCount: 8,
    available: true,
    verified: false,
    insured: true,
    instantBook: false,
    specs: {
      brand: 'Sony',
      model: 'A7IV',
      year: '2021',
      condition: 'Excellent',
      features: '33MP Sensor, 4K Video, IBIS, Dual Card Slots, Weather Sealed'
    },
    availability: [
      { startDate: '2024-01-24', endDate: '2024-01-30' }
    ],
    bookings: [],
    createdAt: '2023-04-15T16:45:00Z',
    updatedAt: '2023-12-30T09:20:00Z'
  },
  {
    id: '10',
    title: 'Professional Hedge Trimmer',
    description: 'Heavy-duty electric hedge trimmer perfect for large gardens and commercial use. Includes extension cord and safety equipment. Well-maintained and ready to use.',
    category: 'gardening',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop'
    ],
    pricePerDay: 60,
    deposit: 200,
    location: mockLocations[3],
    owner: mockOwners[4],
    rating: 4.3,
    reviewCount: 5,
    available: true,
    verified: true,
    insured: false,
    instantBook: false,
    specs: {
      brand: 'Black & Decker',
      model: 'Hedge Trimmer Pro',
      year: '2023',
      condition: 'Good',
      features: 'Electric Powered, 24" Blade, Safety Lock, Extension Cord Included'
    },
    availability: [
      { startDate: '2024-01-26', endDate: '2024-02-02' }
    ],
    bookings: [],
    createdAt: '2023-03-28T13:15:00Z',
    updatedAt: '2023-12-29T11:30:00Z'
  },
  {
    id: '11',
    title: 'Portable PA System',
    description: 'Professional portable sound system perfect for events, parties, and outdoor gatherings. Includes wireless microphones and all necessary cables.',
    category: 'audio-pa',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571266028243-e4733b0b0a0e?w=800&h=600&fit=crop'
    ],
    pricePerDay: 250,
    deposit: 800,
    location: mockLocations[4],
    owner: mockOwners[0],
    rating: 4.5,
    reviewCount: 6,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'JBL',
      model: 'PA System Pro',
      year: '2022',
      condition: 'Excellent',
      features: 'Wireless Mics, Bluetooth, Battery Powered, Carrying Case'
    },
    availability: [
      { startDate: '2024-01-28', endDate: '2024-02-04' }
    ],
    bookings: [],
    createdAt: '2023-02-14T10:20:00Z',
    updatedAt: '2023-12-28T15:45:00Z'
  },
  {
    id: '12',
    title: 'DJI Mini 3 Drone',
    description: 'Compact drone perfect for beginners and travel photography. Includes 4K camera, multiple batteries, and carrying case. Easy to fly and perfect for social media content.',
    category: 'drones',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
    ],
    pricePerDay: 180,
    deposit: 800,
    location: mockLocations[5],
    owner: mockOwners[1],
    rating: 4.4,
    reviewCount: 4,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'DJI',
      model: 'Mini 3',
      year: '2022',
      condition: 'Excellent',
      features: '4K Video, 12MP Camera, 38min Flight Time, Under 250g, QuickShots'
    },
    availability: [
      { startDate: '2024-01-30', endDate: '2024-02-06' }
    ],
    bookings: [],
    createdAt: '2023-01-20T14:30:00Z',
    updatedAt: '2023-12-27T12:15:00Z'
  },
  {
    id: '13',
    title: 'Concrete Mixer & Tools',
    description: 'Professional concrete mixer with all necessary tools for construction projects. Perfect for small to medium construction jobs and DIY projects.',
    category: 'construction',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop'
    ],
    pricePerDay: 200,
    deposit: 1000,
    location: mockLocations[0],
    owner: mockOwners[2],
    rating: 4.2,
    reviewCount: 3,
    available: true,
    verified: true,
    insured: true,
    instantBook: false,
    specs: {
      brand: 'Belle',
      model: 'Concrete Mixer Pro',
      year: '2021',
      condition: 'Good',
      features: '5 Cubic Feet, Gas Powered, Tilt Function, Tools Included'
    },
    availability: [
      { startDate: '2024-02-01', endDate: '2024-02-08' }
    ],
    bookings: [],
    createdAt: '2022-12-10T16:45:00Z',
    updatedAt: '2023-12-26T09:30:00Z'
  },
  {
    id: '14',
    title: 'Wedding Photography Package',
    description: 'Complete wedding photography setup including professional cameras, lenses, lighting equipment, and backup gear. Perfect for capturing your special day.',
    category: 'event-equipment',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop'
    ],
    pricePerDay: 500,
    deposit: 2000,
    location: mockLocations[1],
    owner: mockOwners[3],
    rating: 4.9,
    reviewCount: 14,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Canon',
      model: 'Wedding Pro Package',
      year: '2023',
      condition: 'Excellent',
      features: 'Dual Camera Setup, Professional Lenses, Lighting Kit, Backup Equipment'
    },
    availability: [
      { startDate: '2024-02-03', endDate: '2024-02-10' }
    ],
    bookings: [],
    createdAt: '2022-11-25T11:20:00Z',
    updatedAt: '2023-12-25T14:15:00Z'
  },
  {
    id: '15',
    title: 'Hiking & Backpacking Gear',
    description: 'Complete hiking setup for 2 people including backpacks, sleeping bags, tent, and cooking equipment. Perfect for weekend hikes and outdoor adventures.',
    category: 'camping',
    images: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    ],
    pricePerDay: 70,
    deposit: 250,
    location: mockLocations[2],
    owner: mockOwners[4],
    rating: 4.3,
    reviewCount: 5,
    available: true,
    verified: true,
    insured: false,
    instantBook: false,
    specs: {
      brand: 'Osprey',
      model: 'Hiking Pro Set',
      year: '2023',
      condition: 'Good',
      features: '2 Backpacks, Sleeping Bags, 2-Person Tent, Cooking Gear, Water Filter'
    },
    availability: [
      { startDate: '2024-02-05', endDate: '2024-02-12' }
    ],
    bookings: [],
    createdAt: '2022-10-18T13:45:00Z',
    updatedAt: '2023-12-24T10:20:00Z'
  },
  {
    id: '16',
    title: 'Angle Grinder & Accessories',
    description: 'Professional angle grinder with various cutting and grinding discs. Perfect for metalwork, tile cutting, and general construction tasks.',
    category: 'power-tools',
    images: [
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'
    ],
    pricePerDay: 40,
    deposit: 150,
    location: mockLocations[3],
    owner: mockOwners[0],
    rating: 4.1,
    reviewCount: 2,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Bosch',
      model: 'Angle Grinder Pro',
      year: '2023',
      condition: 'Excellent',
      features: '4.5" Disc, Variable Speed, Safety Guard, Multiple Discs Included'
    },
    availability: [
      { startDate: '2024-02-07', endDate: '2024-02-14' }
    ],
    bookings: [],
    createdAt: '2022-09-12T15:30:00Z',
    updatedAt: '2023-12-23T11:45:00Z'
  },
  {
    id: '17',
    title: 'Nikon D850 Camera Kit',
    description: 'Professional DSLR camera with 24-70mm lens, perfect for portrait and landscape photography. Includes extra batteries, memory cards, and camera bag.',
    category: 'cameras',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'
    ],
    pricePerDay: 280,
    deposit: 1200,
    location: mockLocations[4],
    owner: mockOwners[1],
    rating: 4.6,
    reviewCount: 7,
    available: true,
    verified: true,
    insured: true,
    instantBook: true,
    specs: {
      brand: 'Nikon',
      model: 'D850',
      year: '2017',
      condition: 'Excellent',
      features: '45.7MP Sensor, 4K Video, Dual Card Slots, Weather Sealed, Long Battery Life'
    },
    availability: [
      { startDate: '2024-02-09', endDate: '2024-02-16' }
    ],
    bookings: [],
    createdAt: '2022-08-28T12:15:00Z',
    updatedAt: '2023-12-22T16:30:00Z'
  },
  {
    id: '18',
    title: 'Lawn Mower & Garden Tools',
    description: 'Electric lawn mower with additional garden tools including rake, shovel, and pruning shears. Perfect for maintaining small to medium gardens.',
    category: 'gardening',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop'
    ],
    pricePerDay: 50,
    deposit: 180,
    location: mockLocations[5],
    owner: mockOwners[2],
    rating: 4.0,
    reviewCount: 3,
    available: true,
    verified: true,
    insured: false,
    instantBook: false,
    specs: {
      brand: 'Greenworks',
      model: 'Lawn Mower Set',
      year: '2022',
      condition: 'Good',
      features: 'Electric Powered, 20" Cut, Bag Included, Additional Tools'
    },
    availability: [
      { startDate: '2024-02-11', endDate: '2024-02-18' }
    ],
    bookings: [],
    createdAt: '2022-07-15T14:20:00Z',
    updatedAt: '2023-12-21T13:15:00Z'
  }
]

// Mock recent activity
export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Camera Kit Booked',
    description: 'David M. just booked a professional camera kit for a wedding shoot',
    location: 'Ramat Aviv, Tel Aviv',
    distance: 2.1,
    timestamp: '2024-01-08T14:30:00Z',
    user: {
      name: 'David M.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    item: {
      id: '1',
      title: 'Professional Camera Kit',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop',
      price: 450
    }
  },
  {
    id: '2',
    type: 'listing',
    title: 'New Drone Listed',
    description: 'Sarah K. just listed a DJI Mavic 3 Pro for aerial photography',
    location: 'Neve Tzedek, Tel Aviv',
    distance: 1.8,
    timestamp: '2024-01-08T13:15:00Z',
    user: {
      name: 'Sarah K.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    item: {
      id: '4',
      title: 'DJI Mavic 3 Pro',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      price: 300
    }
  },
  {
    id: '3',
    type: 'review',
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
    type: 'booking',
    title: 'Garden Tools Rented',
    description: 'Tom L. rented garden tools for weekend landscaping project',
    location: 'Jaffa, Tel Aviv',
    distance: 4.1,
    timestamp: '2024-01-08T11:20:00Z',
    user: {
      name: 'Tom L.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    item: {
      id: '2',
      title: 'Garden Tools Set',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
      price: 120
    }
  }
]

/**
 * Get nearby items based on filters
 * @param filters Search filters
 * @returns Filtered items array
 */
export function getNearbyItems(filters: {
  city?: string
  start?: string
  end?: string
  category?: Category
  radiusKm?: number
}): Item[] {
  let filteredItems = [...mockItems]

  // Filter by category
  if (filters.category) {
    filteredItems = filteredItems.filter(item => item.category === filters.category)
  }

  // Filter by city (simple string matching)
  if (filters.city) {
    filteredItems = filteredItems.filter(item => 
      item.location.city.toLowerCase().includes(filters.city!.toLowerCase())
    )
  }

  // Filter by availability (simple date range check)
  if (filters.start && filters.end) {
    filteredItems = filteredItems.filter(item => {
      // Check if item is available during the requested period
      return item.availability.some(period => {
        const periodStart = new Date(period.startDate)
        const periodEnd = new Date(period.endDate)
        const requestStart = new Date(filters.start!)
        const requestEnd = new Date(filters.end!)
        
        return requestStart >= periodStart && requestEnd <= periodEnd
      })
    })
  }

  return filteredItems
}

/**
 * Get recent activity for a city
 * @param city City name
 * @returns Recent activity array
 */
export function getRecentActivity(city: string): RecentActivity[] {
  return mockRecentActivity.filter(activity => 
    activity.location.toLowerCase().includes(city.toLowerCase())
  )
}

/**
 * Get item by ID
 * @param id Item ID
 * @returns Item or null if not found
 */
export function getItemById(id: string): Item | null {
  return mockItems.find(item => item.id === id) || null
}

/**
 * Get items by owner ID
 * @param ownerId Owner ID
 * @returns Items array
 */
export function getItemsByOwner(ownerId: string): Item[] {
  return mockItems.filter(item => item.owner.id === ownerId)
}

/**
 * Get featured items (high-rated, available items)
 * @param limit Number of items to return
 * @returns Featured items array
 */
export function getFeaturedItems(limit: number = 6): Item[] {
  return mockItems
    .filter(item => item.available && item.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// Trust statistics for homepage
export const trustStats = {
  verifiedUsers: 12500,
  totalBookings: 45000,
  averageRating: 4.9,
  responseTime: '< 2 hours',
  insuranceCoverage: 50000
}