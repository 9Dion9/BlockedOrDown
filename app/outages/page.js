import ClientOutages from './ClientOutages';

export const revalidate = 300; // 5 min cache
export const dynamic = 'force-dynamic';

const sites = [
  { name: 'YouTube', url: 'https://youtube.com' },
  { name: 'Netflix', url: 'https://netflix.com' },
  { name: 'Discord', url: 'https://discord.com' },
  { name: 'Spotify', url: 'https://spotify.com' },
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Steam', url: 'https://store.steampowered.com' },
  { name: 'ChatGPT', url: 'https://chatgpt.com' },
  { name: 'Twitter/X', url: 'https://twitter.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'Reddit', url: 'https://reddit.com' },
  { name: 'Twitch', url: 'https://twitch.tv' },
  { name: 'Zoom', url: 'https://zoom.us' },
  { name: 'Teams', url: 'https://teams.microsoft.com' },
  { name: 'Outlook', url: 'https://outlook.live.com' },
  { name: 'Amazon', url: 'https://amazon.com' },
  { name: 'Google Drive', url: 'https://drive.google.com' },
  { name: 'Dropbox', url: 'https://dropbox.com' },
];

async function checkStatus(siteUrl) {
  const urlsToTry = [
    `${siteUrl}/favicon.ico`,
    `${siteUrl}/`, // fallback to root if favicon blocked
  ];

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        method: 'GET', // Changed from HEAD to GET — most sites allow GET
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive'
        },
        redirect: 'follow'
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        return {
          status: 'online',
          code: res.status,
          timestamp: Date.now(),
        };
      }
    } catch (err) {
      // Continue to next URL if this one fails
      console.log(`Check failed for ${url}:`, err.message);
    }
  }

  // All attempts failed
  return {
    status: 'down',
    error: 'All checks failed (timeout or blocked)',
    timestamp: Date.now(),
  };
}

export default async function OutagesPage() {
  const statuses = await Promise.all(
    sites.map(async (site) => ({
      ...site,
      result: await checkStatus(site.url),
    }))
  );

  return <ClientOutages initialStatuses={statuses} />;
}