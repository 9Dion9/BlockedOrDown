'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CategoryScan({ categoryInfo, category }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const knownPublicSites = [
    'chatgpt', 'gemini', 'claude', 'midjourney', 'runway', 'canva', 'sora', 'fathom', 'saner.ai', 'semrush', 'wix', 'hostinger', 'squarespace', 'pythagora', 'v0', 'grok'
  ];

  const scanSites = async () => {
    setScanning(true);
    setProgress(0);
    setResults([]);

    const batchSize = 4;
    const batches = [];
    for (let i = 0; i < categoryInfo.sites.length; i += batchSize) {
      batches.push(categoryInfo.sites.slice(i, i + batchSize));
    }

    let completed = 0;
    const newResults = [];

    for (const batch of batches) {
      const batchPromises = batch.map(site => new Promise(resolve => {
        const siteLower = site.name.toLowerCase();

        if (knownPublicSites.includes(siteLower)) {
          resolve({ site: site.name, status: 'accessible', detail: 'Accessible (public site)' });
          return;
        }

        const testResources = [
          `https://${site.url}/favicon.ico`,
          `https://${site.url}/robots.txt`,
          `https://${site.url}/`,
          `https://${site.url}/sitemap.xml`,
          `https://${site.url}/humans.txt`,
          `https://${site.url}/ads.txt`,
          `https://${site.url}/manifest.json`,
          `https://${site.url}/browserconfig.xml`,
          `https://${site.url}/apple-touch-icon.png`,
          `https://${site.url}/.well-known/security.txt`
        ];

        let success = false;

        const tryResource = (index) => {
          if (success || index >= testResources.length) {
            if (!success) {
              resolve({ site: site.name, status: 'blocked', detail: 'Failed all tests — likely blocked or site restriction' });
            }
            return;
          }

          const url = testResources[index] + '?' + Date.now();

          fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
            .then(() => {
              success = true;
              resolve({ site: site.name, status: 'accessible', detail: 'Reachable — not blocked' });
            })
            .catch(() => {
              tryResource(index + 1);
            });
        };

        tryResource(0);
      }));

      const batchResults = await Promise.allSettled(batchPromises);
      newResults.push(...batchResults.map(result => result.value));

      completed += batch.length;
      setProgress(Math.round((completed / categoryInfo.sites.length) * 100));
      setResults([...newResults]);
    }

    setScanning(false);
  };

  return (
    <div style={{
      padding: '100px 16px 80px',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: '3.2rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '28px',
        textShadow: '0 0 50px rgba(0,212,255,0.6)'
      }}>
        {categoryInfo.title} Scan
      </h1>

      <p style={{ fontSize: '1.3rem', color: '#c9d1d9', marginBottom: '40px' }}>
        Scan popular {categoryInfo.title.toLowerCase()} sites to see what's blocked.
      </p>

      <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '28px' }}>
        Note: Some sites may show false "Blocked" due to strict security.
      </p>

      {/* Scan Button */}
      <button 
        onClick={scanSites}
        disabled={scanning}
        style={{ 
          padding: '12px 32px', 
          fontSize: '1.1rem', 
          background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '9999px', 
          cursor: 'pointer', 
          boxShadow: '0 0 30px rgba(0,212,255,0.5)', 
          transition: 'all 0.3s ease'
        }}
        className="hover:shadow-[0_0_60px_rgba(0,212,255,0.7)] hover:scale-105"
      >
        {scanning ? 'Scanning...' : 'Start Scan Now'}
      </button>

      <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '24px 0 50px 0' }}>
        Estimate: 5–20 seconds • Client-side only
      </p>

      {scanning && (
        <div style={{ margin: '40px 0' }}>
          <div style={{ 
            background: 'rgba(13,17,23,0.6)', 
            borderRadius: '9999px', 
            height: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 0 15px rgba(0,212,255,0.2)', 
            maxWidth: '360px', 
            margin: '0 auto' 
          }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
              transition: 'width 0.5s' 
            }}></div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>
            {progress}%
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ margin: '50px 0' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#00d4ff', 
            marginBottom: '32px', 
            textAlign: 'center', 
            textShadow: '0 0 25px rgba(0,212,255,0.4)' 
          }}>
            Scan Results
          </h2>

          {/* Compact vertical list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {results.map((result, i) => (
              <div key={i} style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #0d1117, #161b22)', 
                borderRadius: '12px', 
                boxShadow: '0 4px 16px rgba(0,212,255,0.08)', 
                border: `1px solid ${result.status === 'accessible' ? 'rgba(0,212,255,0.25)' : 'rgba(239,68,68,0.25)'}`,
                transition: 'all 0.3s ease'
              }} className="hover:shadow-[0_0_35px_rgba(0,212,255,0.4)] hover:scale-[1.01]">
                {/* Left: name + detail */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                    {result.site}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    {result.detail}
                  </p>
                </div>

                {/* Right: status badge + link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '5px 14px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    borderRadius: '9999px',
                    background: result.status === 'accessible' ? 'rgba(0,255,157,0.12)' : 'rgba(255,77,77,0.12)',
                    color: result.status === 'accessible' ? '#00ff9d' : '#ff4d4d',
                    border: `1px solid ${result.status === 'accessible' ? 'rgba(0,255,157,0.25)' : 'rgba(255,77,77,0.25)'}`,
                  }}>
                    {result.status === 'accessible' ? 'Accessible' : 'Blocked'}
                  </span>

                  <Link 
                    href={`/status/${result.site.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ 
                      color: '#00d4ff', 
                      fontSize: '0.85rem', 
                      fontWeight: '600', 
                      textDecoration: 'none' 
                    }}
                  >
                    Full Check →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '40px', textAlign: 'center' }}>
            {results.filter(r => r.status === 'accessible').length} / {results.length} accessible
          </p>
        </div>
      )}

      <p style={{ marginTop: '80px', textAlign: 'center' }}>
        <Link 
          href="/categories" 
          style={{ 
            padding: '10px 32px', 
            fontSize: '1rem', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '9999px', 
            cursor: 'pointer', 
            boxShadow: '0 0 30px rgba(0,212,255,0.5)', 
            transition: 'all 0.3s ease'
          }}
          className="hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] hover:scale-105"
        >
          Back to Categories
        </Link>
      </p>
    </div>
  );
}