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

    // Client-side check
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

    // Server-side check
    const serverResponse = await fetch(`/api/check?url=${encodeURIComponent(cleanInput)}`);
    const serverData = await serverResponse.json();

    const clientResult = await clientPromise;

    setLoading(false);

    // Decision matrix
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

    setResult(`${finalMessage}\n${confidence}\n(We tested client network + global server probe. Advanced blocks may not detect.)`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.8em', color: '#2c3e50' }}>BlockedOrDown.com</h1>
      <p style={{ fontSize: '1.3em', color: '#555', margin: '20px 0' }}>
        Check if a website is down globally or blocked on your network (work/school/firewall).
      </p>
      <div style={{ margin: '40px 0' }}>
        <input 
          type="text" 
          placeholder="Enter website (e.g., netflix.com)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          style={{ padding: '15px', width: '70%', maxWidth: '500px', fontSize: '1.1em', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={() => checkSite(url)}
          disabled={loading}
          style={{ padding: '15px 30px', fontSize: '1.1em', marginLeft: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Now'}
        </button>
      </div>
      {result && <p style={{ margin: '30px 0', fontSize: '1.2em', whiteSpace: 'pre-wrap', fontWeight: 'bold', color: '#2c3e50' }}>{result}</p>}
      <p style={{ color: '#777' }}>Or quick test popular sites below:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '40px 0' }}>
        <button onClick={() => checkSite('youtube.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>YouTube</button>
        <button onClick={() => checkSite('tiktok.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#000000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>TikTok</button>
        <button onClick={() => checkSite('netflix.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#e50914', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Netflix</button>
        <button onClick={() => checkSite('instagram.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#f09433', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Instagram</button>
        <button onClick={() => checkSite('whatsapp.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>WhatsApp</button>
        <button onClick={() => checkSite('discord.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#5865f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Discord</button>
        <button onClick={() => checkSite('reddit.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#ff4500', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reddit</button>
        <button onClick={() => checkSite('chatgpt.com')} disabled={loading} style={{ padding: '20px', fontSize: '1.2em', background: '#00ff99', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>ChatGPT</button>
      </div>
      <p style={{ color: '#888', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected. Confidence based on checks.
      </p>
      <p style={{ marginTop: '50px' }}>
        <Link href="/my-ip" style={{ padding: '15px 30px', fontSize: '1.1em', background: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          What Is My IP Address?
        </Link>
      </p>
    </div>
  );
}