import Link from 'next/link';

export default function Impressum() {
  return (
    <div style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)',
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
        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 'clamp(24px, 5vw, 40px)',
        textShadow: '0 0 50px rgba(0,212,255,0.6)',
        textAlign: 'center'
      }}>
        Impressum
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          <strong>Angaben gemäß § 5 DDG</strong>
        </p>

        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          Dion Technologies<br />
          Musterstraße 1<br />
          33100 Paderborn<br />
          Deutschland
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>Kontakt</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          E-Mail: <a href="mailto:impressum@blockedordown.com" style={{ color: '#00d4ff', textDecoration: 'underline' }}>impressum@blockedordown.com</a><br />
          Telefon: +49 123 4567890
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>Haftungsausschluss</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Haftungsansprüche gegen den Betreiber wegen materieller oder immaterieller Schäden, die aus der Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Betreibers kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
        </p>

        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px', textAlign: 'center' }}>
          Dies ist ein Platzhalter-Impressum für die Entwicklung. Es wird vor Livegang durch echte Angaben ersetzt.
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