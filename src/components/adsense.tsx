'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  adClient: string
  adSlot: string
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  style?: React.CSSProperties
  className?: string
}

export function AdSense({ 
  adClient, 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' },
  className = '' 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}

// Predefined ad components for different placements
export function HeaderAd() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-6">
      <AdSense
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="XXXXXXXXXX"
        adFormat="horizontal"
        style={{ display: 'block', height: '90px' }}
        className="w-full text-center"
      />
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="sticky top-24">
      <AdSense
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="XXXXXXXXXX"
        adFormat="vertical"
        style={{ display: 'block', height: '600px' }}
        className="w-full"
      />
    </div>
  )
}

export function InContentAd() {
  return (
    <div className="my-8 text-center">
      <AdSense
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="XXXXXXXXXX"
        adFormat="rectangle"
        style={{ display: 'block', height: '250px' }}
        className="mx-auto"
      />
    </div>
  )
}

export function FooterAd() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <AdSense
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="XXXXXXXXXX"
        adFormat="horizontal"
        style={{ display: 'block', height: '90px' }}
        className="w-full text-center"
      />
    </div>
  )
}