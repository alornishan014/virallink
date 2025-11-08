'use client'

import { useEffect } from 'react'

interface VisitorTrackerProps {
  path?: string
}

export function VisitorTracker({ path }: VisitorTrackerProps) {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get client IP (this will be the server IP in production, but we'll get real IP via headers)
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: '', // Will be filled by server middleware
            userAgent: navigator.userAgent,
            path: path || window.location.pathname,
            referrer: document.referrer
          })
        })

        if (!response.ok) {
          console.error('Failed to track visitor')
        }
      } catch (error) {
        console.error('Error tracking visitor:', error)
      }
    }

    trackVisitor()
  }, [path])

  return null
}