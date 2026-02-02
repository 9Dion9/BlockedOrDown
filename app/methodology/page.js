import Link from 'next/link';
export default function MethodologyPage() {
  return (
    <div style={{
      padding: '100px 20px 80px',
      margin: '0',
      textAlign: 'left',
      fontFamily: 'Arial, sans-serif',
      background: 'var(--bg-secondary)',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      overflowX: 'hidden'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '32px',
        textShadow: '0 0 50px rgba(0,212,255,0.6)',
        textAlign: 'center'
      }}>
        How BlockedOrDown Works
      </h1>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          We check websites using two independent methods for accuracy:
        </p>
        <ul style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px', paddingLeft: '20px' }}>
          <li><strong>Server-side probe</strong>: Our servers attempt to load the site from multiple global locations. If it fails, the site is likely down globally.</li>
          <li><strong>Client-side test</strong>: Your browser tries to load a resource from the site. If it fails while server succeeds, it may be blocked on your network (firewall, DNS, proxy).</li>
        </ul>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          Results combine both for confidence level. Green = up everywhere, Yellow = possible local block, Red = likely global down. We use public APIs (ipify, ipapi) for geo data — no personal info stored.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          Limitations: Advanced blocks (e.g., DPI) or very strict anti-bot measures may cause false results. Always test in your browser.
        </p>
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/" style={{ 
            padding: '14px 32px', 
            fontSize: '1.1em', 
            background: 'linear-gradient(90deg, #00d4ff, #3b82f6)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '9999px', 
            cursor: 'pointer', 
            boxShadow: '0 0 40px rgba(0,212,255,0.5)', 
            transition: 'all 0.3s ease'
          }} className="hover:shadow-[0_0_70px_rgba(0,212,255,0.7)] hover:scale-105">
            Back to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}