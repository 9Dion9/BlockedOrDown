import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'BlockedOrDown',
  description: 'Check if sites are down or blocked globally',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Glass Header Pill */}
<header style={{
  position: 'sticky',
  top: '12px',
  zIndex: 1000,
  margin: '0 auto',
  width: 'fit-content',
  minWidth: 'clamp(260px, 80vw, 360px)', // tighter on mobile
  maxWidth: 'clamp(500px, 85vw, 900px)', // tighter on desktop
  borderRadius: '9999px',
  padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px)',
  background: 'rgba(13,17,23,0.35)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(0,212,255,0.15)',
  boxShadow: '0 8px 32px rgba(0,212,255,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'clamp(10px, 2vw, 16px)',
  flexWrap: 'wrap'
}}>
  {/* Brand pill on left */}
  <div style={{
    background: 'rgba(0,212,255,0.12)',
    borderRadius: '9999px',
    padding: 'clamp(4px, 1.5vw, 6px) clamp(12px, 3vw, 16px)',
    boxShadow: '0 0 16px rgba(0,212,255,0.3)',
    border: '1px solid rgba(0,212,255,0.3)',
    whiteSpace: 'nowrap'
  }}>
    <Link href="/" style={{ 
      fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)', 
      fontWeight: '900', 
      color: '#00d4ff', 
      textDecoration: 'none', 
      textShadow: '0 0 16px rgba(0,212,255,0.6)' 
    }}>
      BlockedOrDown.
    </Link>
  </div>

  {/* Nav buttons centered */}
  <nav style={{ 
    display: 'flex', 
    gap: 'clamp(6px, 1.5vw, 10px)', 
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
    margin: '0 auto'
  }}>
    <Link href="/" style={{ 
      padding: 'clamp(4px, 1.5vw, 6px) clamp(10px, 2.5vw, 14px)', 
      background: 'transparent',
      borderRadius: '9999px', 
      textDecoration: 'none', 
      fontSize: 'clamp(0.8rem, 2.8vw, 0.9rem)', 
      fontWeight: '500', 
      color: '#c9d1d9', 
      border: '1px solid rgba(0,212,255,0.2)', 
      transition: 'all 0.3s ease', 
      boxShadow: '0 0 10px rgba(0,212,255,0.1)' 
    }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105">
      Home
    </Link>
    <Link href="/categories" style={{ 
      padding: 'clamp(4px, 1.5vw, 6px) clamp(10px, 2.5vw, 14px)', 
      background: 'transparent',
      borderRadius: '9999px', 
      textDecoration: 'none', 
      fontSize: 'clamp(0.8rem, 2.8vw, 0.9rem)', 
      fontWeight: '500', 
      color: '#c9d1d9', 
      border: '1px solid rgba(0,212,255,0.2)', 
      transition: 'all 0.3s ease', 
      boxShadow: '0 0 10px rgba(0,212,255,0.1)' 
    }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105">
      Categories
    </Link>
    <Link href="/outages" style={{ 
      padding: 'clamp(4px, 1.5vw, 6px) clamp(10px, 2.5vw, 14px)', 
      background: 'transparent',
      borderRadius: '9999px', 
      textDecoration: 'none', 
      fontSize: 'clamp(0.8rem, 2.8vw, 0.9rem)', 
      fontWeight: '500', 
      color: '#c9d1d9', 
      border: '1px solid rgba(0,212,255,0.2)', 
      transition: 'all 0.3s ease', 
      boxShadow: '0 0 10px rgba(0,212,255,0.1)' 
    }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105">
      Outages
    </Link>
    <Link href="/my-ip" style={{ 
      padding: 'clamp(4px, 1.5vw, 6px) clamp(10px, 2.5vw, 14px)', 
      background: 'transparent',
      borderRadius: '9999px', 
      textDecoration: 'none', 
      fontSize: 'clamp(0.8rem, 2.8vw, 0.9rem)', 
      fontWeight: '500', 
      color: '#c9d1d9', 
      border: '1px solid rgba(0,212,255,0.2)', 
      transition: 'all 0.3s ease', 
      boxShadow: '0 0 10px rgba(0,212,255,0.1)' 
    }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105">
      My IP
    </Link>
  </nav>
</header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="glass" style={{ marginTop: 'auto', padding: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)'  }}>
          Results are indicative only — advanced filtering may not be detected. • Multi-region proof coming in Phase 3
        </footer>
      </body>
    </html>
  );
}