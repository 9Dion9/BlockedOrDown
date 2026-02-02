import Link from 'next/link';

export default function DatenschutzPage() {
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
        Datenschutzerklärung
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          Diese Datenschutzerklärung klärt über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb unseres Onlineangebotes auf. Wir nehmen den Schutz Ihrer Daten sehr ernst.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>Verantwortlicher</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          Dion Technologies<br />
          Musterstraße 1<br />
          33100 Paderborn<br />
          Deutschland<br />
          E-Mail: impressum@blockedordown.com
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>Verarbeitung personenbezogener Daten</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          Beim Besuch dieser Website werden keine personenbezogenen Daten gespeichert. IP-Adressen werden nur temporär für Funktionszwecke verarbeitet (z. B. Erreichbarkeitsprüfungen) und nicht gespeichert.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '24px' }}>
          Spätere Funktionen (z. B. Nutzerberichte, Werbung, Analytics) werden separat in dieser Erklärung ergänzt und nur mit Ihrer Einwilligung aktiviert.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', margin: '32px 0 16px 0' }}>Ihre Rechte</h2>
        <p style={{ fontSize: '1.1rem', color: '#c9d1d9', lineHeight: '1.8', marginBottom: '32px' }}>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Kontaktieren Sie uns hierzu gerne unter der oben genannten E-Mail.
        </p>

        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px', textAlign: 'center' }}>
          Dies ist ein Platzhalter für die Entwicklung. Vollständige Erklärung folgt vor Livegang.
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