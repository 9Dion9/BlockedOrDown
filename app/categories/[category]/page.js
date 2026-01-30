import CategoryScan from './CategoryScan';

export const dynamic = 'force-dynamic';

const categoryData = {
  'social-media': {
    title: 'Social Media Sites',
    sites: [
      { name: 'YouTube', url: 'youtube.com' },
      { name: 'Instagram', url: 'instagram.com' },
      { name: 'TikTok', url: 'tiktok.com' },
      { name: 'Facebook', url: 'facebook.com' },
      { name: 'WhatsApp', url: 'whatsapp.com' },
      { name: 'Discord', url: 'discord.com' },
      { name: 'Reddit', url: 'reddit.com' },
      { name: 'Telegram', url: 'telegram.org' },
      { name: 'Snapchat', url: 'snapchat.com' },
      { name: 'LinkedIn', url: 'linkedin.com' },
      { name: 'Twitter/X', url: 'twitter.com' },
      { name: 'Pinterest', url: 'pinterest.com' },
      { name: 'Threads', url: 'threads.net' },
      { name: 'BeReal', url: 'bereal.com' },
      { name: 'Noplace', url: 'noplace.com' },
    ],
  },
  'ai': {
    title: 'AI Tools',
    sites: [
      { name: 'ChatGPT', url: 'chatgpt.com' },
      { name: 'Gemini', url: 'gemini.google.com' },
      { name: 'Claude', url: 'claude.ai' },
      { name: 'Midjourney', url: 'midjourney.com' },
      { name: 'Runway', url: 'runwayml.com' },
      { name: 'Canva AI', url: 'canva.com' },
      { name: 'Sora', url: 'sora.openai.com' },
      { name: 'Fathom', url: 'fathom.video' },
      { name: 'Saner.ai', url: 'saner.ai' },
      { name: 'Semrush One', url: 'semrush.com' },
      { name: 'Wix AI', url: 'wix.com' },
      { name: 'Hostinger AI', url: 'hostinger.com' },
      { name: 'Squarespace AI', url: 'squarespace.com' },
      { name: 'Pythagora', url: 'pythagora.dev' },
      { name: 'V0 by Vercel', url: 'v0.dev' },
    ],
  },
  'streaming': {
    title: 'Streaming Sites',
    sites: [
      { name: 'Netflix', url: 'netflix.com' },
      { name: 'Hulu', url: 'hulu.com' },
      { name: 'Disney Plus', url: 'disneyplus.com' },
      { name: 'HBO Max', url: 'hbomax.com' },
      { name: 'Amazon Prime Video', url: 'primevideo.com' },
      { name: 'YouTube TV', url: 'tv.youtube.com' },
      { name: 'Sling TV', url: 'sling.com' },
      { name: 'FuboTV', url: 'fubo.tv' },
      { name: 'Paramount Plus', url: 'paramountplus.com' },
      { name: 'Peacock', url: 'peacocktv.com' },
      { name: 'Roku Channel', url: 'therokuchannel.com' },
      { name: 'Tubi TV', url: 'tubitv.com' },
      { name: 'Pluto TV', url: 'pluto.tv' },
      { name: 'Apple TV+', url: 'tv.apple.com' },
      { name: 'Spotify (music/video)', url: 'spotify.com' },
    ],
  },
  'gaming': {
    title: 'Gaming Platforms',
    sites: [
      { name: 'Steam', url: 'steam.com' },
      { name: 'EA', url: 'ea.com' },
      { name: 'Roblox', url: 'roblox.com' },
      { name: 'Origin', url: 'origin.com' },
      { name: 'Epic Games', url: 'epicgames.com' },
      { name: 'Battle.net', url: 'battle.net' },
      { name: 'PlayStation', url: 'playstation.com' },
      { name: 'Xbox', url: 'xbox.com' },
      { name: 'Nintendo', url: 'nintendo.com' },
      { name: 'Ubisoft', url: 'ubisoft.com' },
      { name: 'GOG', url: 'gog.com' },
      { name: 'Itch.io', url: 'itch.io' },
      { name: 'Minecraft', url: 'minecraft.net' },
      { name: 'Fortnite', url: 'fortnite.com' },
      { name: 'League of Legends', url: 'leagueoflegends.com' },
    ],
  },
};

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.category.toLowerCase();

  const categoryInfo = categoryData[category] || { title: 'Category Not Found', sites: [] };

  return <CategoryScan categoryInfo={categoryInfo} category={category} />;
}