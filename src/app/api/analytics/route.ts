import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get daily stats for the specified period
    const dailyStats = await db.dailyStats.findMany({
      where: {
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Get total visitors
    const totalVisitors = await db.visitor.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Get unique visitors (by IP)
    const uniqueVisitors = await db.visitor.groupBy({
      by: ['ip'],
      where: {
        createdAt: {
          gte: startDate
        },
        ip: {
          not: null
        }
      },
      _count: {
        ip: true
      }
    })

    // Get popular pages
    const popularPages = await db.visitor.groupBy({
      by: ['path'],
      where: {
        createdAt: {
          gte: startDate
        },
        path: {
          not: null
        }
      },
      _count: {
        path: true
      },
      orderBy: {
        _count: {
          path: 'desc'
        }
      },
      take: 10
    })

    // Get today's stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayStats = await db.visitor.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    // Get real-time visitors (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    const realTimeVisitors = await db.visitor.count({
      where: {
        createdAt: {
          gte: thirtyMinutesAgo
        }
      }
    })

    return NextResponse.json({
      dailyStats,
      totalVisitors,
      uniqueVisitors: uniqueVisitors.length,
      popularPages,
      todayStats,
      realTimeVisitors,
      period: days
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { ip, userAgent, path, referrer } = await request.json()

    // Track visitor
    await db.visitor.create({
      data: {
        ip: ip || null,
        userAgent: userAgent || null,
        path: path || '/',
        referrer: referrer || null
      }
    })

    // Update daily stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dailyStat = await db.dailyStats.upsert({
      where: {
        date: today
      },
      update: {
        visits: {
          increment: 1
        },
        pageViews: {
          increment: 1
        }
      },
      create: {
        date: today,
        visits: 1,
        pageViews: 1,
        uniqueVisitors: 1
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}