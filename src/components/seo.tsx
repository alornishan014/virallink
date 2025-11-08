'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  imageUrl?: string
  noIndex?: boolean
  keywords?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://virallink.com'
const defaultTitle = 'Viral Link - Watch Amazing Videos from Around the Web'
const defaultDescription = 'Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place. Viral Link brings you the most trending and entertaining content.'

export function GlobalSEO() {
  return (
    <Head>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content="videos, YouTube, Vimeo, Dailymotion, viral videos, entertainment, watch videos, video aggregation" />
      <meta name="author" content="Viral Link" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Viral Link" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={`${siteUrl}/logo.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Viral Link - Video Aggregation Platform" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@virallink" />
      <meta name="twitter:creator" content="@virallink" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
      
      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export function PageSEO({ 
  title, 
  description, 
  canonical, 
  imageUrl,
  noIndex = false,
  keywords
}: SEOProps) {
  const pageTitle = title ? `${title} | Viral Link` : defaultTitle
  const pageDescription = description || defaultDescription
  const pageUrl = canonical || siteUrl
  const pageImage = imageUrl || `${siteUrl}/logo.png`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Viral Link" />
      {noIndex && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Viral Link" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:site" content="@virallink" />
      <meta name="twitter:creator" content="@virallink" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {imageUrl && <meta name="twitter:image" content={pageImage} />}
      
      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />
    </Head>
  )
}