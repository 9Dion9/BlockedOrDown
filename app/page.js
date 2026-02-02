'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const checkSite = () => {
    if (!url.trim()) {
      alert('Please enter a website.');
      return;
    }

    let cleanInput = url.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }

    // Extract domain for slug (e.g., https://www.youtube.com/watch?v=abc → youtube-com)
    const domain = cleanInput
      .replace(/^https?:\/\//, '') // remove protocol
      .replace(/^www\./, '')       // remove www
      .split('/')[0]               // take first part (domain)
      .replace(/\./g, '-');        // replace dots with hyphens
    setLoading(true);
// ... cleaning logic
const siteSlug = cleanInput
  .replace(/^https?:\/\//, '')
  .replace(/^www\./, '')
  .split('/')[0]
  .split('?')[0] // remove query params
  .replace(/\./g, '-');
window.location.href = `/status/${siteSlug}`;

    // Redirect to dynamic status page
    window.location.href = `/status/${domain}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      checkSite();
    }
  };

  return (
    <div style={{
      padding: '100px 20px 60px',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'var(--bg-secondary)',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden',
      width: '100vw'
    }}>
      {/* Hero Search Bar */}
      <div style={{ marginBottom: '80px' }}>
        <h1 style={{ 
          fontSize: '3.2em', 
          color: '#00d4ff', 
          marginBottom: '24px', 
          textShadow: '0 0 30px rgba(0,212,255,0.6)' 
        }}>
          Is this site down or blocked?
        </h1>
        <p style={{ fontSize: '1.4em', color: '#c9d1d9', marginBottom: '40px' }}>
          Enter any website below to check instantly.
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          maxWidth: '720px', 
          margin: '0 auto', 
          width: '100%' 
        }}>
          <input 
            type="text" 
            placeholder="e.g., youtube.com or netflix.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={{ 
              flex: 1,
              padding: '20px 24px', 
              fontSize: '1.3em', 
              borderRadius: '12px 0 0 12px', 
              border: '1px solid rgba(0,212,255,0.3)', 
              background: 'rgba(13,17,23,0.7)', 
              color: '#ffffff', 
              outline: 'none' 
            }}
          />
          <button 
            onClick={checkSite}
            disabled={loading}
            style={{ 
              padding: '20px 40px', 
              fontSize: '1.3em', 
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0 12px 12px 0', 
              cursor: 'pointer', 
              transition: 'all 0.2s' 
            }}
          >
            {loading ? 'Redirecting...' : 'Check Now'}
          </button>
        </div>
      </div>

      {/* Quick Links – vertical stack with left emoji + centered text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto 100px auto'
      }}>
        {[
          { href: '/categories', emoji: '🔍', label: 'Scan a Category', desc: 'Social • AI • Streaming • Gaming' },
          { href: '/outages', emoji: '🌩️', label: 'Global Outages Dashboard', desc: 'Live status of major sites' },
          { href: '/my-ip', emoji: '🌐', label: 'Check Your IP Address', desc: 'ISP, location & connection type' },
          { href: '/popular-blocked', emoji: '🚫', label: 'Most Blocked Sites', desc: 'Popular sites at work & school' }
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              background: 'rgba(13, 17, 23, 0.65)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 16px rgba(0, 212, 255, 0.1)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)'
            }}
            className="hover:bg-[rgba(0,212,255,0.12)] hover:border-[rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.35)] hover:scale-[1.02]"
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div>{item.label}</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#94a3b8',
                marginTop: '4px'
              }}>
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected.
      </p>
    </div>
  );
}