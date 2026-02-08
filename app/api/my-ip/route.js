export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get IPv4
    const ipv4Res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    if (!ipv4Res.ok) throw new Error('Failed to fetch IPv4');
    const ipv4Json = await ipv4Res.json();
    const ipv4 = ipv4Json.ip || 'Not detected';

    // Get IPv6 (optional, may fail on IPv4-only networks)
    let ipv6 = 'Not detected';
    try {
      const ipv6Res = await fetch('https://api64.ipify.org?format=json', { cache: 'no-store' });
      if (ipv6Res.ok) {
        const ipv6Json = await ipv6Res.json();
        ipv6 = ipv6Json.ip;
      }
    } catch {
      // IPv6 not available — that's fine
    }

    // Get geo data from IPv4 (fallback if IPv6 fails)
    const geoRes = await fetch(`https://ipapi.co/${ipv4}/json/`, { cache: 'no-store' });
    const geo = geoRes.ok ? await geoRes.json() : {};

    return NextResponse.json({
      ipv4,
      ipv6,
      isp: geo.org || geo.asn || 'Unknown',
      city: geo.city || 'Unknown',
      country: geo.country_name || geo.country || 'Unknown',
      region: geo.region || 'Unknown',
      timezone: geo.timezone || 'Unknown',
      connectionType: geo.network || 'Unknown',
      vpnDetected: !!geo.vpn || !!geo.proxy || false
    });
  } catch (error) {
    console.error('My IP API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch IP data' }, { status: 500 });
  }
}