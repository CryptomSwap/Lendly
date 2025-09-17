import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city') || 'Tel Aviv'
    const categories = searchParams.get('categories')?.split(',') || []
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {
      isActive: true,
      city
    }

    if (categories.length > 0) {
      where.category = { in: categories }
    }

    const items = await prisma.item.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            verificationStatus: true
          }
        },
        availability: true,
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Filter by availability if dates provided
    let filteredItems = items
    if (startDate && endDate) {
      const requestedStart = new Date(startDate)
      const requestedEnd = new Date(endDate)
      
      filteredItems = items.filter((item: any) => {
        return !item.availability.some((block: any) => {
          const blockStart = new Date(block.startDate)
          const blockEnd = new Date(block.endDate)
          return requestedStart < blockEnd && requestedEnd > blockStart
        })
      })
    }

    return NextResponse.json(filteredItems)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, dailyPrice, deposit, images } = body

    // TODO: Add authentication check for OWNER role
    const userId = 'temp-user-id' // Replace with actual user ID from session

    const item = await prisma.item.create({
      data: {
        title,
        description,
        category,
        dailyPrice,
        deposit,
        images: images || [],
        ownerId: userId
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
