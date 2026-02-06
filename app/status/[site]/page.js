'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkSite();
    }
  };

  const checkSite = () => {
    if (!url.trim()) return;
    let cleanInput = url.trim().toLowerCase();
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      cleanInput = 'https://' + cleanInput;
    }
    const siteSlug = cleanInput.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/\./g, '-');
    window.location.href = `/status/${siteSlug}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-cyan-400">BlockedOrDown.</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-cyan-400">Home</Link>
          <Link href="/categories" className="text-gray-300 hover:text-cyan-400">Categories</Link>
          <Link href="/outages" className="text-gray-300 hover:text-cyan-400">Outages</Link>
          <Link href="/my-ip" className="text-gray-300 hover:text-cyan-400">My IP</Link>
        </nav>
      </header>

      <main className="flex flex-col items-center text-center">
        <span className="bg-green-900 text-green-400 px-3 py-1 rounded-full mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span> LIVE
        </span>
        <h2 className="text-5xl font-bold text-cyan-400 mb-4">Is this site down or blocked?</h2>
        <p className="text-gray-400 mb-8">Enter any website to get multi-signal status proof in seconds.</p>

{/* Fully responsive search bar */}
<div style={{
  width: '100%',
  maxWidth: 'clamp(500px, 80vw, 700px)',
  margin: '0 auto 32px auto'
}}>
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    background: 'rgba(13,17,23,0.75)',
    borderRadius: '16px',
    border: '1px solid rgba(0,212,255,0.35)',
    boxShadow: '0 0 40px rgba(0,212,255,0.25)',
    overflow: 'hidden',
    '@media (max-width: 640px)': {
      flexDirection: 'column'
    }
  }}>
    <input
      type="text"
      placeholder="e.g., youtube.com or netflix.com"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && checkSite()}
      style={{
        flex: 1,
        padding: 'clamp(12px, 3vw, 16px) 20px',
        fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
        background: 'transparent',
        border: 'none',
        color: '#ffffff',
        outline: 'none',
        borderRadius: '16px 0 0 16px',
        '@media (max-width: 640px)': {
          borderRadius: '16px 16px 0 0'
        }
      }}
    />
    <button
      onClick={checkSite}
      style={{
        padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
        color: 'white',
        border: 'none',
        fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        minWidth: 'clamp(120px, 25vw, 160px)',
        borderRadius: '0 16px 16px 0',
        '@media (max-width: 640px)': {
          borderRadius: '0 0 16px 16px',
          borderTop: '1px solid rgba(0,212,255,0.15)'
        }
      }}
    >
      Check Now →
    </button>
  </div>
</div>

        <div className="flex space-x-2 mb-16">
          <Link href="/status/youtube-com" className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 hover:border-cyan-400">youtube.com</Link>
          <Link href="/status/discord-com" className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 hover:border-cyan-400">discord.com</Link>
          <Link href="/status/chatgpt-com" className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 hover:border-cyan-400">chatgpt.com</Link>
          <Link href="/status/tiktok-com" className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 hover:border-cyan-400">tiktok.com</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="glass-card flex items-center gap-4 p-6">
            <div className="bg-cyan-900 rounded-full p-3">
              <svg fill="cyan" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400">Scan a Category</h3>
              <p className="text-gray-400">Social • AI • Streaming • Gaming</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-4 p-6">
            <div className="bg-violet-900 rounded-full p-3">
              <svg fill="violet" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-5 5z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-violet-400">Global Outages</h3>
              <p className="text-gray-400">Live status of major platforms</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-4 p-6">
            <div className="bg-mint-900 rounded-full p-3">
              <svg fill="mint" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-5 5z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-mint-400">Check Your IP</h3>
              <p className="text-gray-400">ISP, location & connection type</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-4 p-6">
            <div className="bg-amber-900 rounded-full p-3">
              <svg fill="amber" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-5 5z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">Most Blocked Sites</h3>
              <p className="text-gray-400">Popular sites at work & school</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto p-4 text-center text-gray-500 text-sm">
        Results are indicative only — advanced filtering may not be detected. • Multi-region proof coming in Phase 3
      </footer>
    </div>
  );
}