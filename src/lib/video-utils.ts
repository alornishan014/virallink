export function extractVideoId(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  if (youtubeMatch) return youtubeMatch[1]
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return vimeoMatch[1]
  
  // Dailymotion
  const dailymotionMatch = url.match(/dailymotion\.com\/video\/([^_]+)/)
  if (dailymotionMatch) return dailymotionMatch[1]
  
  return null
}

export function generateThumbnailUrl(url: string): string | null {
  const videoId = extractVideoId(url)
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Try different thumbnail sizes in order of preference
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  } else if (url.includes('vimeo.com')) {
    // Vimeo doesn't provide direct thumbnail access without API
    // Return null so we'll use a gradient placeholder
    return null
  } else if (url.includes('dailymotion.com')) {
    return `https://www.dailymotion.com/thumbnail/video/${videoId}`
  }
  
  return null
}

export function getVideoPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'YouTube'
  } else if (url.includes('vimeo.com')) {
    return 'Vimeo'
  } else if (url.includes('dailymotion.com')) {
    return 'Dailymotion'
  } else {
    return 'External'
  }
}

export function getVideoEmbedUrl(url: string): string {
  // Handle YouTube URLs
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Handle Vimeo URLs
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Handle Dailymotion URLs
  const dailymotionMatch = url.match(/dailymotion\.com\/video\/([^_]+)/)
  if (dailymotionMatch) {
    return `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`
  }

  // For other URLs, return as is (will be handled by iframe)
  return url
}

export async function fetchVideoThumbnail(url: string): Promise<string | null> {
  try {
    // First try to generate thumbnail URL
    const thumbnailUrl = generateThumbnailUrl(url)
    
    if (thumbnailUrl) {
      // Verify the thumbnail exists by making a HEAD request
      const response = await fetch(thumbnailUrl, { method: 'HEAD' })
      if (response.ok) {
        return thumbnailUrl
      }
      
      // For YouTube, try fallback thumbnail sizes
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractVideoId(url)
        const fallbackUrls = [
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/0.jpg`
        ]
        
        for (const fallbackUrl of fallbackUrls) {
          try {
            const fallbackResponse = await fetch(fallbackUrl, { method: 'HEAD' })
            if (fallbackResponse.ok) {
              return fallbackUrl
            }
          } catch (error) {
            continue
          }
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching thumbnail:', error)
    return null
  }
}