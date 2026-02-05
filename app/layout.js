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
    <header
      className="glass"
      style={{
        position: 'sticky',
        top: '20px',
        zIndex: 1000,
        margin: '0 auto',
        width: 'fit-content',
        minWidth: 'clamp(300px, 70vw, 600px)',
        maxWidth: 'clamp(600px, 90vw, 1200px)',
        borderRadius: '9999px',
        padding: '12px 24px',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 8px 32px rgba(0,212,255,0.25)',
        background: 'rgba(13,17,23,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(16px, 3vw, 32px)',
      }}
    >
      {/* Brand pill on full left */}
      <div
        style={{
          background: 'rgba(0,212,255,0.12)',
          borderRadius: '9999px',
          padding: '8px 20px',
          boxShadow: '0 0 20px rgba(0,212,255,0.3)',
          border: '1px solid rgba(0,212,255,0.3)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2rem)',
            fontWeight: 900,
            color: 'var(--accent-cyan)',
            textDecoration: 'none',
            textShadow: '0 0 20px var(--glow-cyan)',
          }}
        >
          BlockedOrDown.
        </Link>
      </div>

      {/* Nav buttons centered */}
      <nav
        style={{
          display: 'flex',
          gap: 'clamp(12px, 2.5vw, 16px)',
          justifyContent: 'center',
          flex: 1,
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          style={{
            padding: '8px 16px',
            background: 'transparent',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            fontWeight: 500,
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
            padding: '8px 16px',
            background: 'transparent',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            fontWeight: 500,
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
            padding: '8px 16px',
            background: 'transparent',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            fontWeight: 500,
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
            padding: '8px 16px',
            background: 'transparent',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            fontWeight: 500,
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