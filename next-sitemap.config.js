/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://blocked-or-down.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    // Add popular sites (expand to 5k later)
    const popularSites = [
      'youtube-com', 'netflix-com', 'google-com', 'grok-com', 'facebook-com',
      'instagram-com', 'twitter-com', 'amazon-com', 'reddit-com', 'wikipedia-org'
    ];
    return popularSites.map(site => ({
      loc: `${config.siteUrl}/status/${site}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};