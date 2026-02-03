'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SiteStatusPage() {
  const params = useParams();
  const site = params.site; // safe access in client component

  const decodedSite = decodeURIComponent(site).replace(/-/g, '.');

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [newUrl, setNewUrl] = useState('');
  const [lastChecked, setLastChecked] = useState(new Date());

  const checkSite = async (inputUrl = decodedSite) => {
    setLoading(true);
    setResult('');
    setProgress(0);

    const startTime = Date.now();

    let cleanInput = inputUrl.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }

    // Progress simulation (smooth 0-90%)
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 90));
    }, 200);

    try {
      const serverResponse = await fetch(`/api/check?url=${encodeURIComponent(cleanInput)}`);
      const serverData = await serverResponse.json();

      let finalMessage = '';
      let confidence = '';
      let statusColor = '#94a3b8';

      if (serverData.serverStatus === 'reachable') {
        finalMessage = '✅ Reachable everywhere — not down or blocked.';
        confidence = 'High confidence';
        statusColor = '#00ff9d';
      } else {
        finalMessage = '❌ Unreachable — likely global outage or down for everyone.';
        confidence = 'Medium confidence';
        statusColor = '#ff4d4d';
      }

      setResult(`${finalMessage}\n${confidence}`);
      setLastChecked(new Date());
    } catch (err) {
      setResult('❌ Error checking status. Try again.');
    } finally {
      // Minimum display time: 1500ms
      const elapsed = Date.now() - startTime;
      const delay = Math.max(1500 - elapsed, 0);
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setLoading(false);
      }, delay);
    }
  };

  useEffect(() => {
    checkSite(decodedSite);
  }, [decodedSite]);

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
              Checking... {progress}%
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

        {/* Last checked + refresh */}
        {!loading && result && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
              Last checked: {timeAgo()}
            </p>
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
      </div>
    </div>
  );
}