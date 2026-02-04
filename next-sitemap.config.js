/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blocked-or-down.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 10000, // allow up to 10k URLs per file
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    const popularSites = [
      'youtube-com', 'netflix-com', 'google-com', 'grok-com', 'facebook-com',
      'instagram-com', 'twitter-com', 'amazon-com', 'reddit-com', 'wikipedia-org',
      'tiktok-com', 'spotify-com', 'twitch-tv', 'discord-com', 'linkedin-com',
      'pinterest-com', 'snapchat-com', 'telegram-org', 'whatsapp-com', 'zoom-us',
      'microsoft-com', 'apple-com', 'ebay-com', 'aliexpress-com', 'aliexpress-us',
      'paypal-com', 'stripe-com', 'binance-com', 'coinbase-com', 'kraken-com',
      'hulu-com', 'disneyplus-com', 'primevideo-com', 'hbomax-com', 'paramountplus-com',
      'peacocktv-com', 'crunchyroll-com', 'plex-tv', 'vimeo-com', 'dailymotion-com',
      'bilibili-com', 'kick-com', 'rumble-com', 'trovo-live', 'soundcloud-com',
      'bandcamp-com', 'patreon-com', 'kickstarter-com', 'onlyfans-com', 'pornhub-com',
      'xvideos-com', 'roblox-com', 'minecraft-net', 'fortnite-com', 'epicgames-com',
      'steam-com', 'origin-com', 'battle-net', 'riotgames-com', 'playstation-com',
      'xbox-com', 'nintendo-com', 'ea-com', 'ubisoft-com', 'blizzard-com',
      'github-com', 'gitlab-com', 'bitbucket-org', 'npmjs-com', 'pypi-org',
      'stackoverflow-com', 'chatgpt-com', 'openai-com', 'midjourney-com', 'claude-ai',
      'gemini-google', 'perplexity-ai', 'deepl-com', 'grammarly-com', 'canva-com',
      'figma-com', 'notion-so', 'slack-com', 'teams-microsoft', 'zoom-us',
      'dropbox-com', 'google-drive', 'onedrive-com', 'mega-nz', 'mediafire-com'
      // Add more here — aim for 500–1000 total eventually
    ];
    return popularSites.map(site => ({
      loc: `${config.siteUrl}/status/${site}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};