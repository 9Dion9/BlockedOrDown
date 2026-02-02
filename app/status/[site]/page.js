'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SiteStatusPage() {
  const params = useParams();
  const { site } = params;

  const decodedSite = decodeURIComponent(site).replace(/-/g, '.');

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');

  const checkSite = async (inputUrl = decodedSite) => {
    setLoading(true);
    setResult('');

    let cleanInput = inputUrl.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }

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

      const explanation = ''; // No yellow case anymore, so no explanation needed

      setResult(`${finalMessage}\n${confidence}${explanation}`);
    } catch (err) {
      setResult('❌ Error checking status. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSite(decodedSite);
  }, [decodedSite]);

  const handleNewCheck = () => {
    if (!newUrl.trim()) return;
    const siteSlug = newUrl.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
    if (siteSlug) window.location.href = `/status/${siteSlug}`;
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
          fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
          fontWeight: '900',
          background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(24px, 5vw, 40px)',
          textShadow: '0 0 50px rgba(0,212,255,0.6)',
          textAlign: 'center'
        }}>
          Is {decodedSite} Down or Blocked?
        </h1>

        {/* Compact result box */}
{/* Loading */}
{loading ? (
  <div style={{ margin: 'clamp(32px, 6vw, 48px) 0', textAlign: 'center' }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '4px solid rgba(0,212,255,0.2)',
      borderTop: '4px solid #00d4ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 12px auto'
    }} />
    <p style={{ fontSize: '0.95rem', color: '#c9d1d9' }}>Checking...</p>
  </div>
) : 
result && (
  <div style={{ 
    marginTop: '40px', 
    padding: '12px 16px', 
    background: result.includes('✅') ? 'rgba(0,255,157,0.15)' : result.includes('⚠️') ? 'rgba(255,165,87,0.15)' : 'rgba(255,77,77,0.15)', 
    borderRadius: '12px', 
    border: `1px solid ${result.includes('✅') ? 'rgba(0,255,157,0.3)' : result.includes('⚠️') ? 'rgba(255,165,87,0.3)' : 'rgba(255,77,77,0.3)'}` , 
    maxWidth: 'clamp(320px, 90vw, 600px)', 
    margin: '0 auto', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    boxShadow: '0 0 20px rgba(0,212,255,0.2)' 
  }}>
    <span style={{ fontSize: 'clamp(1.6rem, 6vw, 2rem)', flexShrink: 0 }}>
      {result.includes('✅') ? '✅' : result.includes('⚠️') ? '⚠️' : '❌'}
    </span>
    <div style={{ flex: 1, textAlign: 'center' }}> {/* ← centers all text */}
      <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>
        {result.split('\n')[0].replace(/[✅⚠️❌]\s*/, '')}
      </p>
      <p style={{
        fontSize: 'clamp(0.85rem, 3vw, 0.9rem)',
        color: '#94a3b8',
        margin: 0,
        fontStyle: 'italic' // italic confidence
      }}>
        {result.split('\n')[1]} {/* confidence line */}
      </p>
      </div>
  </div>
) }

{/* Quick search – compact */}
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
      </div>
    </div>
  );
}