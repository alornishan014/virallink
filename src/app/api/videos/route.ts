import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build the where clause for search
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { url: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {}

    // Get videos with pagination
    const videos = await db.video.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await db.video.count({
      where
    })

    const hasMore = skip + limit < total

    return NextResponse.json({
      videos,
      hasMore,
      total,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, url, thumbnail } = await request.json()

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      )
    }

    // Check if video with this URL already exists
    const existingVideo = await db.video.findUnique({
      where: { url }
    })

    if (existingVideo) {
      return NextResponse.json(
        { error: 'Video with this URL already exists' },
        { status: 400 }
      )
    }

    const video = await db.video.create({
      data: {
        title,
        url,
        thumbnail: thumbnail || null
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}