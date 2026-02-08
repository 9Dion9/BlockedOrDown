export const runtime = 'edge';
import Link from 'next/link';
export default function AboutPage() {
  return (
    <div style={{
      padding: '100px 20px 80px',
      margin: '0',
      textAlign: 'center',
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
        textShadow: '0 0 50px rgba(0,212,255,0.6)'
      }}>
        About BlockedOrDown
      </h1>
      <p style={{ fontSize: '1.4rem', color: '#c9d1d9', marginBottom: '40px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        BlockedOrDown is a free tool to check if websites are down globally or blocked on your network (work, school, ISP). We use multi-region server checks + client-side detection for accurate results. Privacy-first — no logs, no tracking.
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
  );
}