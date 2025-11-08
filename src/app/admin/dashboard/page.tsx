'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Video, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  Settings, 
  BarChart3,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { generateThumbnailUrl, getVideoPlatform, fetchVideoThumbnail } from '@/lib/video-utils'

interface Video {
  id: string
  title: string
  url: string
  thumbnail?: string
  createdAt: string
}

export default function AdminDashboard() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', url: '', thumbnail: '' })
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchVideos()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    }
  }

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos?limit=50')
      const data = await response.json()
      setVideos(data.videos)
    } catch (err) {
      setError('Failed to fetch videos')
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    setError('')
    setSuccess('')

    try {
      // Auto-generate thumbnail if not provided
      let thumbnail = newVideo.thumbnail
      if (!thumbnail) {
        thumbnail = await fetchVideoThumbnail(newVideo.url)
      }

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newVideo, thumbnail }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Video added successfully!')
        setNewVideo({ title: '', url: '', thumbnail: '' })
        setShowAddForm(false)
        fetchVideos()
      } else {
        setError(data.error || 'Failed to add video')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return
    }

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Video deleted successfully!')
        fetchVideos()
      } else {
        setError('Failed to delete video')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Back to Site
                </h1>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videos.length}</div>
              <p className="text-xs text-muted-foreground">
                Videos in database
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {videos.filter(v => new Date(v.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Added this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Support</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                YouTube, Vimeo, Dailymotion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Add Video Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Manage Videos</h2>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Video
            </Button>
          </div>

          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Video</CardTitle>
                <CardDescription>
                  Add a video from any supported platform (YouTube, Vimeo, Dailymotion)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Video Title *
                    </label>
                    <Input
                      id="title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      placeholder="Enter video title"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="url" className="text-sm font-medium text-gray-700">
                      Video URL *
                    </label>
                    <Input
                      id="url"
                      value={newVideo.url}
                      onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supports YouTube, Vimeo, and Dailymotion URLs
                    </p>
                  </div>

                  <div>
                    <label htmlFor="thumbnail" className="text-sm font-medium text-gray-700">
                      Thumbnail URL (optional)
                    </label>
                    <Input
                      id="thumbnail"
                      value={newVideo.thumbnail}
                      onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to auto-generate from video URL
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={adding}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {adding ? 'Adding...' : 'Add Video'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Videos List */}
        <Card>
          <CardHeader>
            <CardTitle>All Videos</CardTitle>
            <CardDescription>
              Manage all videos in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading videos...</p>
              </div>
            ) : videos.length > 0 ? (
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{video.title}</h3>
                      <p className="text-sm text-gray-600 truncate max-w-md">{video.url}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">
                          {new Date(video.createdAt).toLocaleDateString()}
                        </Badge>
                        <Badge variant="outline">
                          {getVideoPlatform(video.url)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/video/${video.id}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No videos yet</h3>
                <p className="text-gray-500 mb-4">Add your first video to get started!</p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}