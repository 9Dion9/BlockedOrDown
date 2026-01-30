import ClientOutages from './ClientOutages';

export const revalidate = 300; // 5 min cache — Vercel-safe, server only
export const dynamic = 'force-dynamic';

const sites = [
  { name: 'YouTube', url: 'https://youtube.com/favicon.ico' },
  { name: 'Netflix', url: 'https://netflix.com/favicon.ico' },
  { name: 'Discord', url: 'https://discord.com/favicon.ico' },
  { name: 'Spotify', url: 'https://spotify.com/favicon.ico' },
  { name: 'WhatsApp', url: 'https://whatsapp.com/favicon.ico' },
  { name: 'Gmail', url: 'https://mail.google.com/favicon.ico' },
  { name: 'TikTok', url: 'https://tiktok.com/favicon.ico' },
  { name: 'Instagram', url: 'https://instagram.com/favicon.ico' },
  { name: 'Steam', url: 'https://store.steampowered.com/favicon.ico' },
  { name: 'ChatGPT', url: 'https://chatgpt.com/favicon.ico' },
  { name: 'Twitter/X', url: 'https://twitter.com/favicon.ico' },
  { name: 'Facebook', url: 'https://facebook.com/favicon.ico' },
  { name: 'Reddit', url: 'https://reddit.com/favicon.ico' },
  { name: 'Twitch', url: 'https://twitch.tv/favicon.ico' },
  { name: 'Zoom', url: 'https://zoom.us/favicon.ico' },
  { name: 'Teams', url: 'https://teams.microsoft.com/favicon.ico' },
  { name: 'Outlook', url: 'https://outlook.live.com/favicon.ico' },
  { name: 'Amazon', url: 'https://amazon.com/favicon.ico' },
  { name: 'Google Drive', url: 'https://drive.google.com/favicon.ico' },
  { name: 'Dropbox', url: 'https://dropbox.com/favicon.ico' },
];

async function checkStatus(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
      headers: { 'User-Agent': 'BlockedOrDown-Bot/1.0' },
    });

    clearTimeout(timeoutId);

    return {
      status: res.ok ? 'online' : 'error',
      code: res.status,
      timestamp: Date.now(),
    };
  } catch (err) {
    return {
      status: 'down',
      error: err.name === 'AbortError' ? 'timeout' : 'unreachable',
      timestamp: Date.now(),
    };
  }
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