'use client';

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
      padding: '100px 20px 80px', 
      margin: '0', 
      fontFamily: 'Arial, sans-serif', 
      background: 'var(--bg-secondary)', 
      color: 'var(--text-primary)', 
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden'
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '32px',
        textAlign: 'center',
        textShadow: '0 0 50px rgba(0,212,255,0.6)'
      }}>
        Global Outages Dashboard
      </h1>

      <p style={{ 
        fontSize: '1.4rem', 
        color: '#c9d1d9', 
        marginBottom: '48px', 
        textAlign: 'center' 
      }}>
        Live status of major sites (updated every 5 minutes).
      </p>

      {/* Compact list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '900px',
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

          return (
            <div key={site.name} style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #0d1117, #161b22)', 
              borderRadius: '12px', 
              boxShadow: '0 4px 20px rgba(0,212,255,0.1)', 
              border: `1px solid ${status === 'accessible' ? 'rgba(0,212,255,0.3)' : 'rgba(255,77,77,0.3)'}`,
              transition: 'all 0.3s ease'
            }} className="hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:scale-[1.01]">
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                  {site.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                  {detail}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  padding: '6px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  background: status === 'online' ? 'rgba(0,255,157,0.15)' : status === 'down' ? 'rgba(255,77,77,0.15)' : 'rgba(255,165,87,0.15)',
                  color: status === 'online' ? '#00ff9d' : status === 'down' ? '#ff4d4d' : '#ffa657',
                  border: `1px solid ${status === 'online' ? 'rgba(0,255,157,0.3)' : status === 'down' ? 'rgba(255,77,77,0.3)' : 'rgba(255,165,87,0.3)'}`,
                }}>
                  {text}
                </span>

                <Link 
                  href={`/status/${site.name.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ color: '#00d4ff', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}
                >
                  Full Check →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '48px', textAlign: 'center' }}>
        {sortedStatuses.filter(s => s.result.status === 'online').length} online / {sortedStatuses.length} total
      </p>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '14px 32px', 
            fontSize: '1.1em', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '9999px', 
            cursor: 'pointer', 
            boxShadow: '0 0 40px rgba(0,212,255,0.5)', 
            transition: 'all 0.3s ease'
          }}
          className="hover:shadow-[0_0_70px_rgba(0,212,255,0.7)] hover:scale-105"
        >
          Back to Homepage
        </Link>
      </p>
    </div>
  );
}