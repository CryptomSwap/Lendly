import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create users
  const owner1 = await prisma.user.upsert({
    where: { email: 'owner1@lendly.co.il' },
    update: {},
    create: {
      email: 'owner1@lendly.co.il',
      name: 'David Cohen',
      phone: '+972501234567',
      role: 'OWNER',
      verificationStatus: 'VERIFIED'
    }
  })

  const owner2 = await prisma.user.upsert({
    where: { email: 'owner2@lendly.co.il' },
    update: {},
    create: {
      email: 'owner2@lendly.co.il',
      name: 'Sarah Levy',
      phone: '+972502345678',
      role: 'OWNER',
      verificationStatus: 'VERIFIED'
    }
  })

  const renter1 = await prisma.user.upsert({
    where: { email: 'renter1@lendly.co.il' },
    update: {},
    create: {
      email: 'renter1@lendly.co.il',
      name: 'Michael Ben-David',
      phone: '+972503456789',
      role: 'RENTER',
      verificationStatus: 'VERIFIED'
    }
  })

  // Create promo codes
  await prisma.promoCode.upsert({
    where: { code: 'LENDLYLOVE' },
    update: {},
    create: {
      code: 'LENDLYLOVE',
      discount: 2500, // ₪25 in agorot
      maxUses: 100,
      isActive: true
    }
  })

  // Israeli cities coordinates
  const cities = {
    'Tel Aviv': { lat: 32.0853, lng: 34.7818 },
    'Jerusalem': { lat: 31.7683, lng: 35.2137 },
    'Haifa': { lat: 32.7940, lng: 34.9896 },
    'Beersheba': { lat: 31.2518, lng: 34.7915 },
    'Netanya': { lat: 32.3215, lng: 34.8532 },
    'Ashdod': { lat: 31.8044, lng: 34.6553 }
  }

  // Create items across all categories and cities
  const items = [
    // Cameras & Photography - Tel Aviv
    {
      title: 'Canon EOS R5 Professional Camera',
      description: 'Professional mirrorless camera perfect for weddings, events, and commercial photography. Includes 24-70mm lens and extra batteries.',
      category: 'CAMERA',
      city: 'Tel Aviv',
      dailyPrice: 45000, // ₪450
      deposit: 200000, // ₪2000
      images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Sony A7S III Camera Body',
      description: 'High-resolution mirrorless camera with exceptional low-light performance and 4K video capabilities.',
      category: 'CAMERA',
      city: 'Jerusalem',
      dailyPrice: 38000, // ₪380
      deposit: 180000, // ₪1800
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Nikon D850 DSLR Camera',
      description: 'Professional DSLR camera with 45.7MP sensor, perfect for landscape and portrait photography.',
      category: 'CAMERA',
      city: 'Haifa',
      dailyPrice: 32000, // ₪320
      deposit: 150000, // ₪1500
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Fujifilm X-T4 Mirrorless Camera',
      description: 'Compact mirrorless camera with excellent image quality and video capabilities. Great for travel photography.',
      category: 'CAMERA',
      city: 'Netanya',
      dailyPrice: 28000, // ₪280
      deposit: 120000, // ₪1200
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner2.id
    },

    // Lenses
    {
      title: 'Canon 70-200mm f/2.8 Lens',
      description: 'Professional telephoto lens perfect for sports and portrait photography. Excellent image quality and fast autofocus.',
      category: 'LENS',
      city: 'Tel Aviv',
      dailyPrice: 20000, // ₪200
      deposit: 100000, // ₪1000
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Sigma 24-70mm f/2.8 Lens',
      description: 'Versatile zoom lens perfect for weddings, events, and general photography. Sharp and reliable.',
      category: 'LENS',
      city: 'Jerusalem',
      dailyPrice: 14000, // ₪140
      deposit: 80000, // ₪800
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Sony 85mm f/1.4 Portrait Lens',
      description: 'Premium portrait lens with beautiful bokeh and exceptional sharpness. Perfect for professional portraits.',
      category: 'LENS',
      city: 'Haifa',
      dailyPrice: 18000, // ₪180
      deposit: 90000, // ₪900
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner1.id
    },

    // Drones
    {
      title: 'DJI Mavic 3 Pro Drone',
      description: 'Latest DJI drone with 4K video and advanced obstacle avoidance. Perfect for aerial photography and videography.',
      category: 'DRONE',
      city: 'Tel Aviv',
      dailyPrice: 38000, // ₪380
      deposit: 150000, // ₪1500
      images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'DJI Mini 3 Drone',
      description: 'Compact drone perfect for aerial photography and videography. Lightweight and easy to fly.',
      category: 'DRONE',
      city: 'Beersheba',
      dailyPrice: 18000, // ₪180
      deposit: 80000, // ₪800
      images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'DJI Air 2S Drone',
      description: 'Professional drone with 1-inch sensor for high-quality aerial photography and videography.',
      category: 'DRONE',
      city: 'Ashdod',
      dailyPrice: 25000, // ₪250
      deposit: 100000, // ₪1000
      images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      ownerId: owner1.id
    },

    // Construction & Power Tools
    {
      title: 'Makita Circular Saw Set',
      description: 'Professional circular saw with multiple blades for construction work. Heavy-duty and reliable.',
      category: 'POWER_TOOL',
      city: 'Tel Aviv',
      dailyPrice: 12000, // ₪120
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'DeWalt Impact Driver',
      description: 'High-torque impact driver for heavy-duty fastening applications. Perfect for construction and DIY projects.',
      category: 'POWER_TOOL',
      city: 'Jerusalem',
      dailyPrice: 6000, // ₪60
      deposit: 20000, // ₪200
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Milwaukee Drill Set',
      description: 'Complete drill set with multiple bits and accessories. Perfect for home improvement projects.',
      category: 'POWER_TOOL',
      city: 'Haifa',
      dailyPrice: 4500, // ₪45
      deposit: 15000, // ₪150
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Extension Ladder 3.5m',
      description: 'Heavy-duty aluminum extension ladder. Perfect for painting, maintenance, and construction work.',
      category: 'LADDER',
      city: 'Beersheba',
      dailyPrice: 4000, // ₪40
      deposit: 15000, // ₪150
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    },

    // Gardening & Outdoor
    {
      title: 'Professional Hedge Trimmer',
      description: 'Heavy-duty hedge trimmer for professional landscaping. Perfect for maintaining garden hedges and bushes.',
      category: 'POWER_TOOL',
      city: 'Netanya',
      dailyPrice: 8000, // ₪80
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Ryobi Lawn Mower',
      description: 'Electric lawn mower perfect for small to medium yards. Easy to use and maintain.',
      category: 'POWER_TOOL',
      city: 'Ashdod',
      dailyPrice: 7000, // ₪70
      deposit: 25000, // ₪250
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Professional Pressure Washer',
      description: 'High-pressure washer perfect for cleaning driveways, patios, and outdoor surfaces.',
      category: 'PRESSURE_WASHER',
      city: 'Tel Aviv',
      dailyPrice: 9000, // ₪90
      deposit: 40000, // ₪400
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },

    // Event Equipment & Audio
    {
      title: 'Sound System Package',
      description: 'Complete sound system with speakers, mixer, and microphones for events. Professional quality audio equipment.',
      category: 'PARTY_GEAR',
      city: 'Jerusalem',
      dailyPrice: 25000, // ₪250
      deposit: 80000, // ₪800
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Yamaha PA Speaker System',
      description: 'Professional PA speakers with built-in mixer for live performances and events.',
      category: 'PARTY_GEAR',
      city: 'Haifa',
      dailyPrice: 18000, // ₪180
      deposit: 60000, // ₪600
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Wireless Microphone System',
      description: 'Professional wireless microphone system with receiver and transmitter. Perfect for presentations and events.',
      category: 'DJ_TOOL',
      city: 'Netanya',
      dailyPrice: 9000, // ₪90
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Professional Lighting Kit',
      description: 'Complete lighting kit with stands, softboxes, and LED panels. Perfect for photography and events.',
      category: 'PROJECTOR',
      city: 'Beersheba',
      dailyPrice: 16000, // ₪160
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Pioneer DDJ-400 DJ Controller',
      description: 'Professional DJ controller with Rekordbox integration. Perfect for parties and events.',
      category: 'DJ_TOOL',
      city: 'Ashdod',
      dailyPrice: 12000, // ₪120
      deposit: 40000, // ₪400
      images: ['https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'BenQ MW632ST Projector',
      description: 'Short-throw projector perfect for presentations, movie nights, and outdoor screenings.',
      category: 'PROJECTOR',
      city: 'Tel Aviv',
      dailyPrice: 8000, // ₪80
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'],
      ownerId: owner1.id
    },

    // Camping & Outdoor
    {
      title: 'Coleman 6-Person Tent',
      description: 'Spacious family tent perfect for camping trips and outdoor adventures. Waterproof and easy to set up.',
      category: 'CAMPING',
      city: 'Jerusalem',
      dailyPrice: 9000, // ₪90
      deposit: 40000, // ₪400
      images: ['https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Sleeping Bag Set (4 bags)',
      description: 'Set of 4 warm sleeping bags suitable for family camping trips. Lightweight and compact.',
      category: 'CAMPING',
      city: 'Haifa',
      dailyPrice: 5000, // ₪50
      deposit: 20000, // ₪200
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Portable Camping Stove',
      description: 'Compact camping stove perfect for outdoor cooking. Runs on gas canisters and includes cooking set.',
      category: 'CAMPING',
      city: 'Netanya',
      dailyPrice: 4000, // ₪40
      deposit: 15000, // ₪150
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'LED Headlamp Set',
      description: 'Bright LED headlamps perfect for camping, hiking, and outdoor activities. Waterproof and durable.',
      category: 'CAMPING',
      city: 'Beersheba',
      dailyPrice: 2500, // ₪25
      deposit: 8000, // ₪80
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Outdoor Cooler 50L',
      description: 'Large capacity cooler perfect for outdoor events, camping, and beach trips. Keeps items cold for hours.',
      category: 'APPLIANCE',
      city: 'Ashdod',
      dailyPrice: 3000, // ₪30
      deposit: 10000, // ₪100
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      ownerId: owner1.id
    },

    // Event Appliances
    {
      title: 'Commercial Popcorn Machine',
      description: 'Professional popcorn machine perfect for events, parties, and movie nights. Makes delicious popcorn!',
      category: 'APPLIANCE',
      city: 'Tel Aviv',
      dailyPrice: 15000, // ₪150
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Cotton Candy Machine',
      description: 'Fun cotton candy machine perfect for kids parties and events. Easy to use and clean.',
      category: 'APPLIANCE',
      city: 'Jerusalem',
      dailyPrice: 10000, // ₪100
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Portable Generator 2000W',
      description: 'Quiet portable generator perfect for outdoor events and camping. Reliable power source.',
      category: 'APPLIANCE',
      city: 'Haifa',
      dailyPrice: 10000, // ₪100
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    }
  ]

  // Create items
  for (const itemData of items) {
    const cityCoords = cities[itemData.city as keyof typeof cities]
    const item = await prisma.item.create({
      data: {
        ...itemData,
        latitude: cityCoords.lat + (Math.random() - 0.5) * 0.1,
        longitude: cityCoords.lng + (Math.random() - 0.5) * 0.1
      }
    })

    // Add some availability blocks (unavailable dates)
    const today = new Date()
    const unavailableDates = []
    
    // Add random unavailable dates over the next 60 days
    for (let i = 0; i < 5; i++) {
      const startDate = new Date(today)
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30))
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1)
      
      unavailableDates.push({ startDate, endDate })
    }

    for (const { startDate, endDate } of unavailableDates) {
      await prisma.availability.create({
        data: {
          itemId: item.id,
          startDate,
          endDate
        }
      })
    }
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
