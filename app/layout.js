import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'BlockedOrDown',
  description: 'Check if sites are down or blocked globally',
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          {/* Glass Header Pill */}
          <header
            className="glass"
            style={{
              position: 'sticky',
              top: '12px', // less top space on mobile
              zIndex: 1000,
              margin: '0 auto',
              width: 'fit-content', // shrink to content
              minWidth: 'clamp(280px, 85vw, 400px)', // mobile minimum
              maxWidth: 'clamp(600px, 90vw, 1200px)', // desktop max
              borderRadius: '9999px',
              padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 8px 32px rgba(0,212,255,0.25)',
              background: 'rgba(13,17,23,0.4)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(12px, 3vw, 24px)',
              flexWrap: 'wrap', // allow wrap on very small screens
            }}
          >
            {/* Brand pill on left */}
            <div
              style={{
                background: 'rgba(0,212,255,0.12)',
                borderRadius: '9999px',
                padding: 'clamp(6px, 2vw, 8px) clamp(16px, 4vw, 20px)',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                border: '1px solid rgba(0,212,255,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                  fontWeight: '900',
                  color: 'var(--accent-cyan)',
                  textDecoration: 'none',
                  textShadow: '0 0 20px var(--glow-cyan)',
                }}
              >
                BlockedOrDown
              </Link>
            </div>

            {/* Nav buttons centered */}
            <nav
              style={{
                display: 'flex',
                gap: 'clamp(8px, 2vw, 12px)',
                justifyContent: 'center',
                flex: 1,
                flexWrap: 'wrap',
                margin: '0 auto',
              }}
            >
              <Link
                href="/"
                style={{
                  padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                  background: 'transparent',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)',
                }}
                className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[var(--accent-cyan)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105"
              >
                Home
              </Link>
              <Link
                href="/categories"
                style={{
                  padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                  background: 'transparent',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)',
                }}
                className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[var(--accent-cyan)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105"
              >
                Categories
              </Link>
              <Link
                href="/outages"
                style={{
                  padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                  background: 'transparent',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)',
                }}
                className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[var(--accent-cyan)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105"
              >
                Outages
              </Link>
              <Link
                href="/my-ip"
                style={{
                  padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                  background: 'transparent',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 12px rgba(0,212,255,0.1)',
                }}
                className="hover:bg-[rgba(0,212,255,0.18)] hover:text-[var(--accent-cyan)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105"
              >
                My IP
              </Link>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer
            className="glass"
            style={{
              marginTop: 'auto',
              padding: '20px',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            Results are indicative only — advanced filtering may not be detected. • Multi-region proof coming in Phase 3
          </footer>
        </body>
      </html>
    </>
  );
}