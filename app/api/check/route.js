export const runtime = 'edge';
// app/api/check/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  // Clean and normalize URL
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    // Try multiple common resources to avoid false negatives
    const resources = [
      `${cleanUrl}/favicon.ico`,
      `${cleanUrl}/`,
      `${cleanUrl}/robots.txt`
    ];

    for (const testUrl of resources) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      try {
        const res = await fetch(testUrl, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // no-cors often returns status 0 or opaque response
        if (res.ok || res.status === 0 || res.type === 'opaque') {
          return NextResponse.json({ serverStatus: 'reachable' });
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log(`Timeout on ${testUrl}`);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }

    // All attempts failed
    return NextResponse.json({ serverStatus: 'unreachable' });
  } catch (error) {
    console.error('Check API error:', error);
    return NextResponse.json({ serverStatus: 'unreachable', error: error.message });
  }
}