'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyIpPage() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIpData = async () => {
    setLoading(true);
    setError(null);

    try {
      const ipv4Res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      if (!ipv4Res.ok) throw new Error('Failed to get IPv4');
      const ipv4Json = await ipv4Res.json();
      const ipv4 = ipv4Json.ip || 'Not detected';

      let ipv6 = 'Not detected';
      try {
        const ipv6Res = await fetch('https://api64.ipify.org?format=json', { cache: 'no-store' });
        if (ipv6Res.ok) {
          const ipv6Json = await ipv6Res.json();
          ipv6 = ipv6Json.ip;
        }
      } catch {}

      const geoRes = await fetch(`https://ipapi.co/${ipv4}/json/`, { cache: 'no-store' });
      const geo = geoRes.ok ? await geoRes.json() : {};

      setIpData({
        ipv4,
        ipv6,
        isp: geo.org || geo.asn || 'Unknown',
        city: geo.city || 'Unknown',
        region: geo.region || 'Unknown',
        country: geo.country_name || geo.country || 'Unknown'
      });
    } catch (err) {
      console.error('My IP fetch error:', err);
      setError(err.message || 'Failed to fetch IP data. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const retry = () => fetchIpData();

  return (
    <div style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)',
      margin: '0',
      textAlign: 'left',
      fontFamily: 'Arial, sans-serif',
      background: 'var(--bg-secondary)',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden'
    }}>

      {loading ? (
        <div style={{ margin: '80px 0' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(0,212,255,0.2)',
            borderTop: '5px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 0 20px 0'
          }} />
          <p style={{ fontSize: '1.2rem', color: '#c9d1d9' }}>Fetching your IP...</p>
        </div>
      ) : error ? (
        <div style={{ margin: '80px 0' }}>
          <p style={{ fontSize: '1.3rem', color: '#ff4d4d', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={retry}
            style={{
              padding: '12px 28px',
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,212,255,0.5)',
              transition: 'all 0.3s ease'
            }}
            className="hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] hover:scale-105"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div style={{
            maxWidth: 'clamp(400px, 90vw, 800px)',
            margin: '0 auto 60px auto',
            padding: 'clamp(20px, 5vw, 32px)',
            background: 'rgba(13,17,23,0.75)',
            borderRadius: '20px',
            border: '1px solid rgba(0,212,255,0.25)',
            boxShadow: '0 8px 32px rgba(0,212,255,0.25)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease'
          }} className="hover:shadow-[0_0_60px_rgba(0,212,255,0.5)]">
            <p style={{
              color: '#00d4ff',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '20px',
              textAlign: 'center' // centered title inside box
            }}>
              My IP Address is:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '6px' }}>
                  IPv4
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  wordBreak: 'break-all'
                }}>
                  {ipData.ipv4 || 'Not detected'}
                </p>
              </div>

              <div>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '6px' }}>
                  IPv6
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  wordBreak: 'break-all',
                  hyphens: 'auto'
                }}>
                  {ipData.ipv6 || 'Not detected'}
                </p>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '16px'
            }}>
              <p style={{
                color: '#00d4ff',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                My IP Information:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#94a3b8', minWidth: '70px' }}>ISP:</span>
                  <span style={{ color: '#c9d1d9', fontWeight: '500' }}>
                    {ipData.isp || 'Unknown'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#94a3b8', minWidth: '70px' }}>City:</span>
                  <span style={{ color: '#c9d1d9', fontWeight: '500' }}>
                    {ipData.city || 'Unknown'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#94a3b8', minWidth: '70px' }}>Region:</span>
                  <span style={{ color: '#c9d1d9', fontWeight: '500' }}>
                    {ipData.region || 'Unknown'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#94a3b8', minWidth: '70px' }}>Country:</span>
                  <span style={{ color: '#c9d1d9', fontWeight: '500' }}>
                    {ipData.country || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ color: '#ff4d4d', fontSize: '1.1rem', fontWeight: '600' }}>
                Your location may be exposed!
              </p>
              <button
                style={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  background: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  margin: '16px auto 0 auto',
                  display: 'block',
                  boxShadow: '0 4px 16px rgba(255,77,77,0.3)'
                }}
              >
                HIDE MY IP ADDRESS NOW
              </button>
            </div>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '40px', textAlign: 'center' }}>
            Data fetched securely from public APIs. Refreshes on reload. No logs stored.
          </p>

          <p style={{ textAlign: 'center' }}>
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
        </>
      )}
    </div>
  );
}