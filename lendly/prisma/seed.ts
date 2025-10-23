import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const owner = await prisma.user.upsert({
    where: { email: 'owner@lendly.com' },
    update: {},
    create: {
      email: 'owner@lendly.com',
      hashedPassword,
      name: 'David M.',
      phone: '+972-50-123-4567',
      role: 'USER',
      stripeCustomerId: 'cus_owner123',
    },
  })

  const renter = await prisma.user.upsert({
    where: { email: 'renter@lendly.com' },
    update: {},
    create: {
      email: 'renter@lendly.com',
      hashedPassword,
      name: 'Sarah K.',
      phone: '+972-50-987-6543',
      role: 'USER',
      stripeCustomerId: 'cus_renter123',
    },
  })

  // Create verifications
  await prisma.verification.upsert({
    where: { userId: owner.id },
    update: {},
    create: {
      userId: owner.id,
      provider: 'persona',
      status: 'VERIFIED',
      riskScore: 85,
      documentId: 'inquiry_owner123',
    },
  })

  await prisma.verification.upsert({
    where: { userId: renter.id },
    update: {},
    create: {
      userId: renter.id,
      provider: 'persona',
      status: 'VERIFIED',
      riskScore: 92,
      documentId: 'inquiry_renter123',
    },
  })

  // Create items
  const items: Array<{
    title: string
    description: string
    category: 'CAMERA' | 'GARDENING' | 'AUDIO_PA' | 'POWER_TOOL' | 'DRONE'
    dailyPriceILS: number
    depositILS: number
    latitude: number
    longitude: number
    city: string
    images: string[]
    specs: Record<string, any>
    averageRating: number
    reviewCount: number
  }> = [
    {
      title: 'Professional Camera Kit',
      description: 'Complete professional photography kit including Canon EOS R5, 24-70mm f/2.8 lens, tripod, and accessories. Perfect for events, portraits, and commercial work.',
      category: 'CAMERA' as const,
      dailyPriceILS: 150,
      depositILS: 500,
      latitude: 32.0853,
      longitude: 34.7818,
      city: 'Tel Aviv',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3'
      ],
      specs: {
        brand: 'Canon',
        model: 'EOS R5',
        lens: '24-70mm f/2.8',
        condition: 'Excellent',
        year: '2022',
        sensor: 'Full Frame',
        resolution: '45MP'
      },
      averageRating: 4.8,
      reviewCount: 12
    },
    {
      title: 'Garden Tools Set',
      description: 'Complete set of professional gardening tools including hedge trimmer, leaf blower, and various hand tools. Perfect for landscaping projects.',
      category: 'GARDENING' as const,
      dailyPriceILS: 50,
      depositILS: 200,
      latitude: 32.0753,
      longitude: 34.7718,
      city: 'Tel Aviv',
      images: [
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5'
      ],
      specs: {
        brand: 'Bosch',
        model: 'Garden Pro Set',
        condition: 'Good',
        year: '2021',
        power: 'Electric',
        type: 'Professional'
      },
      averageRating: 4.6,
      reviewCount: 8
    },
    {
      title: 'DJ Equipment Package',
      description: 'Professional DJ setup with Pioneer CDJ-3000, DJM-900NXS2 mixer, and high-quality speakers. Perfect for events and parties.',
      category: 'AUDIO_PA' as const,
      dailyPriceILS: 200,
      depositILS: 800,
      latitude: 32.0953,
      longitude: 34.7918,
      city: 'Tel Aviv',
      images: [
        'https://picsum.photos/800/600?random=6',
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=8'
      ],
      specs: {
        brand: 'Pioneer',
        model: 'CDJ-3000 + DJM-900NXS2',
        condition: 'Excellent',
        year: '2023',
        power: '2000W',
        channels: '4'
      },
      averageRating: 4.9,
      reviewCount: 15
    },
    {
      title: 'Power Drill Set',
      description: 'Professional cordless drill set with multiple bits and accessories. Ideal for construction and DIY projects.',
      category: 'POWER_TOOL' as const,
      dailyPriceILS: 75,
      depositILS: 300,
      latitude: 32.0653,
      longitude: 34.7618,
      city: 'Tel Aviv',
      images: [
        'https://picsum.photos/800/600?random=9',
        'https://picsum.photos/800/600?random=10'
      ],
      specs: {
        brand: 'Makita',
        model: 'DHP481Z',
        condition: 'Good',
        year: '2022',
        power: '18V',
        voltage: '18V'
      },
      averageRating: 4.7,
      reviewCount: 6
    },
    {
      title: 'Professional Drone',
      description: 'DJI Mavic 3 Pro with 4K camera and multiple batteries. Perfect for aerial photography and videography.',
      category: 'DRONE' as const,
      dailyPriceILS: 180,
      depositILS: 750,
      latitude: 32.0853,
      longitude: 34.7818,
      city: 'Tel Aviv',
      images: [
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12'
      ],
      specs: {
        brand: 'DJI',
        model: 'Mavic 3 Pro',
        condition: 'Excellent',
        year: '2023',
        flightTime: '43 minutes',
        range: '15 km',
        camera: '4K Hasselblad'
      },
      averageRating: 4.9,
      reviewCount: 20
    }
  ]

  for (const itemData of items) {
    await prisma.item.create({
      data: {
        ...itemData,
        ownerId: owner.id,
      },
    })
  }

  // Create availability blocks
  const items_db = await prisma.item.findMany()
  
  for (const item of items_db) {
    // Create some availability blocks
    await prisma.availability.createMany({
      data: [
        {
          itemId: item.id,
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-20'),
        },
        {
          itemId: item.id,
          startDate: new Date('2024-01-25'),
          endDate: new Date('2024-01-30'),
        },
      ],
    })
  }

  // Create some bookings
  const cameraItem = items_db.find(item => item.category === 'CAMERA')
  const droneItem = items_db.find(item => item.category === 'DRONE')

  if (cameraItem) {
    await prisma.booking.create({
      data: {
        itemId: cameraItem.id,
        renterId: renter.id,
        ownerId: owner.id,
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-12'),
        status: 'COMPLETED',
        subtotalILS: 300,
        insuranceILS: 15,
        platformFeeILS: 54,
        depositILS: 500,
        stripePaymentIntentId: 'pi_completed123',
      },
    })
  }

  if (droneItem) {
    await prisma.booking.create({
      data: {
        itemId: droneItem.id,
        renterId: renter.id,
        ownerId: owner.id,
        startDate: new Date('2024-01-05'),
        endDate: new Date('2024-01-07'),
        status: 'CONFIRMED',
        subtotalILS: 360,
        insuranceILS: 18,
        platformFeeILS: 65,
        depositILS: 750,
        stripePaymentIntentId: 'pi_confirmed123',
      },
    })
  }

  // Create reviews
  const completedBookings = await prisma.booking.findMany({
    where: { status: 'COMPLETED' },
  })

  for (const booking of completedBookings) {
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        userId: booking.renterId, // The renter writes the review
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        comment: 'Great equipment, excellent condition, and very professional owner. Highly recommend!',
      },
    })
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
