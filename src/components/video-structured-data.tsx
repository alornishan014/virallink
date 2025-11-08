'use client'

import Head from 'next/head'

interface VideoStructuredDataProps {
  videos: Array<{
    id: string
    title: string
    url: string
    thumbnail?: string
    createdAt: string
  }>
}

export function VideoStructuredData({ videos }: VideoStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://virallink.com'
  
  const structuredData = videos.map(video => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": `Watch ${video.title} on Viral Link - Your gateway to the best videos on the internet`,
    "thumbnailUrl": video.thumbnail || `${siteUrl}/logo.png`,
    "uploadDate": new Date(video.createdAt).toISOString(),
    "contentUrl": video.url,
    "embedUrl": video.url,
    "publisher": {
      "@type": "Organization",
      "name": "Viral Link",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  }))

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Head>
  )
}