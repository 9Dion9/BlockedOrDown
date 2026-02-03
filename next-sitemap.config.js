/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blocked-or-down.vercel.app', // ← required! use your real live URL
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  // optional: add dynamic paths later
  additionalPaths: async (config) => {
    const popularSites = ['youtube-com', 'netflix-com', 'google-com', 'grok-com', 'facebook-com',
    'instagram-com', 'twitter-com', 'amazon-com', 'reddit-com', 'wikipedia-org',
    'tiktok-com', 'spotify-com', 'twitch-tv', 'discord-com', 'linkedin-com'];
    return popularSites.map(site => ({
      loc: `${config.siteUrl}/status/${site}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};