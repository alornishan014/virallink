import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'Ra095213@#'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password === ADMIN_PASSWORD) {
      // Create a simple token (in production, use JWT or proper session management)
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64')
      
      return NextResponse.json({
        message: 'Login successful',
        token
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}