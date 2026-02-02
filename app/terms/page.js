import Link from 'next/link';

export default function TermsPage() {
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
        Terms of Use
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          Welcome to BlockedOrDown. By using this website, you agree to the following terms:
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>1. Purpose and Accuracy</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', marginBottom: '16px' }}>
          BlockedOrDown provides indicative checks to determine if websites are down globally or blocked on your network. Results are based on automated server and client-side probes and are not guaranteed 100% accurate. Advanced filtering, regional restrictions, or temporary issues may affect results.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>2. No Liability</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', marginBottom: '16px' }}>
          We are not liable for any damages, losses, or consequences arising from use of this service, including but not limited to reliance on results, missed opportunities, or security issues. Use at your own risk.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>3. Privacy</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', marginBottom: '16px' }}>
          No personal data is collected or stored. Checks are anonymous. See our <Link href="/privacy" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Privacy Policy</Link> for details.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>4. Changes to Terms</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', marginBottom: '16px' }}>
          We may update these terms at any time. Continued use constitutes acceptance of changes. Last updated: February 01, 2026.
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