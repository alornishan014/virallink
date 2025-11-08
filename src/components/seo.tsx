import { DefaultSeo, NextSeo } from 'next-seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://virallink.com'

const SEO_CONFIG = {
  title: 'Viral Link - Watch Amazing Videos from Around the Web',
  description: 'Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place. Viral Link brings you the most trending and entertaining content.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    site_name: 'Viral Link',
    title: 'Viral Link - Watch Amazing Videos from Around the Web',
    description: 'Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Viral Link - Video Aggregation Platform',
      },
    ],
  },
  twitter: {
    handle: '@virallink',
    site: '@virallink',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'videos, YouTube, Vimeo, Dailymotion, viral videos, entertainment, watch videos, video aggregation',
    },
    {
      name: 'author',
      content: 'Viral Link',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
  ],
}

export function GlobalSEO() {
  return <DefaultSeo {...SEO_CONFIG} />
}

export function PageSEO({ 
  title, 
  description, 
  canonical, 
  imageUrl,
  noIndex = false 
}: {
  title: string
  description?: string
  canonical?: string
  imageUrl?: string
  noIndex?: boolean
}) {
  return (
    <NextSeo
      title={title}
      description={description || SEO_CONFIG.description}
      canonical={canonical || SEO_CONFIG.canonical}
      openGraph={{
        ...SEO_CONFIG.openGraph,
        title,
        description: description || SEO_CONFIG.description,
        url: canonical || siteUrl,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ] : SEO_CONFIG.openGraph.images,
      }}
      twitter={{
        ...SEO_CONFIG.twitter,
        cardType: imageUrl ? 'summary_large_image' : 'summary',
      }}
      noindex={noIndex}
      nofollow={noIndex}
    />
  )
}