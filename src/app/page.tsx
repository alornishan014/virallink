'use client'

import { useState, useEffect } from 'react'
import { VideoCard } from '@/components/video-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Settings, Video } from 'lucide-react'
import Link from 'next/link'
import { PageSEO } from '@/components/seo'
import { VideoStructuredData } from '@/components/video-structured-data'
import { HeaderAd, InContentAd, FooterAd } from '@/components/adsense'
import { VisitorTracker } from '@/components/visitor-tracker'

interface Video {
  id: string
  title: string
  url: string
  thumbnail?: string
  createdAt: string
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchVideos = async (pageNum: number, search = '') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/videos?page=${pageNum}&limit=9&search=${encodeURIComponent(search)}`)
      const data = await response.json()
      
      if (pageNum === 1) {
        setVideos(data.videos)
      } else {
        setVideos(prev => [...prev, ...data.videos])
      }
      
      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos(1, searchQuery)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchVideos(1, searchQuery)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchVideos(nextPage, searchQuery)
  }

  const handleVideoClick = (videoId: string) => {
    window.location.href = `/video/${videoId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <VisitorTracker path="/" />
      <PageSEO 
        title="Viral Link - Watch Amazing Videos from Around the Web"
        description="Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place. Viral Link brings you the most trending and entertaining content."
      />
      <VideoStructuredData videos={videos} />
      
      {/* Header */}
      <HeaderAd />
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Viral Link
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </form>
              
              <Link href="/admin">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Discover Amazing Videos
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Watch the best videos from around the web, all in one place. From YouTube to Vimeo, we bring you the most viral content.
        </p>
        
        <Link href="/admin">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg px-8 py-3">
            <Plus className="w-5 h-5 mr-2" />
            Add Your Video
          </Button>
        </Link>
      </section>

      {/* Videos Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Latest Videos</h3>
          <div className="text-sm text-gray-600">
            {videos.length} videos found
          </div>
        </div>

        {loading && videos.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gradient-to-r from-purple-200 to-pink-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <>
            <InContentAd />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  url={video.url}
                  createdAt={video.createdAt}
                  onClick={handleVideoClick}
                />
              ))}
            </div>

            {hasMore && (
              <>
                <InContentAd />
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3"
                  >
                    {loading ? 'Loading...' : 'Next Page →'}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
            <p className="text-gray-500 mb-6">Be the first to add a video to Viral Link!</p>
            <Link href="/admin">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <FooterAd />
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Viral Link
              </span>
            </div>
            <p className="text-gray-600">
              Your gateway to the best videos on the internet
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}