/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-vercel-domain.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000, // split if too large
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'], // don't index API routes
};

module.exports = nextConfig;