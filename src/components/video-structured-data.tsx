import { VideoJsonLd } from 'next-seo'

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
  const videoData = videos.map(video => ({
    name: video.title,
    description: `Watch ${video.title} on Viral Link - Your gateway to the best videos on the internet`,
    thumbnailUrl: video.thumbnail || `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    uploadDate: new Date(video.createdAt).toISOString(),
    contentUrl: video.url,
    embedUrl: video.url,
  }))

  return (
    <>
      {videoData.map((video, index) => (
        <VideoJsonLd
          key={`${video.name}-${index}`}
          {...video}
        />
      ))}
    </>
  )
}