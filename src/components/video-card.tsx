'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Clock, Eye } from 'lucide-react'
import Image from 'next/image'

interface VideoCardProps {
  id: string
  title: string
  thumbnail?: string
  url: string
  createdAt: string
  onClick: (id: string) => void
}

export function VideoCard({ id, title, thumbnail, url, createdAt, onClick }: VideoCardProps) {
  const [imageError, setImageError] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Generate a gradient background based on video ID for colorful design
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-rose-500',
    'from-indigo-500 to-purple-500'
  ]
  
  const gradientIndex = parseInt(id.slice(-1)) % gradients.length
  const gradient = gradients[gradientIndex]

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg">
      <div className="relative">
        {thumbnail && !imageError ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className={`w-full h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            </div>
          </div>
        )}
        
        <Badge className="absolute top-2 right-2 bg-black/70 text-white border-0">
          <Clock className="w-3 h-3 mr-1" />
          {formatDate(createdAt)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold line-clamp-2 text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {url}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Button 
          onClick={() => onClick(id)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300"
        >
          <Eye className="w-4 h-4 mr-2" />
          Watch Now
        </Button>
      </CardContent>
    </Card>
  )
}