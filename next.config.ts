import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // নেটলিফাই এর জন্য স্ট্যাটিক এক্সপোর্ট সেটিংস
  output: 'export',
  trailingSlash: true,
  // নেটলিফাই এর জন্য ইমেজ ডোমেইন কনফিগারেশন
  images: {
    domains: [
      'media.istockphoto.com',
      'img.youtube.com',
      'www.dailymotion.com',
      'i.vimeocdn.com',
      'vimeo.com',
      'i.ytimg.com'
    ],
    unoptimized: true, // স্ট্যাটিক এক্সপোর্ট এর জন্য
  },
  // নেটলিফাই এর জন্য রিওয়াইট কনফিগারেশন
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  eslint: {
    // বিল্ড এর সময় ESLint এরর ইগনোর করুন
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
