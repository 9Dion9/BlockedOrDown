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

  return (
    <div style={{
      minHeight: '100vh',
      padding: 'clamp(80px, 10vw, 140px) 20px',
      textAlign: 'center',
      background: 'var(--bg-primary)'
    }}>
      <div className="glass" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) clamp(24px, 4vw, 40px)',
        borderRadius: '24px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
          fontWeight: '900',
          color: '#00d4ff',
          marginBottom: '20px',
          textShadow: '0 0 40px rgba(0,212,255,0.7)'
        }}>
          Is this site down or blocked?
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
          color: '#c9d1d9',
          marginBottom: '40px'
        }}>
          Enter any website to get multi-signal status proof in seconds.
        </p>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          background: 'rgba(13,17,23,0.7)',
          borderRadius: '16px',
          border: '1px solid rgba(0,212,255,0.35)',
          boxShadow: '0 0 50px rgba(0,212,255,0.25)',
          overflow: 'hidden'
        }}>
          <input
            type="text"
            placeholder="e.g., youtube.com or netflix.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkSite()}
            style={{
              flex: 1,
              padding: '20px 24px',
              fontSize: '1.3rem',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              outline: 'none'
            }}
          />
          <button
            onClick={checkSite}
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
              color: 'white',
              border: 'none',
              fontSize: '1.3rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Check Now →
          </button>
        </div>

        {/* Quick Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          {['youtube.com', 'discord.com', 'chatgpt.com', 'tiktok.com'].map(site => (
            <Link
              key={site}
              href={`/status/${site.replace(/\./g, '-')}`}
              className="chip"
              style={{
                padding: '12px 20px',
                background: 'rgba(13,17,23,0.65)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
            >
              {site}
            </Link>
          ))}
        </div>

        {/* 2x2 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div className="glass">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ color: '#00d4ff', marginBottom: '8px' }}>Scan a Category</h3>
            <p style={{ color: '#c9d1d9' }}>Social • AI • Streaming • Gaming</p>
          </div>

          <div className="glass">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌍</div>
            <h3 style={{ color: '#8b5cf6', marginBottom: '8px' }}>Global Outages</h3>
            <p style={{ color: '#c9d1d9' }}>Live status of major platforms</p>
          </div>

          <div className="glass">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌐</div>
            <h3 style={{ color: '#00ff9d', marginBottom: '8px' }}>Check Your IP</h3>
            <p style={{ color: '#c9d1d9' }}>ISP, location & connection type</p>
          </div>

          <div className="glass">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚫</div>
            <h3 style={{ color: '#ffa657', marginBottom: '8px' }}>Most Blocked Sites</h3>
            <p style={{ color: '#c9d1d9' }}>Popular sites at work & school</p>
          </div>
        </div>
      </div>

      <p style={{
        marginTop: '80px',
        fontSize: '0.9rem',
        color: '#94a3b8',
        textAlign: 'center'
      }}>
        Results are indicative only — advanced filtering may not be detected. • Multi-region proof coming in Phase 3
      </p>
    </div>
  );
}