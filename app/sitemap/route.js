export const runtime = 'edge';
export async function GET() {
  const baseUrl = 'https://blocked-or-down.vercel.app';

  const sites = [
    'youtube', 'tiktok', 'netflix', 'instagram', 'whatsapp', 'discord', 'reddit', 'chatgpt',
    'gmail', 'spotify', 'steam', 'twitch', 'twitter', 'facebook', 'amazon', 'ebay',
    'pornhub', 'xvideos', 'onlyfans', 'roblox', 'linkedin', 'pinterest', 'snapchat',
    'telegram', 'signal', 'zoom', 'teams', 'outlook', 'office365', 'dropbox', 'google-drive',
    'onedrive', 'mega', 'mediafire', 'soundcloud', 'deezer', 'apple-music', 'hulu', 'disneyplus',
    'primevideo', 'hbomax', 'paramountplus', 'peacocktv', 'crunchyroll', 'plex', 'vimeo', 'dailymotion',
    'bilibili', 'kick', 'rumble', 'trovo', 'soundcloud', 'bandcamp', 'patreon', 'twitch', 'kickstarter'
  ];

  const staticPages = [
    { url: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
    { url: '/my-ip', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
    { url: '/impressum', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
    { url: '/datenschutz', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  ];

  const statusPages = sites.map(site => ({
    url: `/status/${site}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.8
  }));

  const allPages = [...staticPages, ...statusPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}