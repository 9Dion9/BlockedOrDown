import './globals.css';
import Link from 'next/link';
import { ThemeProvider } from './ThemeProvider';

export const metadata = {
  title: 'BlockedOrDown',
  description: 'Check if sites are down globally or blocked on your network',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]" style={{ fontFamily: "'Inter var', 'Inter', system-ui, sans-serif" }}>
        {/* Top Navigation Bar */}
<header style={{ 
  background: 'rgba(13, 17, 23, 0.92)', 
  backdropFilter: 'blur(12px)',
  padding: '20px 16px 12px', 
  boxShadow: '0 4px 30px rgba(0,0,0,0.6)', 
  position: 'sticky', 
  top: 0, 
  zIndex: 1000, 
  borderBottom: '1px solid rgba(0, 212, 255, 0.15)' 
}}>
  <div style={{ 
    maxWidth: '1400px', 
    margin: '0 auto' 
  }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      flexWrap: 'wrap', 
      gap: '16px'
    }}>
      {/* Logo – left on desktop, centered on mobile */}
      <Link href="/" style={{ 
        textDecoration: 'none', 
        fontSize: '2.4rem', 
        fontWeight: '900', 
        color: '#00d4ff', 
        letterSpacing: '-1px', 
        textShadow: '0 0 30px rgba(0,212,255,0.7)', 
        transition: 'all 0.3s ease',
        alignSelf: 'flex-start' // left on desktop
      }} className="hover:text-[#3b82f6] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] md:self-start">
        BlockedOrDown
      </Link>

      {/* Nav Buttons – pill shape, perfectly centered */}
      <nav style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '12px',
        flex: '1 1 auto', 
        minWidth: '0'
      }}>
        <Link href="/" style={{ 
          padding: '10px 24px', 
          background: 'rgba(0,212,255,0.08)', 
          borderRadius: '9999px', 
          textDecoration: 'none', 
          fontSize: '0.95rem', 
          fontWeight: '600', 
          color: '#c9d1d9', 
          border: '1px solid rgba(0,212,255,0.25)', 
          transition: 'all 0.3s ease', 
          boxShadow: '0 0 15px rgba(0,212,255,0.1)', 
          whiteSpace: 'nowrap'
        }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105">
          Home
        </Link>
        <Link href="/categories" style={{ 
          padding: '10px 24px', 
          background: 'rgba(0,212,255,0.08)', 
          borderRadius: '9999px', 
          textDecoration: 'none', 
          fontSize: '0.95rem', 
          fontWeight: '600', 
          color: '#c9d1d9', 
          border: '1px solid rgba(0,212,255,0.25)', 
          transition: 'all 0.3s ease', 
          boxShadow: '0 0 15px rgba(0,212,255,0.1)', 
          whiteSpace: 'nowrap'
        }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105">
          Categories
        </Link>
        <Link href="/outages" style={{ 
          padding: '10px 24px', 
          background: 'rgba(0,212,255,0.08)', 
          borderRadius: '9999px', 
          textDecoration: 'none', 
          fontSize: '0.95rem', 
          fontWeight: '600', 
          color: '#c9d1d9', 
          border: '1px solid rgba(0,212,255,0.25)', 
          transition: 'all 0.3s ease', 
          boxShadow: '0 0 15px rgba(0,212,255,0.1)', 
          whiteSpace: 'nowrap'
        }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105">
          Outages
        </Link>
        <Link href="/my-ip" style={{ 
          padding: '10px 24px', 
          background: 'rgba(0,212,255,0.08)', 
          borderRadius: '9999px', 
          textDecoration: 'none', 
          fontSize: '0.95rem', 
          fontWeight: '600', 
          color: '#c9d1d9', 
          border: '1px solid rgba(0,212,255,0.25)', 
          transition: 'all 0.3s ease', 
          boxShadow: '0 0 15px rgba(0,212,255,0.1)', 
          whiteSpace: 'nowrap'
        }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105">
          My IP
        </Link>
      </nav>

      {/* Right spacer – balances logo on desktop only */}
      <div style={{ 
        minWidth: '220px', 
        display: 'none', 
        '@media (min-width: 768px)': { display: 'block' } 
      }} />
    </div>
  </div>
</header>

{/* Main Content */}
<main className="flex-1">
  {children}
</main>

{/* Footer */}
<footer style={{
  padding: '2px',
  background: 'var(--bg-secondary)',
  textAlign: 'center',
  fontSize: '0.7em',
  color: 'var(--text-muted)',
  borderTop: '1px solid var(--border)',
}}>
  <Link href="/impressum" style={{ color: 'var(--text-secondary)', margin: '0 12px', textDecoration: 'none' }}>
    Impressum
  </Link>
  <Link href="/datenschutz" style={{ color: 'var(--text-secondary)', margin: '0 12px', textDecoration: 'none' }}>
    Datenschutzerklärung
  </Link>
</footer>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          padding: '2px',
          background: 'var(--bg-secondary)',
          textAlign: 'center',
          fontSize: '0.7em',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border)',
        }}>
          <Link href="/impressum" style={{ color: 'var(--text-secondary)', margin: '0 12px', textDecoration: 'none' }}>
            Impressum
          </Link>
          <Link href="/datenschutz" style={{ color: 'var(--text-secondary)', margin: '0 12px', textDecoration: 'none' }}>
            Datenschutzerklärung
          </Link>
        </footer>
      </body>
    </html>
  );
}