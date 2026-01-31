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
      padding: '140px 20px 120px',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 212, 255, 0.18) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(0, 212, 255, 0.14) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
    }}>
      {/* Hero Title – strong cyan/teal glow */}
      <h1 style={{
        fontSize: '4.5rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc, #00d4ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '32px',
        textShadow: '0 0 60px rgba(0,212,255,0.7), 0 0 120px rgba(59,130,246,0.5)',
        letterSpacing: '-1px'
      }}>
        Is this site down or blocked?
      </h1>

      <p style={{ fontSize: '1.6rem', color: '#c9d1d9', marginBottom: '48px', textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
        Enter any website below to check instantly.
      </p>

      {/* Glassmorphic Search Bar with strong glow */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '760px',
        margin: '0 auto 120px auto',
        position: 'relative',
        zIndex: 1
      }}>
        <input 
          type="text" 
          placeholder="e.g., youtube.com or netflix.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          style={{ 
            flex: 1,
            padding: '20px 32px', 
            fontSize: '1.35rem', 
            borderRadius: '9999px 0 0 9999px', 
            border: '1px solid rgba(0,212,255,0.3)', 
            background: 'rgba(13,17,23,0.65)', 
            color: '#ffffff', 
            outline: 'none', 
            backdropFilter: 'blur(20px)', 
            boxShadow: '0 0 50px rgba(0,212,255,0.35), inset 0 0 20px rgba(0,0,0,0.4)', 
            transition: 'all 0.3s ease'
          }}
          className="focus:border-[rgba(0,212,255,0.8)] focus:shadow-[0_0_80px_rgba(0,212,255,0.6)] focus:scale-102"
        />
        <button 
          onClick={() => checkSite(url)}
          disabled={loading}
          style={{ 
            padding: '20px 52px', 
            fontSize: '1.35rem', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #00d4ff)', 
            backgroundSize: '200% 100%',
            color: 'white', 
            border: 'none', 
            borderRadius: '0 9999px 9999px 0', 
            cursor: 'pointer', 
            transition: 'all 0.4s ease', 
            boxShadow: '0 0 50px rgba(0,212,255,0.6)' 
          }}
          className="hover:shadow-[0_0_100px_rgba(0,212,255,0.8)] hover:scale-105 hover:animate-pulse-slow"
        >
          {loading ? 'Checking...' : 'Check Now'}
        </button>
      </div>

      {/* Quick Links – stronger gradient + glow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '120px' }}>
        <Link 
          href="/categories" 
          style={{ 
            padding: '36px 28px', 
            background: 'linear-gradient(135deg, #0d1117, #161b22, #0d1117)', 
            borderRadius: '20px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.35rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            border: '1px solid rgba(0,212,255,0.25)', 
            transition: 'all 0.4s ease', 
            boxShadow: '0 12px 40px rgba(0,212,255,0.15)' 
          }}
          className="hover:shadow-[0_0_80px_rgba(0,212,255,0.6)] hover:scale-105 hover:border-[rgba(0,212,255,0.7)]"
        >
          Scan a Category<br />
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '12px', fontSize: '1rem' }}>
            Social • AI • Streaming • Gaming
          </small>
        </Link>

        <Link 
          href="/outages" 
          style={{ 
            padding: '36px 28px', 
            background: 'linear-gradient(135deg, #0d1117, #161b22, #0d1117)', 
            borderRadius: '20px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.35rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            border: '1px solid rgba(0,212,255,0.25)', 
            transition: 'all 0.4s ease', 
            boxShadow: '0 12px 40px rgba(0,212,255,0.15)' 
          }}
          className="hover:shadow-[0_0_80px_rgba(0,212,255,0.6)] hover:scale-105 hover:border-[rgba(0,212,255,0.7)]"
        >
          Global Outages Dashboard<br />
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '12px', fontSize: '1rem' }}>
            Live status of major sites
          </small>
        </Link>

        <Link 
          href="/my-ip" 
          style={{ 
            padding: '36px 28px', 
            background: 'linear-gradient(135deg, #0d1117, #161b22, #0d1117)', 
            borderRadius: '20px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.35rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            border: '1px solid rgba(0,212,255,0.25)', 
            transition: 'all 0.4s ease', 
            boxShadow: '0 12px 40px rgba(0,212,255,0.15)' 
          }}
          className="hover:shadow-[0_0_80px_rgba(0,212,255,0.6)] hover:scale-105 hover:border-[rgba(0,212,255,0.7)]"
        >
          Check Your IP Address<br />
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '12px', fontSize: '1rem' }}>
            ISP, location & connection type
          </small>
        </Link>

        <Link 
          href="/popular-blocked" 
          style={{ 
            padding: '36px 28px', 
            background: 'linear-gradient(135deg, #0d1117, #161b22, #0d1117)', 
            borderRadius: '20px', 
            textDecoration: 'none', 
            color: '#ffffff', 
            fontSize: '1.35rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            border: '1px solid rgba(0,212,255,0.25)', 
            transition: 'all 0.4s ease', 
            boxShadow: '0 12px 40px rgba(0,212,255,0.15)' 
          }}
          className="hover:shadow-[0_0_80px_rgba(0,212,255,0.6)] hover:scale-105 hover:border-[rgba(0,212,255,0.7)]"
        >
          Most Blocked Sites<br />
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '12px', fontSize: '1rem' }}>
            Popular sites at work & school
          </small>
        </Link>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.95em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected. Confidence based on checks.
      </p>
    </div>
  );
}