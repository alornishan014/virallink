import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://virallink.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
      disallow: '/api/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}