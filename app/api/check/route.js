import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  let cleanUrl;
  try {
    cleanUrl = new URL(url.startsWith('http') ? url : 'https://' + url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(cleanUrl.origin + '/favicon.ico', {
      signal: controller.signal,
      headers: { 'User-Agent': 'BlockedOrDown-Bot/1.0' },
    });

    clearTimeout(timeout);

    if (response.ok) {
      return NextResponse.json({ serverStatus: 'reachable', httpStatus: response.status });
    } else {
      return NextResponse.json({ serverStatus: 'error', httpStatus: response.status });
    }
  } catch (err) {
    return NextResponse.json({ serverStatus: 'unreachable', error: err.name });
  }
}