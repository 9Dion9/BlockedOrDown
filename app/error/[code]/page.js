'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ErrorPage({ params }) {
  const { code } = params;
  const errorCode = code ? code.toUpperCase().replace(/-/g, '_') : 'ERROR!';

  const commonErrors = {
    'err_connection_timed_out': {
      title: 'ERR_CONNECTION_TIMED_OUT',
      description: 'Your browser couldn\'t connect to the server — timed out. Often caused by firewall, VPN, DNS issues, or site down.',
      fix: 'Try reloading, disable VPN/proxy, change DNS (8.8.8.8), or check if site is blocked/down.'
    },
    'err_name_not_resolved': {
      title: 'ERR_NAME_NOT_RESOLVED',
      description: 'DNS lookup failed — domain not found. Usually DNS server issue or site down.',
      fix: 'Change DNS (Google 8.8.8.8 / Cloudflare 1.1.1.1), flush DNS cache, or check site status.'
    },
    // Add more as needed
  };

  const errorInfo = commonErrors[errorCode.toLowerCase()] || {
    title: errorCode,
    description: 'Unknown error code — connection or browser issue.',
    fix: 'Refresh page, clear cache, disable extensions, or try another browser.'
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif', 
      background: '#000000', 
      color: '#ffffff', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.8em', color: '#70261e' }}>
        {errorInfo.title}
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0' }}>
        {errorInfo.description}
      </p>

      <div style={{ margin: '40px 0' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            background: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Back to Checker
        </button>
      </div>

      <h2 style={{ fontSize: '1.6em', color: '#ecf0f1', margin: '40px 0 20px' }}>
        Quick Fix Guide
      </h2>
      <p style={{ fontSize: '1.1em', color: '#95a5a6', marginBottom: '30px' }}>
        {errorInfo.fix}
      </p>

      <p style={{ color: '#95a5a6', fontSize: '0.9em' }}>
        Still stuck? Check if the site is down or blocked using the tool above.
      </p>

      <p style={{ marginTop: '50px' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.1em', 
            background: '#27ae60', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Back to Homepage
        </Link>
      </p>
    </div>
  );
}