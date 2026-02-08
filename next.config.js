/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

const withCloudflare = require('@opennextjs/cloudflare');

module.exports = withCloudflare(nextConfig);