# Viral Link - Video Aggregation Platform

A modern, colorful video aggregation website that allows users to discover and watch videos from YouTube, Vimeo, and Dailymotion all in one place. **Production Ready** with visitor analytics and admin dashboard.

## ✨ Features

- 🎥 **Video Aggregation**: Collect videos from multiple platforms (YouTube, Vimeo, Dailymotion)
- 📊 **Visitor Analytics**: Real-time visitor tracking with detailed statistics
- 🎨 **Modern Design**: Colorful, responsive interface with gradient backgrounds
- 📱 **Mobile Responsive**: Optimized for all devices with 1 column on mobile, 3 on desktop
- 📄 **Pagination**: 9 videos per page with Next button navigation
- 🔐 **Admin Dashboard**: Secure admin area with visitor statistics and video management
- 🖼️ **Auto Thumbnails**: Automatic thumbnail generation with fallbacks
- 📊 **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- 💰 **AdSense Ready**: Optimized for Google AdSense integration
- 🚀 **Performance**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 📈 Analytics Features

- **Real-time Visitor Tracking**: Track visitors in real-time (last 30 minutes)
- **Daily Statistics**: Daily visitor counts and unique visitors
- **Popular Pages**: Most visited pages on your site
- **Visitor Overview**: Total visitors, unique visitors, today's visits
- **30-Day Trends**: Daily visitor trends over the last 30 days
- **Admin Dashboard**: Comprehensive analytics dashboard at `/admin`

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: SQLite with Prisma ORM
- **SEO**: Native Next.js Head with structured data
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/alornishan014/virallink.git
cd virallink
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

4. **Configure your environment**:
```env
# Database
DATABASE_URL="file:./dev.db"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

# Admin Configuration
ADMIN_PASSWORD="Ra095213@#"

# AdSense Configuration
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
```

5. **Set up the database**:
```bash
npm run db:push
```

6. **Start the development server**:
```bash
npm run dev
```

7. **Open [http://localhost:3000](http://localhost:3000) in your browser**.

## 🔐 Admin Access

- **URL**: `/admin`
- **Password**: `Ra095213@#`

## 📊 Analytics Dashboard

The admin dashboard provides comprehensive visitor analytics:

- **Total Visitors**: Total visitors in the last 30 days
- **Unique Visitors**: Number of unique visitors
- **Today's Visits**: Visitors today
- **Real-time Visitors**: Active visitors in the last 30 minutes
- **Popular Pages**: Most visited pages with visit counts
- **Daily Trends**: Day-by-day visitor statistics

## 📱 Layout & Pagination

- **Desktop**: 3 videos per row
- **Mobile**: 1 video per row (responsive)
- **Pagination**: 9 videos per page with "Next Page →" button
- **Unlimited Support**: Add as many videos as you want

## 💰 AdSense Integration

The project is optimized for Google AdSense:

1. **Replace AdSense IDs**:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
   ```

2. **Update ad slots** in `src/components/adsense.tsx`:
   ```typescript
   adSlot="XXXXXXXXXX" // Your actual ad slot IDs
   ```

3. **Ad placements include**:
   - Header ads (top of page)
   - In-content ads (between videos)
   - Footer ads (bottom of page)
   - Sidebar ads (on video pages)

## 🚀 Production Deployment

### Vercel (Recommended)

1. **Push to GitHub** (already done):
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Set Environment Variables** in Vercel:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ADMIN_PASSWORD=Ra095213@#
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

4. **Deploy**: Vercel will automatically deploy your application

### Other Platforms

The project is compatible with any platform that supports Next.js applications:

- **Netlify**: Connect GitHub repository and configure build settings
- **Railway**: Deploy with one-click from GitHub
- **Digital Ocean**: Use App Platform for easy deployment
- **AWS**: Deploy with Amplify or ECS

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/
│   │       └── page.tsx      # Admin dashboard with analytics
│   ├── api/
│   │   ├── admin/
│   │   │   └── login/
│   │   │       └── route.ts  # Admin authentication
│   │   ├── analytics/
│   │   │   ├── route.ts      # Analytics data API
│   │   │   └── visitors/
│   │   │       └── route.ts  # Visitor data API
│   │   └── videos/
│   │       ├── route.ts      # Video CRUD operations
│   │       └── [id]/
│   │           └── route.ts   # Individual video operations
│   ├── video/
│   │   └── [id]/
│   │       └── page.tsx      # Video player page
│   ├── page.tsx             # Homepage with visitor tracking
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts          # Sitemap generation
│   └── robots.ts           # Robots.txt configuration
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── video-card.tsx       # Video card component
│   ├── adsense.tsx          # AdSense components
│   ├── seo.tsx             # SEO components
│   ├── video-structured-data.tsx  # Structured data
│   └── visitor-tracker.tsx  # Visitor tracking component
├── lib/
│   ├── db.ts               # Database connection
│   ├── utils.ts            # Utility functions
│   ├── socket.ts           # Socket.io configuration
│   └── video-utils.ts      # Video utility functions
└── prisma/
    └── schema.prisma       # Database schema with analytics
```

## 🔧 Environment Variables

### Required Variables
```env
DATABASE_URL="file:./dev.db" # or PostgreSQL for production
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
ADMIN_PASSWORD="Ra095213@#"
```

### Optional Variables
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
GOOGLE_SITE_VERIFICATION="verification_token_here"
```

## 📊 API Endpoints

### Videos
- `GET /api/videos` - Get videos with pagination and search
- `POST /api/videos` - Create new video
- `GET /api/videos/[id]` - Get individual video
- `DELETE /api/videos/[id]` - Delete video

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Track visitor
- `GET /api/analytics/visitors` - Get visitor logs

### Admin
- `POST /api/admin/login` - Admin authentication

## 🎯 SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Structured Data**: Video structured data for better search visibility
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Proper crawling instructions
- **Social Media**: Open Graph and Twitter Card support

## 🔍 Visitor Tracking

The system automatically tracks:
- **Page Views**: Every page visit is tracked
- **Unique Visitors**: Based on IP addresses
- **Referrers**: Where visitors came from
- **User Agents**: Browser and device information
- **Real-time Data**: Visitors active in the last 30 minutes

## 📈 Analytics Data

### Available Metrics
- **Total Visitors**: All-time visitor count
- **Daily Stats**: Day-by-day breakdown
- **Popular Pages**: Most visited content
- **Real-time**: Currently active visitors
- **Visitor Paths**: User navigation patterns

### Data Retention
- **Visitor Logs**: Stored indefinitely
- **Daily Stats**: Aggregated daily statistics
- **Real-time Data**: Last 30 minutes only

## 🛡️ Security

- **Admin Protection**: Password-protected admin area
- **API Security**: Proper error handling and validation
- **Database Security**: Prisma ORM with proper sanitization
- **Environment Variables**: Sensitive data not exposed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**