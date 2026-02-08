'use client';
export const runtime = 'edge';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function getRelativeTime(timestamp) {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMs < 30000) return 'just now';
  if (diffMin < 1) return '< 1 min ago';
  if (diffMin === 1) return '1 min ago';
  if (diffMin < 60) return `${diffMin} min ago`;
  const hours = Math.floor(diffMin / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
}

export default function ClientOutages({ initialStatuses }) {
  const [statuses, setStatuses] = useState(initialStatuses);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatuses(prev => prev.map(site => ({ ...site })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Limit to 50 sites
  const limitedStatuses = statuses.slice(0, 50);

  // Sort: Down first, Error second, Online last
  const sortedStatuses = [...limitedStatuses].sort((a, b) => {
    const order = { down: 0, error: 1, online: 2 };
    return order[a.result.status] - order[b.result.status];
  });

  return (
    <div style={{
      padding: 'clamp(70px, 8vw, 100px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px)',
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
        textShadow: '0 0 40px rgba(0,212,255,0.6)'
      }}>
        Global Outages Dashboard
      </h1>

      <p style={{ 
        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
        color: '#c9d1d9', 
        marginBottom: '32px',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Live status of major sites (updated every 5 minutes).
      </p>

      {/* Compact pill-shaped outage list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '760px',
        margin: '0 auto'
      }}>
        {sortedStatuses.map((site) => {
          const { status, code, error, timestamp } = site.result;
          let color = '#00ff9d'; // online
          let text = 'Online';
          let detail = `Last check: ${getRelativeTime(timestamp)}`;

          if (status === 'down') {
            color = '#ff4d4d';
            text = 'Down';
            detail = error ? `${error} • ${getRelativeTime(timestamp)}` : `Failed • ${getRelativeTime(timestamp)}`;
          } else if (status === 'error') {
            color = '#ffa657';
            text = 'Error';
            detail = `${code || 'Unknown'} • ${getRelativeTime(timestamp)}`;
          }

          // Clean slug for Full Check link
          const slug = `${site.name.toLowerCase()}-com`.replace(/\s+/g, '-');

          return (
            <div 
              key={site.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: 'rgba(13,17,23,0.75)',
                borderRadius: '9999px',
                border: `1px solid ${status === 'online' ? 'rgba(0,212,255,0.25)' : 'rgba(255,77,77,0.25)'}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
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
              {/* Left: name + detail */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: '600' }}>
                  {site.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '2px' }}>
                  {detail}
                </p>
              </div>

              {/* Right: status badge + link */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  background: status === 'online' ? 'rgba(0,255,157,0.12)' : status === 'down' ? 'rgba(255,77,77,0.12)' : 'rgba(255,165,87,0.12)',
                  color: status === 'online' ? '#00ff9d' : status === 'down' ? '#ff4d4d' : '#ffa657',
                  border: `1px solid ${status === 'online' ? 'rgba(0,255,157,0.3)' : status === 'down' ? 'rgba(255,77,77,0.3)' : 'rgba(255,165,87,0.3)'}`,
                }}>
                  {text}
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
        {sortedStatuses.filter(s => s.result.status === 'online').length} online / {sortedStatuses.length} total
      </p>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '12px 32px', 
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
          Back to Homepage
        </Link>
      </p>
    </div>
  );
}