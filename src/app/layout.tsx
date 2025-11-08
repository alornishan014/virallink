import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GlobalSEO } from "@/components/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://virallink.com'),
  title: {
    default: 'Viral Link - Watch Amazing Videos from Around the Web',
    template: '%s | Viral Link'
  },
  description: 'Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place. Viral Link brings you the most trending and entertaining content.',
  keywords: ['videos', 'YouTube', 'Vimeo', 'Dailymotion', 'viral videos', 'entertainment', 'watch videos', 'video aggregation'],
  authors: [{ name: 'Viral Link' }],
  openGraph: {
    title: 'Viral Link - Watch Amazing Videos from Around the Web',
    description: 'Discover and watch the best videos from YouTube, Vimeo, and Dailymotion all in one place.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Viral Link',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@virallink',
    creator: '@virallink',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token_here', // Add your Google verification token
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <GlobalSEO />
        {/* AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
