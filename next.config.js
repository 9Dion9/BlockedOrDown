/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',          // Required for Cloudflare Workers/Pages compatibility
  images: {
    unoptimized: true,           // Cloudflare does not support optimized images yet
  },
  trailingSlash: false,
};

module.exports = nextConfig;