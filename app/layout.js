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
      <head>
        <meta name="google-site-verification" content="PApjHSHNtuFdG6k75aPOS20mSIJ9gs1XEWYdCBXgSNo" />
        {/* Add any other <head> tags here if needed, like title, favicon, etc. */}
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]" style={{ fontFamily: "'Inter var', 'Inter', system-ui, sans-serif" }}>
        <header style={{ 
          background: 'rgba(13, 17, 23, 0.92)', 
          backdropFilter: 'blur(12px)',
          padding: '12px 16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)', 
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
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '8px' // smaller gap on mobile
            }}>
              {/* Logo – centered on mobile, left on desktop */}
              <Link href="/" style={{ 
                textDecoration: 'none', 
                fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', // responsive size
                fontWeight: '900', 
                color: '#00d4ff', 
                letterSpacing: '-1px', 
                textShadow: '0 0 20px rgba(0,212,255,0.7)', 
                transition: 'all 0.3s ease'
              }} className="hover:text-[#3b82f6] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] md:self-start md:ml-4">
                BlockedOrDown
              </Link>

              {/* Nav Buttons – pill shape, centered, smaller on mobile */}
              <nav style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '8px', // smaller gap
                width: '100%'
              }}>
                <Link href="/" style={{ 
                  padding: '8px 16px', 
                  background: 'rgba(0,212,255,0.08)', 
                  borderRadius: '9999px', 
                  textDecoration: 'none', 
                  fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', // smaller on mobile
                  fontWeight: '600', 
                  color: '#c9d1d9', 
                  border: '1px solid rgba(0,212,255,0.25)', 
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)', 
                  whiteSpace: 'nowrap'
                }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105">
                  Home
                </Link>
                <Link href="/categories" style={{ 
                  padding: '8px 16px', 
                  background: 'rgba(0,212,255,0.08)', 
                  borderRadius: '9999px', 
                  textDecoration: 'none', 
                  fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', 
                  fontWeight: '600', 
                  color: '#c9d1d9', 
                  border: '1px solid rgba(0,212,255,0.25)', 
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)', 
                  whiteSpace: 'nowrap'
                }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105">
                  Categories
                </Link>
                <Link href="/outages" style={{ 
                  padding: '8px 16px', 
                  background: 'rgba(0,212,255,0.08)', 
                  borderRadius: '9999px', 
                  textDecoration: 'none', 
                  fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', 
                  fontWeight: '600', 
                  color: '#c9d1d9', 
                  border: '1px solid rgba(0,212,255,0.25)', 
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)', 
                  whiteSpace: 'nowrap'
                }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105">
                  Outages
                </Link>
                <Link href="/my-ip" style={{ 
                  padding: '8px 16px', 
                  background: 'rgba(0,212,255,0.08)', 
                  borderRadius: '9999px', 
                  textDecoration: 'none', 
                  fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', 
                  fontWeight: '600', 
                  color: '#c9d1d9', 
                  border: '1px solid rgba(0,212,255,0.25)', 
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)', 
                  whiteSpace: 'nowrap'
                }} className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105">
                  My IP
                </Link>
              </nav>
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
      </body>
    </html>
  );
}