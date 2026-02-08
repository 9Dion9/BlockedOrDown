export const runtime = 'edge';
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Script from 'next/script';

 const popularSites = [
    // Social & Messaging
    'youtube-com', 'facebook-com', 'instagram-com', 'twitter-com', 'tiktok-com',
    'snapchat-com', 'discord-com', 'telegram-org', 'whatsapp-com', 'signal-org',
    'reddit-com', 'pinterest-com', 'linkedin-com', 'wechat-com', 'vk-com',

    // Streaming & Entertainment
    'netflix-com', 'disneyplus-com', 'hulu-com', 'primevideo-com', 'hbomax-com',
    'paramountplus-com', 'peacocktv-com', 'crunchyroll-com', 'plex-tv', 'vimeo-com',
    'dailymotion-com', 'bilibili-com', 'soundcloud-com', 'spotify-com', 'apple-music-com',

    // Gaming & Platforms
    'roblox-com', 'minecraft-net', 'fortnite-com', 'epicgames-com', 'steam-com',
    'playstation-com', 'xbox-com', 'nintendo-com', 'riotgames-com', 'blizzard-com',
    'twitch-tv', 'kick-com', 'rumble-com', 'trovo-live', 'valorant-com',

    // Search & AI Tools
    'google-com', 'grok-com', 'chatgpt-com', 'openai-com', 'claude-ai',
    'gemini-google', 'perplexity-ai', 'midjourney-com', 'deepseek-ai', 'anthropic-com',

    // Productivity & Cloud
    'notion-so', 'slack-com', 'teams-microsoft', 'zoom-us', 'google-drive',
    'dropbox-com', 'onedrive-com', 'mega-nz', 'canva-com', 'figma-com',
    'grammarly-com', 'deepl-com', 'zoho-com', 'trello-com', 'asana-com',
    'monday-com', 'airtable-com', 'clickup-com', 'evernote-com', 'box-com',

    // Finance & Crypto
    'paypal-com', 'stripe-com', 'binance-com', 'coinbase-com', 'kraken-com',
    'revolut-com', 'wise-com', 'venmo-com', 'cashapp-com', 'robinhood-com',

    // Shopping & E-commerce
    'amazon-com', 'ebay-com', 'aliexpress-com', 'etsy-com', 'walmart-com',
    'target-com', 'bestbuy-com', 'shein-com', 'temu-com', 'wish-com',

    // News & Knowledge
    'wikipedia-org', 'nytimes-com', 'cnn-com', 'bbc-co-uk', 'foxnews-com',
    'theguardian-com', 'washingtonpost-com', 'bloomberg-com', 'reuters-com', 'forbes-com',

    // Other High-Traffic
    'github-com', 'stackoverflow-com', 'npmjs-com', 'pypi-org', 'deviantart-com',
    'fandom-com', 'quora-com', 'imdb-com', 'booking-com', 'airbnb-com',
    'uber-com', 'lyft-com', 'doordash-com', 'grubhub-com', 'postmates-com',
    // → This is ~150 sites. Expand further below if you want 300–500
    // Example extension:
    'outlook-com', 'gmail-com', 'yahoo-com', 'protonmail-com', 'tutanota-com',
    'discord-gg', 'twitch-tv', 'kickstarter-com', 'patreon-com', 'onlyfans-com',
    // ... add more as needed
  ];
export default function SiteStatusPage() {
  const params = useParams();
  const { site } = params;

  const decodedSite = decodeURIComponent(site).replace(/-/g, '.');

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('Preparing check...');
  const [newUrl, setNewUrl] = useState('');
  const [lastChecked, setLastChecked] = useState(new Date());
  const [reportCount, setReportCount] = useState(0);
  const [useDeepCheck, setUseDeepCheck] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [scanCount, setScanCount] = useState(0);

  const pollProbeResult = async (cleanInput) => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const res = await fetch(`https://broken-queen-7e63.dionmain.workers.dev/probe-result?url=${encodeURIComponent(cleanInput)}`);
    const data = await res.json();
    if (data.result) {
      return data.result;
    }
    await new Promise(r => setTimeout(r, 5000)); // wait 5s
  }
  return { reachable: false, error: 'Probe timeout' };
};

  // Load reports
const handleReport = async () => {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    if (!ipRes.ok) throw new Error('Failed to get IP');
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    const res = await fetch('https://broken-queen-7e63.dionmain.workers.dev/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteSlug: site, ip })
    });

    const data = await res.json();
    if (data.success) {
      setReportCount(prev => prev + 1);
      alert('Report submitted successfully!');
    } else {
      alert(`Failed to submit report: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    console.error('Report failed:', err);
    alert(`Error submitting report: ${err.message}`);
  }
};

useEffect(() => {
  const loadReports = async () => {
    try {
      const res = await fetch(`https://broken-queen-7e63.dionmain.workers.dev/report-count?siteSlug=${site}`);
      if (!res.ok) throw new Error('Count fetch failed');
      const data = await res.json();
      setReportCount(data.count || 0);
    } catch (err) {
      console.error('Load reports failed:', err);
      setReportCount(0);
    }
  };
  loadReports();
}, [site]);
useEffect(() => {
  window.onTurnstileSuccess = function(token) {
    console.log('Turnstile token received:', token);
    setCaptchaToken(token);
  };
}, []);

  const checkSite = async (inputUrl = decodedSite) => {
    setLoading(true);
    setResult('');
    setProgress(0);
    setProgressText('Preparing check...');

    const startTime = Date.now();

    let cleanInput = inputUrl.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }

    // Progress steps
    const steps = useDeepCheck ? [
      { text: 'Resolving DNS...', pct: 20 },
      { text: 'Checking TLS handshake...', pct: 40 },
      { text: 'Probing global edge...', pct: 70 },
      { text: 'Validating content...', pct: 90 },
      { text: 'Finalizing result...', pct: 100 }
    ] : [
      { text: 'Quick server check...', pct: 50 },
      { text: 'Finalizing result...', pct: 100 }
    ];

    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        setProgress(steps[stepIndex].pct);
        setProgressText(steps[stepIndex].text);
        stepIndex++;
      }
    }, 400);

    try {
if (useDeepCheck) {
  setProgress(0);
  setProgressText('Starting deep check...');

  let reachable = false;
  let errorMsg = null;
  let region = 'unknown';
  let tlsValid = false;
  let contentValid = false;
  let country = 'unknown';
  let city = 'unknown';
  let asn = 'unknown';
  let asOrganization = 'unknown';
  let timezone = 'unknown';

  try {
    const workerUrl = `https://broken-queen-7e63.dionmain.workers.dev/?url=${encodeURIComponent(cleanInput)}`;
    const res = await fetch(workerUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'CF-Turnstile-Token': captchaToken || ''
      },
      signal: AbortSignal.timeout(30000)
    });

    if (res.status === 202) {
      finalMessage = 'Probe queued — result processing. Refresh in a minute.';
      reachable = true;
      confidence = 80;
    } else if (!res.ok) {
      throw new Error(`Worker returned ${res.status}`);
    } else {
      const data = await res.json();
      reachable = data.reachable;
      errorMsg = data.error || null;
      region = data.region || 'unknown';
      tlsValid = data.tlsValid || false;
      contentValid = data.contentValid || false;
      country = data.country || 'unknown';
      city = data.city || 'unknown';
      asn = data.asn || 'unknown';
      asOrganization = data.asOrganization || 'unknown';
      timezone = data.timezone || 'unknown';
    }

    setProgress(100);
    setProgressText('Complete');
  } catch (err) {
    console.error('Deep check failed:', err);
    reachable = false;
    errorMsg = err.message;
    setProgress(100);
    setProgressText('Error');
  }

  let finalMessage = '';
  let confidence = reachable ? 100 : 0;

  if (reachable) {
    finalMessage = `✅ Reachable from ${region} edge in ${city}, ${country} (${asOrganization}, ASN ${asn}).\n` +
                   `TLS secure: ${tlsValid ? 'Yes' : 'No'} | Content valid: ${contentValid ? 'Yes' : 'No'}\n` +
                   `Timezone: ${timezone}\nNo widespread outage or block detected.`;
  } else if (errorMsg && errorMsg.includes('Timeout')) {
    finalMessage = `⚠️ Mixed signal — site responded slowly or timed out from edge (${region} in ${city}, ${country}).\n` +
                   `TLS secure: ${tlsValid ? 'Yes' : 'No'} | Content valid: ${contentValid ? 'Yes' : 'No'}\n` +
                   `Possible regional block or performance issue.\n(${errorMsg})`;
    confidence = 50;
  } else {
    finalMessage = `❌ Unreachable from ${region} edge in ${city}, ${country} (${asOrganization}, ASN ${asn}).\n` +
                   `TLS secure: ${tlsValid ? 'Yes' : 'No'} | Content valid: ${contentValid ? 'Yes' : 'No'}\n` +
                   `Timezone: ${timezone}\nLikely global outage, regional restriction, or severe block.\n(${errorMsg || 'No response received'})`;
  }

  setResult(finalMessage + `\nConfidence: ${confidence}%`);
} else {
  // Quick mode (unchanged)
  const serverResponse = await fetch(`/api/check?url=${encodeURIComponent(cleanInput)}`);
  const serverData = await serverResponse.json();

  let finalMessage = '';
  let confidence = 'High';

  if (serverData.serverStatus === 'reachable') {
    finalMessage = '✅ The site is reachable — not down or blocked.';
  } else {
    finalMessage = '❌ The site is unreachable — likely global outage or down for everyone.';
    confidence = 'Medium';
  }

  setResult(`${finalMessage}\nConfidence: ${confidence}`);
}
      setLastChecked(new Date());
    } catch (err) {
      console.error('Check error:', err);
      setResult('❌ Error checking status. Try again.');
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(1500 - elapsed, 0);
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setProgressText('Complete');
        setLoading(false);
      }, delay);
    }
  };

  useEffect(() => {
    checkSite(decodedSite);
  }, [decodedSite]);
  useEffect(() => {
  // Load scanCount from localStorage on mount (client-only)
  const saved = localStorage.getItem('deepScanCount');
  if (saved) {
    setScanCount(parseInt(saved, 10));
  }
}, []);

useEffect(() => {
  // Save scanCount to localStorage whenever it changes
  localStorage.setItem('deepScanCount', scanCount.toString());
}, [scanCount]);

  const handleRefresh = () => checkSite(decodedSite);

  const handleNewCheck = () => {
    if (!newUrl.trim()) return;
    const siteSlug = newUrl.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
    if (siteSlug) window.location.href = `/status/${siteSlug}`;
  };

  const timeAgo = () => {
    const diff = Math.floor((Date.now() - lastChecked.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)} hr ago`;
  };

  return (
    <div style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)',
      margin: '0',
      fontFamily: 'Arial, sans-serif',
      background: 'var(--bg-secondary)',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: 'clamp(360px, 90vw, 720px)', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: '900',
          color: '#ffffff',
          marginBottom: 'clamp(12px, 3vw, 16px)',
          textShadow: '0 0 30px rgba(0,212,255,0.6)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Is {decodedSite} Down or Blocked?
        </h1>

        <p style={{
          fontSize: 'clamp(0.9rem, 3vw, 1rem)',
          color: '#c9d1d9',
          marginBottom: 'clamp(24px, 5vw, 32px)',
          textAlign: 'center'
        }}>
          Live status check from multiple regions
        </p>

        {/* Toggle + explanation */}
        <div style={{
          margin: 'clamp(20px, 5vw, 32px) auto',
          textAlign: 'center',
          maxWidth: 'clamp(340px, 80vw, 420px)'
        }}>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(12px, 3vw, 20px)'
          }}>
            <span style={{
              fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)',
              color: useDeepCheck ? '#94a3b8' : '#00d4ff',
              fontWeight: useDeepCheck ? 'normal' : '600',
              transition: 'all 0.3s ease'
            }}>
              Quick
            </span>

            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: 'clamp(48px, 10vw, 56px)',
              height: 'clamp(24px, 5vw, 28px)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={useDeepCheck}
                onChange={(e) => setUseDeepCheck(e.target.checked)}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0
                }}
              />
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: useDeepCheck ? '#00d4ff' : '#4a5568',
                borderRadius: 'clamp(12px, 3vw, 14px)',
                transition: 'background-color 0.3s ease',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: 'clamp(20px, 4vw, 24px)',
                  width: 'clamp(20px, 4vw, 24px)',
                  left: useDeepCheck ? 'calc(100% - 26px)' : '2px',
                  bottom: '2px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </span>
            </label>

            <span style={{
              fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)',
              color: useDeepCheck ? '#00d4ff' : '#94a3b8',
              fontWeight: useDeepCheck ? '600' : 'normal',
              transition: 'all 0.3s ease'
            }}>
              Deep
            </span>
          </div>

          <p style={{
            fontSize: 'clamp(0.85rem, 3vw, 0.9rem)',
            color: '#94a3b8',
            marginTop: '8px',
            maxWidth: 'clamp(320px, 85vw, 480px)',
            textAlign: 'center'
          }}>
            {useDeepCheck
              ? 'Deep Check: multi-region probes, DNS/TLS/content validation (5–10s, higher accuracy)'
              : 'Quick Check: fast single-server check (1–2s, instant results)'}
          </p>
        </div>
        {/* Turnstile CAPTCHA - only show when deep mode is on */}
{useDeepCheck && (
  <div style={{ margin: '20px auto', textAlign: 'center', maxWidth: '300px' }}>
    <div
      className="cf-turnstile"
      data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY}
      data-callback="onTurnstileSuccess"
      data-action="deep_check"
      data-theme="dark"
    ></div>
  </div>
)}

        {/* Loading with % bar */}
        {loading ? (
          <div style={{
            margin: 'clamp(32px, 6vw, 48px) 0',
            textAlign: 'center',
            maxWidth: 'clamp(320px, 85vw, 500px)',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(0,212,255,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
            <p style={{ fontSize: '1rem', color: '#c9d1d9', marginBottom: '8px' }}>
              {progressText} {progress}%
            </p>
          </div>
        ) : result && (
          <div style={{ 
            marginTop: 'clamp(32px, 6vw, 48px)',
            padding: '10px 14px',
            background: result.includes('✅') ? 'rgba(0,255,157,0.15)' : 'rgba(255,77,77,0.15)',
            borderRadius: '12px',
            border: `1px solid ${result.includes('✅') ? 'rgba(0,255,157,0.3)' : 'rgba(255,77,77,0.3)'}`,
            maxWidth: 'clamp(300px, 85vw, 580px)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'center',
            fontSize: 'clamp(0.9rem, 3.2vw, 1rem)',
            lineHeight: '1.4',
            boxShadow: '0 0 16px rgba(0,212,255,0.15)'
          }}>
            <span style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', flexShrink: 0 }}>
              {result.includes('✅') ? '✅' : '❌'}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>
                {result.split('\n')[0].replace(/[✅❌]\s*/, '')}
              </p>
              <p style={{
                fontStyle: 'italic',
                fontSize: 'clamp(0.8rem, 3vw, 0.85rem)',
                color: '#94a3b8',
                margin: 0
              }}>
                {result.split('\n')[1]}
              </p>
            </div>
          </div>
        )}

        {/* User reports + last checked + refresh */}
        {!loading && result && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
              {reportCount > 0 ? `${reportCount} users reported issues recently` : 'No reports yet'}
            </p>
            <button 
              onClick={handleReport}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                background: 'rgba(255,77,77,0.15)',
                color: '#ff4d4d',
                border: '1px solid rgba(255,77,77,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '16px',
                transition: 'all 0.2s'
              }}
              className="hover:bg-[rgba(255,77,77,0.25)] hover:scale-105"
            >
              Report as Down/Blocked
            </button>

            <button 
              onClick={() => checkSite(decodedSite)}
              disabled={loading}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                background: 'rgba(0,212,255,0.15)',
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="hover:bg-[rgba(0,212,255,0.25)] hover:scale-105"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Quick search box */}
        <div style={{
          marginTop: 'clamp(24px, 5vw, 36px)',
          padding: '10px 14px',
          background: 'rgba(13,17,23,0.7)',
          borderRadius: '12px',
          border: '1px solid rgba(0,212,255,0.25)',
          maxWidth: 'clamp(300px, 85vw, 480px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 0 16px rgba(0,212,255,0.15)'
        }}>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 3vw, 0.95rem)', 
            color: '#c9d1d9', 
            margin: '0 0 6px 0', 
            textAlign: 'center' 
          }}>
            Check another website
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input 
              type="text" 
              placeholder="e.g., google.com" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                  e.preventDefault();
                  const siteSlug = newUrl.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
                  if (siteSlug) window.location.href = `/status/${siteSlug}`;
                }
              }}
              style={{ 
                flex: 1,
                padding: '8px 14px', 
                fontSize: 'clamp(0.85rem, 3vw, 0.95rem)', 
                borderRadius: '10px 0 0 10px', 
                border: '1px solid rgba(0,212,255,0.3)', 
                background: 'rgba(13,17,23,0.7)', 
                color: '#ffffff', 
                outline: 'none' 
              }}
            />
            <button 
              onClick={() => {
                const siteSlug = newUrl.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
                if (siteSlug) window.location.href = `/status/${siteSlug}`;
              }}
              disabled={loading}
              style={{ 
                padding: '8px 18px', 
                fontSize: 'clamp(0.85rem, 3vw, 0.95rem)', 
                background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '0 10px 10px 0', 
                cursor: 'pointer' 
              }}
            >
              Check
            </button>
          </div>
        </div>

        <p style={{
          marginTop: 'clamp(40px, 8vw, 60px)',
          textAlign: 'center'
        }}>
          <Link href="/" style={{ 
            padding: 'clamp(12px, 3vw, 14px) clamp(28px, 6vw, 32px)', 
            fontSize: 'clamp(1rem, 3.5vw, 1.1em)', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '9999px', 
            cursor: 'pointer', 
            boxShadow: '0 0 40px rgba(0,212,255,0.5)', 
            transition: 'all 0.3s ease'
          }} className="hover:shadow-[0_0_70px_rgba(0,212,255,0.7)] hover:scale-105">
            Back to Homepage
          </Link>
        </p>

        {/* Explainability note */}
        <p style={{
          marginTop: 'clamp(32px, 6vw, 48px)',
          fontSize: '0.85rem',
          color: '#94a3b8',
          textAlign: 'center'
        }}>
          Powered by multi-region server checks. Results are indicative — test in browser to confirm.
        </p>
{/* Cloudflare Turnstile Script */}
<Script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
  strategy="afterInteractive"
  onLoad={() => console.log('Turnstile script loaded')}
/>

{/* Global Turnstile callback */}
<Script id="turnstile-callback" strategy="afterInteractive">
  {`
    window.onTurnstileSuccess = function(token) {
      console.log('Turnstile token received:', token);
      setCaptchaToken(token); // update state
    };
  `}
</Script>
      </div>
    </div>
  );
}