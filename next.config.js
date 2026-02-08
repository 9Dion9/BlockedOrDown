/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages/Workers
  },
};

const withCloudflare = require('@opennextjs/cloudflare');

module.exports = withCloudflare(nextConfig);