import './globals.css';

export const metadata = {
  title: 'BlockedOrDown',
  description: 'Check if a site is down or blocked',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>{children}</main>
        <footer style={{ padding: '20px', background: '#f0f0f0', textAlign: 'center', fontSize: '0.9em' }}>
          <a href="/impressum" style={{ margin: '0 15px', color: '#333', textDecoration: 'underline' }}>Impressum</a>
          <a href="/datenschutz" style={{ margin: '0 15px', color: '#333', textDecoration: 'underline' }}>Datenschutzerklärung</a>
        </footer>
      </body>
    </html>
  );
}