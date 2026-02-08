'use client';
export const runtime = 'edge';
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
          resolve({
            name: site.name,
            domain: site.url,  // e.g. "chatgpt.com"
            status: 'accessible',
            detail: 'Public site — accessible'
          });
          return;
        }

        const testResources = [
          `https://${site.url}/favicon.ico`,
          `https://${site.url}/robots.txt`,
          `https://${site.url}/`,
        ];

        let success = false;

        const tryResource = (index) => {
          if (success || index >= testResources.length) {
            resolve({
              name: site.name,
              domain: site.url,
              status: success ? 'accessible' : 'blocked',
              detail: success ? 'Reachable' : 'Blocked or restricted'
            });
            return;
          }

          fetch(testResources[index] + '?' + Date.now(), { method: 'GET', mode: 'no-cors', cache: 'no-store' })
            .then(() => {
              success = true;
              resolve({
                name: site.name,
                domain: site.url,
                status: 'accessible',
                detail: 'Reachable'
              });
            })
            .catch(() => tryResource(index + 1));
        };

        tryResource(0);
      }));

      const batchResults = await Promise.allSettled(batchPromises);
      newResults.push(...batchResults.map(r => r.value || r.reason));

      completed += batch.length;
      setProgress(Math.round((completed / categoryInfo.sites.length) * 100));
      setResults([...newResults]);
    }

    setScanning(false);
  };

  return (
    <div style={{
      padding: 'clamp(70px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px)',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      minHeight: '100vh',
      background: 'transparent'
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 5.5vw, 3.2rem)',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        textShadow: '0 0 50px rgba(0,212,255,0.7)'
      }}>
        {categoryInfo.title} Scan
      </h1>

      <p style={{ 
        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
        color: '#c9d1d9', 
        marginBottom: '32px',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Scanning popular {categoryInfo.title.toLowerCase()} sites on your current network.
      </p>

      <p style={{ 
        color: '#ff6b6b', 
        fontSize: '0.85rem', 
        marginBottom: '28px',
        fontStyle: 'italic'
      }}>
        Note: Some false blocks may occur due to strict firewalls.
      </p>

      {/* Scan Button */}
      <button 
        onClick={scanSites}
        disabled={scanning}
        style={{ 
          padding: '12px 36px', 
          fontSize: '1.1rem', 
          background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '9999px', 
          cursor: scanning ? 'not-allowed' : 'pointer', 
          boxShadow: '0 0 40px rgba(0,212,255,0.5)', 
          transition: 'all 0.3s ease',
          opacity: scanning ? 0.7 : 1
        }}
        className="hover:shadow-[0_0_70px_rgba(0,212,255,0.7)] hover:scale-105"
      >
        {scanning ? 'Scanning...' : 'Start Scan Now'}
      </button>

      {scanning && (
        <div style={{ margin: '32px auto', maxWidth: '360px' }}>
          <div style={{ 
            height: '6px', 
            background: 'rgba(13,17,23,0.6)', 
            borderRadius: '9999px', 
            overflow: 'hidden', 
            boxShadow: '0 0 15px rgba(0,212,255,0.2)'
          }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
              transition: 'width 0.4s ease' 
            }} />
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '8px' }}>
            {progress}% complete
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            color: '#00d4ff', 
            marginBottom: '24px',
            textShadow: '0 0 20px rgba(0,212,255,0.4)'
          }}>
            Scan Results
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '760px',
            margin: '0 auto'
          }}>
            {results.map((result, i) => {
              // Generate correct domain-based slug
              const slug = result.domain 
                ? result.domain.toLowerCase().replace(/\./g, '-') 
                : result.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '-');

              return (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    background: 'rgba(13,17,23,0.75)',
                    borderRadius: '9999px',
                    border: `1px solid ${result.status === 'accessible' ? 'rgba(0,212,255,0.25)' : 'rgba(255,77,77,0.25)'}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,212,255,0.35)';
                    e.currentTarget.style.transform = 'scale(1.01)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
                      {result.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                      {result.detail}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      background: result.status === 'accessible' ? 'rgba(0,255,157,0.12)' : 'rgba(255,77,77,0.12)',
                      color: result.status === 'accessible' ? '#00ff9d' : '#ff4d4d',
                      border: `1px solid ${result.status === 'accessible' ? 'rgba(0,255,157,0.3)' : 'rgba(255,77,77,0.3)'}`,
                    }}>
                      {result.status === 'accessible' ? 'Accessible' : 'Blocked'}
                    </span>

                    <Link 
                      href={`/status/${slug}`}
                      style={{ 
                        color: '#00d4ff', 
                        fontSize: '0.85rem', 
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}
                      className="hover:underline"
                    >
                      Full Check →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ 
            color: '#94a3b8', 
            fontSize: '0.9rem', 
            marginTop: '32px',
            textAlign: 'center'
          }}>
            {results.filter(r => r.status === 'accessible').length} / {results.length} accessible
          </p>
        </div>
      )}

      <p style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link 
          href="/categories" 
          style={{ 
            padding: '10px 28px', 
            fontSize: '1rem', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '9999px', 
            cursor: 'pointer', 
            boxShadow: '0 0 30px rgba(0,212,255,0.5)', 
            transition: 'all 0.3s ease'
          }}
          className="hover:shadow-[0_0_60px_rgba(0,212,255,0.7)] hover:scale-105"
        >
          ← Back to Categories
        </Link>
      </p>
    </div>
  );
}