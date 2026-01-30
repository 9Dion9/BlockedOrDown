import ClientStatusContent from './ClientStatusContent'; // We'll create this file next

export const dynamicParams = true; // Allows any slug (fallback to dynamic if not pre-generated)

export async function generateStaticParams() {
  const sites = [
    'youtube', 'tiktok', 'netflix', 'instagram', 'whatsapp', 'discord', 'reddit', 'chatgpt',
    'gmail', 'spotify', 'steam', 'twitch', 'twitter', 'facebook', 'amazon', 'ebay',
    'pornhub', 'xvideos', 'onlyfans', 'roblox', 'linkedin', 'pinterest', 'snapchat',
    'telegram', 'signal', 'zoom', 'teams', 'outlook', 'office365', 'dropbox', 'google-drive',
    'onedrive', 'mega', 'mediafire', 'soundcloud', 'deezer', 'apple-music', 'hulu', 'disneyplus',
    'primevideo', 'hbomax', 'paramountplus', 'peacocktv', 'crunchyroll', 'plex', 'vimeo', 'dailymotion',
    'bilibili', 'kick', 'rumble', 'trovo', 'soundcloud', 'bandcamp', 'patreon', 'twitch', 'kickstarter'
  ];

  return sites.map(site => ({ site }));
}

export default async function StatusPage({ params }) {
  const { site } = await params; // Await if Promise
  const siteName = site 
    ? site.charAt(0).toUpperCase() + site.slice(1).replace(/-/g, ' ')
    : 'Site';

  return <ClientStatusContent site={site} siteName={siteName} />;
}