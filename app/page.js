'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');

  const checkSite = () => {
    if (!url.trim()) return;
    let clean = url.trim().toLowerCase();
    if (!clean.startsWith('http')) clean = 'https://' + clean;
    const slug = clean.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
    window.location.href = `/status/${slug}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') checkSite();
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: 'clamp(60px, 8vw, 100px) 16px',
      textAlign: 'center',
      background: 'transparent'
    }}>
      {/* Hero section */}
      <div style={{
        maxWidth: 'clamp(500px, 90vw, 800px)',
        margin: '0 auto 48px auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
          fontWeight: '900',
          color: '#00d4ff',
          marginBottom: '16px',
          textShadow: '0 0 30px rgba(0,212,255,0.6)'
        }}>
          Is this site down or blocked?
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: '#c9d1d9',
          marginBottom: '32px'
        }}>
          Enter any website to get multi-signal status proof in seconds.
        </p>

        {/* Responsive search bar - fixed on mobile */}
        <div style={{
          width: '100%',
          maxWidth: 'clamp(480px, 90vw, 720px)',
          margin: '0 auto 32px auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: 'rgba(13,17,23,0.75)',
            borderRadius: '16px',
            border: '1px solid rgba(0,212,255,0.35)',
            boxShadow: '0 0 40px rgba(0,212,255,0.25)',
            overflow: 'hidden',
            '@media (max-width: 640px)': {
              flexDirection: 'column',
              borderRadius: '16px'
            }
          }}>
            <input
              type="text"
              placeholder="e.g., youtube.com or netflix.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: 'clamp(12px, 3vw, 16px) 20px',
                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                outline: 'none',
                borderRadius: '16px 0 0 16px',
                '@media (max-width: 640px)': {
                  borderRadius: '16px 16px 0 0',
                  borderBottom: '1px solid rgba(0,212,255,0.15)'
                }
              }}
            />
            <button
              onClick={checkSite}
              style={{
                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
                background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
                color: 'white',
                border: 'none',
                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                minWidth: 'clamp(140px, 30vw, 180px)',
                borderRadius: '0 16px 16px 0',
                '@media (max-width: 640px)': {
                  borderRadius: '0 0 16px 16px',
                  minWidth: '100%',
                  borderTop: '1px solid rgba(0,212,255,0.15)'
                }
              }}
            >
              Check Now →
            </button>
          </div>
        </div>
      </div>

      {/* Quick chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '48px'
      }}>
        {['youtube.com', 'discord.com', 'chatgpt.com', 'tiktok.com'].map(site => (
          <Link
            key={site}
            href={`/status/${site.replace(/\./g, '-')}`}
            style={{
              padding: '10px 18px',
              background: 'rgba(13,17,23,0.65)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '12px',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'all 0.3s'
            }}
          >
            {site}
          </Link>
        ))}
      </div>

     {/* Compact feature cards with minimal hover effect */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)', // default = 1 column (mobile)
  gap: 'clamp(12px, 2vw, 16px)',
  maxWidth: 'clamp(500px, 90vw, 800px)',
  margin: '0 auto'
}}>
  {/* Force 2 columns on desktop screens */}
  <style jsx global>{`
    @media (min-width: 768px) {
      div {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `}</style>

  {/* Card 1 */}
  <Link href="/categories" style={{ textDecoration: 'none' }}>
    <div className="glass" style={{
      padding: '16px 12px',
      borderRadius: '9999px',
      border: '1px solid rgba(0,212,255,0.25)',
      boxShadow: '0 4px 16px rgba(0,212,255,0.15)',
      background: 'rgba(13,17,23,0.75)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0px'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,212,255,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,212,255,0.15)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        background: 'rgba(0,212,255,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0,212,255,0.35)'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#00d4ff', margin: 0 }}>
        Scan a Category
      </h3>
      <p style={{ fontSize: '0.75rem', color: '#c9d1d9', margin: 0, lineHeight: '1.2' }}>
        Social·AI·Streaming·Gaming
      </p>
    </div>
  </Link>

  {/* Card 2 */}
  <Link href="/outages" style={{ textDecoration: 'none' }}>
    <div className="glass" style={{
      padding: '16px 12px',
      borderRadius: '9999px',
      border: '1px solid rgba(139, 92, 246, 0.25)',
      boxShadow: '0 4px 16px rgba(139,92,246,0.15)',
      background: 'rgba(13,17,23,0.75)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0px'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,92,246,0.15)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        background: 'rgba(139,92,246,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(139,92,246,0.35)'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#8b5cf6', margin: 0 }}>
        Global Outages
      </h3>
      <p style={{ fontSize: '0.75rem', color: '#c9d1d9', margin: 0, lineHeight: '1.2' }}>
        Live status of major platforms
      </p>
    </div>
  </Link>

  {/* Card 3 */}
  <Link href="/my-ip" style={{ textDecoration: 'none' }}>
    <div className="glass" style={{
      padding: '16px 12px',
      borderRadius: '9999px',
      border: '1px solid rgba(0, 255, 157, 0.25)',
      boxShadow: '0 4px 16px rgba(0,255,157,0.15)',
      background: 'rgba(13,17,23,0.75)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0px'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,157,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,255,157,0.15)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        background: 'rgba(0,255,157,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0,255,157,0.35)'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#00ff9d', margin: 0 }}>
        Check Your IP
      </h3>
      <p style={{ fontSize: '0.75rem', color: '#c9d1d9', margin: 0, lineHeight: '1.2' }}>
        ISP, location & connection type
      </p>
    </div>
  </Link>

  {/* Card 4 */}
  <Link href="/popular-blocked" style={{ textDecoration: 'none' }}>
    <div className="glass" style={{
      padding: '16px 12px',
      borderRadius: '9999px',
      border: '1px solid rgba(255, 166, 87, 0.25)',
      boxShadow: '0 4px 16px rgba(255,166,87,0.15)',
      background: 'rgba(13,17,23,0.75)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0px'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,166,87,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,166,87,0.15)';
      }}
    >
      <div style={{
        width: '28px',
        height: '28px',
        background: 'rgba(255,166,87,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(255,166,87,0.35)'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa657" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ffa657', margin: 0 }}>
        Most Blocked Sites
      </h3>
      <p style={{ fontSize: '0.75rem', color: '#c9d1d9', margin: 0, lineHeight: '1.2' }}>
        Popular sites at work & school
      </p>
    </div>
  </Link>
</div>

      <p style={{
        marginTop: '60px',
        fontSize: '0.85rem',
        color: '#94a3b8',
        textAlign: 'center'
      }}>
        Results are indicative only — advanced filtering may not be detected. • Multi-region proof coming in Phase 3
      </p>
    </div>
  );
}