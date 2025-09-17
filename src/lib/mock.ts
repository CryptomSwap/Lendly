import { Coordinates, calculateDistance } from './geo';
import { formatPricePerDay, formatDeposit } from './currency';

export interface MockItem {
  id: string;
  title: string;
  titleHe?: string; // Hebrew title for RTL testing
  category: string;
  pricePerDay: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  verifiedOwner: boolean;
  insured: boolean;
  image: string;
  coordinates: Coordinates;
  availability: {
    start: string; // ISO date
    end: string; // ISO date
  }[];
  description: string;
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

// Israeli cities with their coordinates and neighborhoods
const ISRAELI_CITIES = {
  'Tel Aviv': {
    center: { lat: 32.0853, lng: 34.7818 },
    neighborhoods: [
      { lat: 32.0853, lng: 34.7818, name: 'City Center' },
      { lat: 32.0667, lng: 34.7667, name: 'Jaffa' },
      { lat: 32.1000, lng: 34.8000, name: 'Ramat Aviv' },
      { lat: 32.0700, lng: 34.7800, name: 'Florentin' },
      { lat: 32.0900, lng: 34.7700, name: 'Neve Tzedek' },
      { lat: 32.0800, lng: 34.7900, name: 'Rothschild' },
      { lat: 32.0600, lng: 34.7500, name: 'Bat Yam' },
      { lat: 32.1100, lng: 34.8200, name: 'Ramat Hasharon' },
      { lat: 32.0750, lng: 34.7750, name: 'Kerem HaTeimanim' },
      { lat: 32.0950, lng: 34.7850, name: 'Old North' }
    ]
  },
  'Jerusalem': {
    center: { lat: 31.7683, lng: 35.2137 },
    neighborhoods: [
      { lat: 31.7683, lng: 35.2137, name: 'Old City' },
      { lat: 31.7800, lng: 35.2200, name: 'German Colony' },
      { lat: 31.7500, lng: 35.2000, name: 'Talpiot' },
      { lat: 31.7900, lng: 35.2300, name: 'Rehavia' },
      { lat: 31.7600, lng: 35.2100, name: 'Baka' },
      { lat: 31.7700, lng: 35.2400, name: 'French Hill' },
      { lat: 31.7400, lng: 35.1900, name: 'Gilo' },
      { lat: 31.8000, lng: 35.2500, name: 'Ramot' }
    ]
  },
  'Haifa': {
    center: { lat: 32.7940, lng: 34.9896 },
    neighborhoods: [
      { lat: 32.7940, lng: 34.9896, name: 'Downtown' },
      { lat: 32.8100, lng: 35.0000, name: 'Carmel Center' },
      { lat: 32.7800, lng: 34.9800, name: 'Lower City' },
      { lat: 32.8200, lng: 35.0100, name: 'Carmel' },
      { lat: 32.7600, lng: 34.9700, name: 'Port Area' },
      { lat: 32.8300, lng: 35.0200, name: 'Denya' },
      { lat: 32.7700, lng: 34.9900, name: 'Hadar' }
    ]
  },
  'Beersheba': {
    center: { lat: 31.2518, lng: 34.7915 },
    neighborhoods: [
      { lat: 31.2518, lng: 34.7915, name: 'City Center' },
      { lat: 31.2700, lng: 34.8000, name: 'Gimel' },
      { lat: 31.2300, lng: 34.7800, name: 'Alef' },
      { lat: 31.2600, lng: 34.8100, name: 'Dalet' },
      { lat: 31.2400, lng: 34.7900, name: 'Bet' },
      { lat: 31.2800, lng: 34.8200, name: 'Heh' }
    ]
  },
  'Netanya': {
    center: { lat: 32.3215, lng: 34.8532 },
    neighborhoods: [
      { lat: 32.3215, lng: 34.8532, name: 'City Center' },
      { lat: 32.3300, lng: 34.8600, name: 'Poleg' },
      { lat: 32.3100, lng: 34.8500, name: 'Ir Yamim' },
      { lat: 32.3400, lng: 34.8700, name: 'Ramat Poleg' },
      { lat: 32.3000, lng: 34.8400, name: 'Gan HaSharon' }
    ]
  },
  'Ashdod': {
    center: { lat: 31.8044, lng: 34.6553 },
    neighborhoods: [
      { lat: 31.8044, lng: 34.6553, name: 'City Center' },
      { lat: 31.8200, lng: 34.6600, name: 'Alef' },
      { lat: 31.7900, lng: 34.6500, name: 'Gimel' },
      { lat: 31.8100, lng: 34.6700, name: 'Dalet' },
      { lat: 31.8000, lng: 34.6400, name: 'Bet' }
    ]
  }
};

// Get random coordinates from any city
function getRandomCoordinates(): Coordinates {
  const cities = Object.keys(ISRAELI_CITIES);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const cityData = ISRAELI_CITIES[randomCity as keyof typeof ISRAELI_CITIES];
  const neighborhood = cityData.neighborhoods[Math.floor(Math.random() * cityData.neighborhoods.length)];
  
  // Add some random offset to simulate specific addresses
  return {
    lat: neighborhood.lat + (Math.random() - 0.5) * 0.01,
    lng: neighborhood.lng + (Math.random() - 0.5) * 0.01
  };
}

// Get coordinates for a specific city
function getCoordinatesForCity(cityName: string): Coordinates {
  const cityData = ISRAELI_CITIES[cityName as keyof typeof ISRAELI_CITIES];
  if (!cityData) return getRandomCoordinates();
  
  const neighborhood = cityData.neighborhoods[Math.floor(Math.random() * cityData.neighborhoods.length)];
  return {
    lat: neighborhood.lat + (Math.random() - 0.5) * 0.01,
    lng: neighborhood.lng + (Math.random() - 0.5) * 0.01
  };
}

// Generate availability windows (next 30 days)
function generateAvailability(): { start: string; end: string }[] {
  const windows = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + Math.floor(Math.random() * 20) + 1);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);
    
    windows.push({
      start: startDate.toISOString(),
      end: endDate.toISOString()
    });
  }
  
  return windows;
}


export const mockItems: MockItem[] = [
  // Cameras & Photography
  {
    id: '1',
    title: 'Canon EOS R5 Professional Camera',
    titleHe: 'מצלמה מקצועית Canon EOS R5',
    category: 'cameras',
    pricePerDay: 450,
    deposit: 2000,
    rating: 4.9,
    reviewCount: 127,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Professional mirrorless camera perfect for weddings, events, and commercial photography. Includes 24-70mm lens and extra batteries.',
    owner: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      verified: true
    }
  },
  {
    id: '2',
    title: 'Sony A7S III Camera Body',
    category: 'cameras',
    pricePerDay: 380,
    deposit: 1800,
    rating: 4.8,
    reviewCount: 92,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'High-resolution mirrorless camera with exceptional low-light performance and 4K video capabilities.',
    owner: {
      name: 'David Levy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '3',
    title: 'Nikon D850 DSLR Camera',
    category: 'cameras',
    pricePerDay: 320,
    deposit: 1500,
    rating: 4.7,
    reviewCount: 156,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'Professional DSLR camera with 45.7MP sensor, perfect for landscape and portrait photography.',
    owner: {
      name: 'Moshe Cohen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '4',
    title: 'Fujifilm X-T4 Mirrorless Camera',
    category: 'cameras',
    pricePerDay: 280,
    deposit: 1200,
    rating: 4.6,
    reviewCount: 78,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Netanya'),
    availability: generateAvailability(),
    description: 'Compact mirrorless camera with excellent image quality and video capabilities. Great for travel photography.',
    owner: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: false
    }
  },
  
  // Lenses
  {
    id: '5',
    title: 'Canon 70-200mm f/2.8 Lens',
    titleHe: 'עדשה Canon 70-200mm f/2.8',
    category: 'lenses',
    pricePerDay: 200,
    deposit: 1000,
    rating: 4.9,
    reviewCount: 78,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Professional telephoto lens perfect for sports and portrait photography. Excellent image quality and fast autofocus.',
    owner: {
      name: 'Eli Cohen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '6',
    title: 'Sigma 24-70mm f/2.8 Lens',
    category: 'lenses',
    pricePerDay: 140,
    deposit: 800,
    rating: 4.6,
    reviewCount: 53,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'Versatile zoom lens perfect for weddings, events, and general photography. Sharp and reliable.',
    owner: {
      name: 'Anat Ben-David',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      verified: true
    }
  },
  {
    id: '7',
    title: 'Sony 85mm f/1.4 Portrait Lens',
    category: 'lenses',
    pricePerDay: 180,
    deposit: 900,
    rating: 4.8,
    reviewCount: 42,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'Premium portrait lens with beautiful bokeh and exceptional sharpness. Perfect for professional portraits.',
    owner: {
      name: 'Yossi Levi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: false
    }
  },

  // Drones
  {
    id: '8',
    title: 'DJI Mavic 3 Pro Drone',
    category: 'drones',
    pricePerDay: 380,
    deposit: 1500,
    rating: 4.8,
    reviewCount: 89,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Latest DJI drone with 4K video and advanced obstacle avoidance. Perfect for aerial photography and videography.',
    owner: {
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '9',
    title: 'DJI Mini 3 Drone',
    category: 'drones',
    pricePerDay: 180,
    deposit: 800,
    rating: 4.5,
    reviewCount: 67,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
    coordinates: getCoordinatesForCity('Beersheba'),
    availability: generateAvailability(),
    description: 'Compact drone perfect for aerial photography and videography. Lightweight and easy to fly.',
    owner: {
      name: 'Nir Avraham',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: false
    }
  },
  {
    id: '10',
    title: 'DJI Air 2S Drone',
    category: 'drones',
    pricePerDay: 250,
    deposit: 1000,
    rating: 4.7,
    reviewCount: 45,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
    coordinates: getCoordinatesForCity('Ashdod'),
    availability: generateAvailability(),
    description: 'Professional drone with 1-inch sensor for high-quality aerial photography and videography.',
    owner: {
      name: 'Shira Gold',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: true
    }
  },

  // Construction & Power Tools
  {
    id: '11',
    title: 'Makita Circular Saw Set',
    titleHe: 'מסור עגול Makita',
    category: 'construction',
    pricePerDay: 120,
    deposit: 500,
    rating: 4.7,
    reviewCount: 45,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Professional circular saw with multiple blades for construction work. Heavy-duty and reliable.',
    owner: {
      name: 'Moshe Cohen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '12',
    title: 'DeWalt Impact Driver',
    category: 'powerTools',
    pricePerDay: 60,
    deposit: 200,
    rating: 4.8,
    reviewCount: 34,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'High-torque impact driver for heavy-duty fastening applications. Perfect for construction and DIY projects.',
    owner: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '13',
    title: 'Milwaukee Drill Set',
    category: 'powerTools',
    pricePerDay: 45,
    deposit: 150,
    rating: 4.7,
    reviewCount: 42,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'Complete drill set with multiple bits and accessories. Perfect for home improvement projects.',
    owner: {
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '14',
    title: 'Festool Track Saw System',
    category: 'construction',
    pricePerDay: 150,
    deposit: 700,
    rating: 4.9,
    reviewCount: 28,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Netanya'),
    availability: generateAvailability(),
    description: 'Precision track saw system for accurate cuts in woodworking. Professional grade equipment.',
    owner: {
      name: 'Ron Klein',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },

  // Gardening & Outdoor
  {
    id: '15',
    title: 'Professional Hedge Trimmer',
    category: 'gardening',
    pricePerDay: 80,
    deposit: 300,
    rating: 4.6,
    reviewCount: 23,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Heavy-duty hedge trimmer for professional landscaping. Perfect for maintaining garden hedges and bushes.',
    owner: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: false
    }
  },
  {
    id: '16',
    title: 'Ryobi Lawn Mower',
    category: 'gardening',
    pricePerDay: 70,
    deposit: 250,
    rating: 4.4,
    reviewCount: 19,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'Electric lawn mower perfect for small to medium yards. Easy to use and maintain.',
    owner: {
      name: 'Daniel Katz',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '17',
    title: 'Professional Pressure Washer',
    category: 'gardening',
    pricePerDay: 90,
    deposit: 400,
    rating: 4.5,
    reviewCount: 31,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'High-pressure washer perfect for cleaning driveways, patios, and outdoor surfaces.',
    owner: {
      name: 'Tamar Weiss',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      verified: true
    }
  },

  // Event Equipment & Audio
  {
    id: '18',
    title: 'Sound System Package',
    titleHe: 'חבילת מערכת סאונד',
    category: 'eventEquipment',
    pricePerDay: 250,
    deposit: 800,
    rating: 4.9,
    reviewCount: 67,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Complete sound system with speakers, mixer, and microphones for events. Professional quality audio equipment.',
    owner: {
      name: 'Yossi Levi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '19',
    title: 'Yamaha PA Speaker System',
    category: 'audioPA',
    pricePerDay: 180,
    deposit: 600,
    rating: 4.7,
    reviewCount: 41,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'Professional PA speakers with built-in mixer for live performances and events.',
    owner: {
      name: 'Noam Bar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '20',
    title: 'Wireless Microphone System',
    category: 'audioPA',
    pricePerDay: 90,
    deposit: 300,
    rating: 4.8,
    reviewCount: 24,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'Professional wireless microphone system with receiver and transmitter. Perfect for presentations and events.',
    owner: {
      name: 'Gadi Rosen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '21',
    title: 'Professional Lighting Kit',
    titleHe: 'ערכת תאורה מקצועית',
    category: 'eventEquipment',
    pricePerDay: 160,
    deposit: 500,
    rating: 4.6,
    reviewCount: 35,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
    coordinates: getCoordinatesForCity('Netanya'),
    availability: generateAvailability(),
    description: 'Complete lighting kit with stands, softboxes, and LED panels. Perfect for photography and events.',
    owner: {
      name: 'Shira Gold',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: false
    }
  },

  // Camping & Outdoor
  {
    id: '22',
    title: 'Coleman 6-Person Tent',
    category: 'camping',
    pricePerDay: 90,
    deposit: 400,
    rating: 4.5,
    reviewCount: 56,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Spacious family tent perfect for camping trips and outdoor adventures. Waterproof and easy to set up.',
    owner: {
      name: 'Tamar Weiss',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      verified: false
    }
  },
  {
    id: '23',
    title: 'Sleeping Bag Set (4 bags)',
    category: 'camping',
    pricePerDay: 50,
    deposit: 200,
    rating: 4.3,
    reviewCount: 31,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'Set of 4 warm sleeping bags suitable for family camping trips. Lightweight and compact.',
    owner: {
      name: 'Ruth Feldman',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: true
    }
  },
  {
    id: '24',
    title: 'Portable Camping Stove',
    category: 'camping',
    pricePerDay: 40,
    deposit: 150,
    rating: 4.4,
    reviewCount: 28,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    coordinates: getCoordinatesForCity('Haifa'),
    availability: generateAvailability(),
    description: 'Compact camping stove perfect for outdoor cooking. Runs on gas canisters and includes cooking set.',
    owner: {
      name: 'Eli Cohen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true
    }
  },
  {
    id: '25',
    title: 'LED Headlamp Set',
    category: 'camping',
    pricePerDay: 25,
    deposit: 80,
    rating: 4.2,
    reviewCount: 19,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    coordinates: getCoordinatesForCity('Beersheba'),
    availability: generateAvailability(),
    description: 'Bright LED headlamps perfect for camping, hiking, and outdoor activities. Waterproof and durable.',
    owner: {
      name: 'Nir Avraham',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: false
    }
  },

  // Additional Items for More Variety
  {
    id: '26',
    title: 'DJ Controller Pioneer DDJ-400',
    category: 'eventEquipment',
    pricePerDay: 120,
    deposit: 400,
    rating: 4.7,
    reviewCount: 38,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800',
    coordinates: getCoordinatesForCity('Ashdod'),
    availability: generateAvailability(),
    description: 'Professional DJ controller with Rekordbox integration. Perfect for parties and events.',
    owner: {
      name: 'Michael Ben-David',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '27',
    title: 'Projector BenQ MW632ST',
    category: 'eventEquipment',
    pricePerDay: 80,
    deposit: 300,
    rating: 4.5,
    reviewCount: 29,
    verifiedOwner: false,
    insured: true,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    coordinates: getCoordinatesForCity('Netanya'),
    availability: generateAvailability(),
    description: 'Short-throw projector perfect for presentations, movie nights, and outdoor screenings.',
    owner: {
      name: 'Lior Shalom',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: false
    }
  },
  {
    id: '28',
    title: 'Extension Ladder 3.5m',
    category: 'construction',
    pricePerDay: 40,
    deposit: 150,
    rating: 4.3,
    reviewCount: 22,
    verifiedOwner: true,
    insured: false,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Beersheba'),
    availability: generateAvailability(),
    description: 'Heavy-duty aluminum extension ladder. Perfect for painting, maintenance, and construction work.',
    owner: {
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  },
  {
    id: '29',
    title: 'Outdoor Cooler 50L',
    category: 'camping',
    pricePerDay: 30,
    deposit: 100,
    rating: 4.4,
    reviewCount: 17,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    coordinates: getCoordinatesForCity('Tel Aviv'),
    availability: generateAvailability(),
    description: 'Large capacity cooler perfect for outdoor events, camping, and beach trips. Keeps items cold for hours.',
    owner: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: true
    }
  },
  {
    id: '30',
    title: 'Portable Generator 2000W',
    category: 'eventEquipment',
    pricePerDay: 100,
    deposit: 500,
    rating: 4.6,
    reviewCount: 33,
    verifiedOwner: true,
    insured: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    coordinates: getCoordinatesForCity('Jerusalem'),
    availability: generateAvailability(),
    description: 'Quiet portable generator perfect for outdoor events and camping. Reliable power source.',
    owner: {
      name: 'Yossi Levi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      verified: true
    }
  }
];

// Get items by category
export function getItemsByCategory(category: string): MockItem[] {
  return mockItems.filter(item => item.category === category);
}

// Get nearby items based on user location
export function getNearbyItems(
  userLocation: Coordinates,
  limit: number = 6
): (MockItem & { distance: number })[] {
  return mockItems
    .map(item => ({
      ...item,
      distance: calculateDistance(userLocation, item.coordinates)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// Get items available for specific date range
export function getItemsForDateRange(
  startDate: string,
  endDate: string,
  category?: string
): MockItem[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockItems.filter(item => {
    if (category && item.category !== category) return false;
    
    return item.availability.some(window => {
      const windowStart = new Date(window.start);
      const windowEnd = new Date(window.end);
      
      return start >= windowStart && end <= windowEnd;
    });
  });
}

// Get featured items (high-rated, verified, insured)
export function getFeaturedItems(limit: number = 6): MockItem[] {
  return mockItems
    .filter(item => item.verifiedOwner && item.insured && item.rating >= 4.7)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Categories data
export const categories = [
  { id: 'cameras', name: 'Cameras', nameHe: 'מצלמות', icon: '📷' },
  { id: 'lenses', name: 'Lenses', nameHe: 'עדשות', icon: '🔍' },
  { id: 'drones', name: 'Drones', nameHe: 'רחפנים', icon: '🚁' },
  { id: 'construction', name: 'Construction', nameHe: 'בנייה', icon: '🔨' },
  { id: 'powerTools', name: 'Power Tools', nameHe: 'כלי עבודה', icon: '⚡' },
  { id: 'gardening', name: 'Gardening', nameHe: 'גינון', icon: '🌱' },
  { id: 'eventEquipment', name: 'Event Equipment', nameHe: 'ציוד אירועים', icon: '🎪' },
  { id: 'audioPA', name: 'Audio/PA', nameHe: 'אודיו/PA', icon: '🎵' },
  { id: 'camping', name: 'Camping', nameHe: 'קמפינג', icon: '⛺' }
];

// Get items by city
export function getItemsByCity(cityName: string): MockItem[] {
  return mockItems.filter(item => {
    // This is a simplified check - in a real app you'd have city data
    const cityData = ISRAELI_CITIES[cityName as keyof typeof ISRAELI_CITIES];
    if (!cityData) return false;
    
    // Check if item coordinates are within city bounds (simplified)
    const itemLat = item.coordinates.lat;
    const itemLng = item.coordinates.lng;
    const cityCenter = cityData.center;
    
    // Simple distance check (in a real app you'd use proper geospatial queries)
    const latDiff = Math.abs(itemLat - cityCenter.lat);
    const lngDiff = Math.abs(itemLng - cityCenter.lng);
    
    return latDiff < 0.1 && lngDiff < 0.1; // Rough city bounds
  });
}

// Get items by city and category
export function getItemsByCityAndCategory(cityName: string, category: string): MockItem[] {
  return getItemsByCity(cityName).filter(item => item.category === category);
}

// Convert MockItem to Item format for components
export function convertMockItemToItem(mockItem: MockItem): any {
  return {
    id: mockItem.id,
    title: mockItem.title,
    description: mockItem.description,
    category: mockItem.category,
    dailyPriceILS: mockItem.pricePerDay,
    depositILS: mockItem.deposit,
    rating: mockItem.rating,
    reviews: mockItem.reviewCount,
    latitude: mockItem.coordinates.lat,
    longitude: mockItem.coordinates.lng,
    city: 'Tel Aviv', // Default city - you could add city data to MockItem
    images: [mockItem.image], // Convert single image to array
    verifiedOwner: mockItem.verifiedOwner,
    insured: mockItem.insured,
    availability: mockItem.availability
  };
}

// Get items by category and convert to Item format
export function getItemsByCategoryAsItems(category: string): any[] {
  return getItemsByCategory(category).map(convertMockItemToItem);
}