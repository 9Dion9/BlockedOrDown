'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyIpPage() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const fetchIpData = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);

    // Simulate progress (real fetch is fast, this makes it feel premium)
    const fakeProgress = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(fakeProgress);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

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
      clearInterval(fakeProgress);
      setProgress(100);
      setTimeout(() => setLoading(false), 300); // brief delay for smooth finish
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const retry = () => fetchIpData();

  return (
    <div style={{
      padding: 'clamp(70px, 8vw, 100px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px)',
      margin: '0',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      minHeight: '100vh',
      background: 'transparent'
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px',
        textAlign: 'center',
        textShadow: '0 0 40px rgba(0,212,255,0.6)'
      }}>
        My IP Address
      </h1>

      {loading ? (
        <div style={{ margin: '60px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{
            height: '6px',
            background: 'rgba(13,17,23,0.6)',
            borderRadius: '9999px',
            overflow: 'hidden',
            boxShadow: '0 0 15px rgba(0,212,255,0.2)'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
              transition: 'width 0.4s ease',
              borderRadius: '9999px'
            }} />
          </div>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#c9d1d9', 
            marginTop: '12px',
            textAlign: 'center'
          }}>
            Fetching your IP... {progress}%
          </p>
        </div>
      ) : error ? (
        <div style={{ margin: '60px 0', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#ff4d4d', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={retry}
            style={{
              padding: '10px 28px',
              fontSize: '0.95rem',
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
          {/* Main info block */}
          <div style={{
            maxWidth: 'clamp(420px, 85vw, 680px)',
            margin: '0 auto 40px auto',
            padding: 'clamp(20px, 4vw, 28px)',
            background: 'rgba(13,17,23,0.35)',
            borderRadius: '20px',
            border: '1px solid rgba(0,212,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,212,255,0.15)',
            backdropFilter: 'blur(8px)',
            textAlign: 'left'
          }}>
            {/* IP Addresses */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ 
                color: '#94a3b8', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                marginBottom: '6px' 
              }}>
                Your IPv4 Address
              </p>
              <p style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#ffffff',
                wordBreak: 'break-all',
                marginBottom: '16px'
              }}>
                {ipData.ipv4 || 'Not detected'}
              </p>

              <p style={{ 
                color: '#94a3b8', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                marginBottom: '6px' 
              }}>
                Your IPv6 Address
              </p>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#ffffff',
                wordBreak: 'break-all'
              }}>
                {ipData.ipv6 || 'Not detected'}
              </p>
            </div>

            {/* IP Info */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '20px'
            }}>
              <p style={{
                color: '#00d4ff',
                fontSize: '1.05rem',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                IP Details
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>ISP</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ipData.isp || 'Unknown'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>City</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ipData.city || 'Unknown'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>Region</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ipData.region || 'Unknown'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>Country</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ipData.country || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Premium VPN Pitch */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <p style={{ 
                color: '#ff6b6b', 
                fontSize: '1.05rem', 
                fontWeight: 'bold', 
                marginBottom: '12px' 
              }}>
                Your real location & activity are currently exposed
              </p>
              <p style={{ 
                color: '#c9d1d9', 
                fontSize: '0.9rem', 
                marginBottom: '20px' 
              }}>
                Your ISP, websites, advertisers and even bad actors can track your location, browsing habits and identity right now.
              </p>
              <button
                style={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 0 30px rgba(0,212,255,0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(0,212,255,0.7)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.5)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Protect My Identity Now – Get VPN
              </button>
              <p style={{ 
                color: '#94a3b8', 
                fontSize: '0.8rem', 
                marginTop: '12px' 
              }}>
                Secure • Fast • No-logs • From $3.99/mo
              </p>
            </div>
          </div>

          <p style={{ 
            color: '#94a3b8', 
            fontSize: '0.85rem', 
            margin: '32px 0', 
            textAlign: 'center' 
          }}>
            Data fetched securely from public APIs. Refreshes on reload. No logs stored.
          </p>

          <p style={{ textAlign: 'center' }}>
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
        </>
      )}
    </div>
  );
}