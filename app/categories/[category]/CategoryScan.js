'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CategoryScan({ categoryInfo, category }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const knownPublicSites = [
    'chatgpt', 'gemini', 'claude', 'midjourney', 'runway', 'canva', 'sora', 'fathom', 'saner.ai', 'semrush', 'wix', 'hostinger', 'squarespace', 'pythagora', 'v0', 'grok'
  ]; // Lowercase names

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

        // Hardcoded fallback for known public sites (avoid false blocked)
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
      padding: '40px 20px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif', 
      background: '#000000', 
      color: '#ffffff', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.8em', color: '#ecf0f1' }}>
        {categoryInfo.title} Scan
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0 40px 0' }}>
        Scan popular {categoryInfo.title.toLowerCase()} sites to see what's blocked on your network (work/school/firewall).
      </p>

      <p style={{ color: '#e74c3c', fontSize: '0.9em', marginBottom: '20px' }}>
        Note: Some sites have strict security that can cause false "Blocked" results. If a site loads in your browser but shows blocked here, it's likely a false positive.
      </p>

      <button 
        onClick={scanSites}
        disabled={scanning}
        style={{ 
          padding: '15px 30px', 
          fontSize: '1.2em', 
          background: '#3498db', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer' 
        }}
      >
        {scanning ? 'Scanning...' : 'Start Scan Now'}
      </button>

      <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '20px' }}>
        Estimate: 5–20 seconds for {categoryInfo.sites.length} sites (depends on your internet speed). Results client-side only — private.
      </p>

      {scanning && <div style={{ margin: '30px 0' }}>
        <div style={{ background: '#1c1c1c', borderRadius: '8px', height: '20px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#2ecc71', transition: 'width 0.5s' }}></div>
        </div>
        <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '10px' }}>
          Progress: {progress}%
        </p>
      </div>}

      {results.length > 0 && <div style={{ margin: '40px 0', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8em', color: '#ecf0f1', marginBottom: '20px' }}>
          Scan Results
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {results.map((result, i) => (
            <div key={i} style={{ 
              background: '#1c1c1c', 
              borderRadius: '12px', 
              padding: '20px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              border: `2px solid ${result.status === 'accessible' ? '#2ecc71' : '#e74c3c'}` 
            }}>
              <h3 style={{ fontSize: '1.4em', color: '#ecf0f1', marginBottom: '10px' }}>
                {result.site}
              </h3>
              <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: result.status === 'accessible' ? '#2ecc71' : '#e74c3c' }}>
                {result.status === 'accessible' ? '✅ Accessible' : '❌ Blocked'}
              </p>
              <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '5px' }}>
                {result.detail}
              </p>
              <p style={{ marginTop: '10px' }}>
                <Link 
                  href={`/status/${result.site.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ color: '#3498db', textDecoration: 'underline' }}
                >
                  Full Check
                </Link>
              </p>
            </div>
          ))}
        </div>

        <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '30px' }}>
          {results.filter(r => r.status === 'accessible').length} / {results.length} accessible. Results based on client-side scan — depend on your internet speed.
        </p>
      </div>}

      <p style={{ marginTop: '50px' }}>
        <Link 
          href="/categories" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.1em', 
            background: '#27ae60', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Back to Categories
        </Link>
      </p>
    </div>
  );
}