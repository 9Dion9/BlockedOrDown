/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Required for Cloudflare Pages/Workers
  },
  trailingSlash: false,
};

const withCloudflare = require('@opennextjs/cloudflare');

module.exports = withCloudflare(nextConfig);