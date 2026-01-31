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
  if (diffMin < 60) return `${diffMin} mins ago`;
  const hours = Math.floor(diffMin / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
}

export default function ClientOutages({ initialStatuses }) {
  const [statuses, setStatuses] = useState(initialStatuses);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatuses(prev => prev.map(site => ({ ...site }))); // Trigger re-render for relative time
    }, 30000); // Update "ago" every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Sort: Down first, Error second, Online last
  const sortedStatuses = [...statuses].sort((a, b) => {
    const order = { down: 0, error: 1, online: 2 };
    return order[a.result.status] - order[b.result.status];
  });

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      background: 'var(--bg-primary)', 
      color: 'var(--text-primary)', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.8em', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '40px' }}>
        Global Website Outages Dashboard
      </h1>

      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1em' }}>
        Live status of major sites (updated every 5 minutes). Online = reachable, Down/Error = potential outage.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {sortedStatuses.map((site) => {
          const { status, code, error, timestamp } = site.result;
          let bgColor = 'var(--success)'; // online
          let text = 'Online';
          let detail = `Last check: ${getRelativeTime(timestamp)}`;

          if (status === 'down') {
            bgColor = 'var(--danger)';
            text = 'Down';
            detail = error ? `${error} • ${getRelativeTime(timestamp)}` : `Failed • ${getRelativeTime(timestamp)}`;
          } else if (status === 'error') {
            bgColor = 'var(--warning)';
            text = 'Partial / Error';
            detail = `${code || 'Unknown'} • ${getRelativeTime(timestamp)}`;
          }

          return (
            <div key={site.name} style={{ 
              background: 'var(--card-bg)', 
              borderRadius: '12px', 
              padding: '20px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              border: `2px solid ${bgColor}`,
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.6em', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                {site.name}
              </h3>
              <p style={{ 
                fontSize: '1.8em', 
                fontWeight: 'bold', 
                color: bgColor, 
                margin: '10px 0' 
              }}>
                {text}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>
                {detail}
              </p>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px', fontSize: '0.9em' }}>
        Checks run server-side every 5 min. Relative time updates live every 30 seconds. Some sites may block quick checks — results indicative.
      </p>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.1em', 
            background: 'var(--success)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Back to Homepage Checker
        </Link>
      </p>
    </div>
  );
}