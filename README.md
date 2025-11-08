# Viral Link - Video Aggregation Platform

A modern, colorful video aggregation website that allows users to discover and watch videos from YouTube, Vimeo, and Dailymotion all in one place.

## Features

- 🎥 **Video Aggregation**: Collect videos from multiple platforms (YouTube, Vimeo, Dailymotion)
- 🎨 **Modern Design**: Colorful, responsive interface with gradient backgrounds
- 📱 **Mobile Responsive**: Optimized for all devices with 1 column on mobile, 3 on desktop
- 🔍 **Search Functionality**: Find videos easily with built-in search
- 📄 **Pagination**: 9 videos per page with Next button navigation
- 🔐 **Admin Dashboard**: Secure admin area for video management
- 🖼️ **Auto Thumbnails**: Automatic thumbnail generation with fallbacks
- 📊 **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- 💰 **AdSense Ready**: Optimized for Google AdSense integration
- 🚀 **Performance**: Built with Next.js 15, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: SQLite with Prisma ORM
- **SEO**: next-seo
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alornishan014/virallink.git
cd virallink
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

- **URL**: `/admin`
- **Password**: `Ra095213@#`

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/
│   │       └── page.tsx      # Admin dashboard
│   ├── api/
│   │   ├── admin/
│   │   │   └── login/
│   │   │       └── route.ts  # Admin authentication
│   │   └── videos/
│   │       ├── route.ts      # Video CRUD operations
│   │       └── [id]/
│   │           └── route.ts   # Individual video operations
│   ├── video/
│   │   └── [id]/
│   │       └── page.tsx      # Video player page
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts          # Sitemap generation
│   └── robots.ts           # Robots.txt configuration
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── video-card.tsx       # Video card component
│   ├── adsense.tsx          # AdSense components
│   ├── seo.tsx             # SEO components
│   └── video-structured-data.tsx  # Structured data
├── lib/
│   ├── db.ts               # Database connection
│   ├── utils.ts            # Utility functions
│   ├── socket.ts           # Socket.io configuration
│   └── video-utils.ts      # Video utility functions
└── prisma/
    └── schema.prisma       # Database schema
```

## API Endpoints

### Videos
- `GET /api/videos` - Get videos with pagination and search
- `POST /api/videos` - Create new video
- `GET /api/videos/[id]` - Get individual video
- `DELETE /api/videos/[id]` - Delete video

### Admin
- `POST /api/admin/login` - Admin authentication

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables
4. Deploy

### Other Platforms

The project is compatible with any platform that supports Next.js applications.

## AdSense Integration

The project is optimized for Google AdSense:

1. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your AdSense publisher ID
2. Replace `XXXXXXXXXX` with your actual ad slot IDs
3. Update ad placements as needed

Ad placements include:
- Header ads
- In-content ads
- Footer ads
- Sidebar ads (on video pages)

## SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Structured Data**: Video structured data for better search visibility
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Proper crawling instructions
- **Social Media**: Open Graph and Twitter Card support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.