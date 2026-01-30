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
      setStatuses(prev => 
        prev.map(site => ({
          ...site,
          result: { ...site.result } // Force re-render for relative time
        }))
      );
    }, 30000); // Recalculate "ago" every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      background: '#000000', 
      color: '#ffffff', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.8em', color: '#ecf0f1', textAlign: 'center', marginBottom: '40px' }}>
        Global Website Outages Dashboard
      </h1>

      <p style={{ textAlign: 'center', color: '#bdc3c7', marginBottom: '40px', fontSize: '1.1em' }}>
        Live status of major sites (updated every 5 minutes). Online = reachable, Down/Error = potential outage.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {statuses.map((site) => {
          const { status, code, error, timestamp } = site.result;
          let bgColor = '#2ecc71'; // online
          let text = 'Online';
          let detail = `Last check: ${getRelativeTime(timestamp)}`;

          if (status === 'down') {
            bgColor = '#e74c3c';
            text = 'Down';
            detail = error ? `${error} • ${getRelativeTime(timestamp)}` : `Failed • ${getRelativeTime(timestamp)}`;
          } else if (status === 'error') {
            bgColor = '#f1c40f';
            text = 'Partial / Error';
            detail = `${code || 'Unknown'} • ${getRelativeTime(timestamp)}`;
          }

          return (
            <div key={site.name} style={{ 
              background: '#1c1c1c', 
              borderRadius: '12px', 
              padding: '20px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              border: `2px solid ${bgColor}`,
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.6em', color: '#ecf0f1', margin: '0 0 10px 0' }}>
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
              <p style={{ color: '#95a5a6', fontSize: '0.9em' }}>
                {detail}
              </p>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: 'center', color: '#95a5a6', marginTop: '60px', fontSize: '0.9em' }}>
        Some websites don't like our fast test method — the status is still accurate for most users.
      </p>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link 
          href="/" 
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
          Back to Homepage Checker
        </Link>
      </p>
    </div>
  );
}