'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkSite = async (siteUrl) => {
    if (!siteUrl) {
      setResult('Please enter a website.');
      return;
    }

    let cleanInput = siteUrl.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }

    setLoading(true);
    setResult(`Checking ${cleanInput}...`);

    const clientPromise = new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        img.onload = img.onerror = null;
        resolve('client_fail_timeout');
      }, 5000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve('client_ok');
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve('client_fail');
      };

      img.src = cleanInput + '/favicon.ico?' + Date.now();
    });

    const serverResponse = await fetch(`/api/check?url=${encodeURIComponent(cleanInput)}`);
    const serverData = await serverResponse.json();

    const clientResult = await clientPromise;

    setLoading(false);

    let finalMessage = '';
    let confidence = '';

    if (serverData.serverStatus === 'reachable' && clientResult === 'client_ok') {
      finalMessage = '✅ Reachable everywhere — not down or blocked.';
      confidence = 'High confidence';
    } else if (serverData.serverStatus === 'reachable' && clientResult.includes('client_fail')) {
      finalMessage = '⚠️ Online globally, but blocked on your network (likely work/school firewall, DNS, or proxy).';
      confidence = 'Medium-high confidence';
    } else if (serverData.serverStatus !== 'reachable' && clientResult.includes('client_fail')) {
      finalMessage = '❌ Unreachable — likely global outage or down for everyone.';
      confidence = 'Medium confidence';
    } else if (serverData.serverStatus !== 'reachable' && clientResult === 'client_ok') {
      finalMessage = '⚠️ Unexpected: Reachable for you, but not from our probe (regional/probe issue?). Retest or try VPN.';
      confidence = 'Low confidence';
    } else {
      finalMessage = '❌ Check failed — try again or different site.';
      confidence = 'Low confidence';
    }

    setResult(`${finalMessage}\n${confidence}\n(We tested client network + global server probe. Advanced blocks may not be detected.)`);
  };

  return (
    <div style={{
      padding: '100px 16px 60px',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden'
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
            disabled={loading}
            style={{ 
              flex: 1,
              padding: '16px 20px', 
              fontSize: '1.2em', 
              borderRadius: '12px 0 0 12px', 
              border: '1px solid rgba(0,212,255,0.3)', 
              background: 'rgba(13,17,23,0.7)', 
              color: '#ffffff', 
              outline: 'none' 
            }}
          />
          <button 
            onClick={() => checkSite(url)}
            disabled={loading}
            style={{ 
              padding: '16px 32px', 
              fontSize: '1.2em', 
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0 12px 12px 0', 
              cursor: 'pointer', 
              transition: 'all 0.2s' 
            }}
          >
            {loading ? 'Checking...' : 'Check Now'}
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '80px' }}>
        <Link 
          href="/categories" 
          style={{ 
            padding: '24px 20px', 
            background: '#111111', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.1em', 
            fontWeight: '500', 
            textAlign: 'center', 
            border: '1px solid #222222', 
            transition: 'all 0.2s ease' 
          }}
        >
          Scan a Category<br />
          <small style={{ color: '#95a5a6', display: 'block', marginTop: '8px' }}>
            Social • AI • Streaming • Gaming
          </small>
        </Link>

        <Link 
          href="/outages" 
          style={{ 
            padding: '24px 20px', 
            background: '#111111', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.1em', 
            fontWeight: '500', 
            textAlign: 'center', 
            border: '1px solid #222222', 
            transition: 'all 0.2s ease' 
          }}
        >
          Global Outages Dashboard<br />
          <small style={{ color: '#95a5a6', display: 'block', marginTop: '8px' }}>
            Live status of major sites
          </small>
        </Link>

        <Link 
          href="/my-ip" 
          style={{ 
            padding: '24px 20px', 
            background: '#111111', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.1em', 
            fontWeight: '500', 
            textAlign: 'center', 
            border: '1px solid #222222', 
            transition: 'all 0.2s ease' 
          }}
        >
          Check Your IP Address<br />
          <small style={{ color: '#95a5a6', display: 'block', marginTop: '8px' }}>
            ISP, location & connection type
          </small>
        </Link>

        <Link 
          href="/popular-blocked" 
          style={{ 
            padding: '24px 20px', 
            background: '#111111', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.1em', 
            fontWeight: '500', 
            textAlign: 'center', 
            border: '1px solid #222222', 
            transition: 'all 0.2s ease' 
          }}
        >
          Most Blocked Sites<br />
          <small style={{ color: '#95a5a6', display: 'block', marginTop: '8px' }}>
            Popular sites at work & school
          </small>
        </Link>
      </div>

      <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected. Confidence based on checks.
      </p>
    </div>
  );
}