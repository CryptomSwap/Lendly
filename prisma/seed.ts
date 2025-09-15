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

  // Tel Aviv coordinates
  const telAvivLat = 32.0853
  const telAvivLng = 34.7818

  // Create items across all categories
  const items = [
    // Cameras & Drones
    {
      title: 'DJI Mini 4 Pro Drone',
      description: 'Professional drone with 4K camera, perfect for aerial photography and videography. Includes extra batteries and carrying case.',
      category: 'DRONE',
      dailyPrice: 15000, // ₪150
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Sony A7S III Camera',
      description: 'Professional mirrorless camera with 24-70mm lens. Perfect for photography and videography projects.',
      category: 'CAMERA',
      dailyPrice: 20000, // ₪200
      deposit: 80000, // ₪800
      images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Canon 24-70mm f/2.8 Lens',
      description: 'Professional zoom lens, perfect for portraits, events, and general photography.',
      category: 'LENS',
      dailyPrice: 8000, // ₪80
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner2.id
    },

    // DJ & Party
    {
      title: 'Pioneer DDJ-400 DJ Controller',
      description: 'Professional DJ controller with Rekordbox integration. Perfect for parties and events.',
      category: 'DJ_TOOL',
      dailyPrice: 12000, // ₪120
      deposit: 40000, // ₪400
      images: ['https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'JBL PartyBox 310 Speaker',
      description: 'Powerful portable speaker with LED lights and microphone. Perfect for outdoor parties and events.',
      category: 'PARTY_GEAR',
      dailyPrice: 10000, // ₪100
      deposit: 35000, // ₪350
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'BenQ MW632ST Projector',
      description: 'Short-throw projector perfect for presentations, movie nights, and outdoor screenings.',
      category: 'PROJECTOR',
      dailyPrice: 8000, // ₪80
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'],
      ownerId: owner2.id
    },

    // Event Appliances
    {
      title: 'Commercial Popcorn Machine',
      description: 'Professional popcorn machine perfect for events, parties, and movie nights. Makes delicious popcorn!',
      category: 'APPLIANCE',
      dailyPrice: 15000, // ₪150
      deposit: 50000, // ₪500
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Cotton Candy Machine',
      description: 'Fun cotton candy machine perfect for kids parties and events. Easy to use and clean.',
      category: 'APPLIANCE',
      dailyPrice: 10000, // ₪100
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Portable Heater',
      description: 'Electric portable heater perfect for outdoor events and chilly evenings.',
      category: 'APPLIANCE',
      dailyPrice: 5000, // ₪50
      deposit: 20000, // ₪200
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },

    // Handyman Tools
    {
      title: 'Makita Cordless Drill Set',
      description: 'Professional cordless drill with multiple bits and accessories. Perfect for home improvement projects.',
      category: 'POWER_TOOL',
      dailyPrice: 6000, // ₪60
      deposit: 25000, // ₪250
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Extension Ladder 3.5m',
      description: 'Heavy-duty aluminum extension ladder. Perfect for painting, maintenance, and construction work.',
      category: 'LADDER',
      dailyPrice: 4000, // ₪40
      deposit: 15000, // ₪150
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Kärcher Pressure Washer',
      description: 'High-pressure washer perfect for cleaning driveways, patios, and outdoor surfaces.',
      category: 'PRESSURE_WASHER',
      dailyPrice: 8000, // ₪80
      deposit: 30000, // ₪300
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
      ownerId: owner2.id
    },

    // Camping & Outdoors
    {
      title: '4-Person Camping Tent',
      description: 'Spacious 4-person tent perfect for camping trips. Waterproof and easy to set up.',
      category: 'CAMPING',
      dailyPrice: 6000, // ₪60
      deposit: 20000, // ₪200
      images: ['https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Portable Camping Stove',
      description: 'Compact camping stove perfect for outdoor cooking. Runs on gas canisters.',
      category: 'CAMPING',
      dailyPrice: 3000, // ₪30
      deposit: 10000, // ₪100
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'LED Headlamp Set',
      description: 'Bright LED headlamps perfect for camping, hiking, and outdoor activities.',
      category: 'CAMPING',
      dailyPrice: 2000, // ₪20
      deposit: 5000, // ₪50
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
      ownerId: owner1.id
    },

    // Additional items for variety
    {
      title: 'Professional Lighting Kit',
      description: '3-point lighting kit with stands and softboxes. Perfect for photography and video production.',
      category: 'CAMERA',
      dailyPrice: 10000, // ₪100
      deposit: 35000, // ₪350
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'],
      ownerId: owner2.id
    },
    {
      title: 'Wireless Microphone System',
      description: 'Professional wireless microphone system perfect for events, presentations, and recordings.',
      category: 'DJ_TOOL',
      dailyPrice: 5000, // ₪50
      deposit: 20000, // ₪200
      images: ['https://images.unsplash.com/photo-1571266028243-d220c8b4b4d8?w=800'],
      ownerId: owner1.id
    },
    {
      title: 'Outdoor Cooler 50L',
      description: 'Large capacity cooler perfect for outdoor events, camping, and beach trips.',
      category: 'APPLIANCE',
      dailyPrice: 3000, // ₪30
      deposit: 10000, // ₪100
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      ownerId: owner2.id
    }
  ]

  // Create items
  for (const itemData of items) {
    const item = await prisma.item.create({
      data: {
        ...itemData,
        latitude: telAvivLat + (Math.random() - 0.5) * 0.1,
        longitude: telAvivLng + (Math.random() - 0.5) * 0.1
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
