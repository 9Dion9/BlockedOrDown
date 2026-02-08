'use client';
export const runtime = 'edge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ErrorPage({ params }) {
  const { code } = params;
  const errorCode = code ? code.toUpperCase().replace(/-/g, '_') : 'ERROR!';

  const commonErrors = {
    'err_connection_timed_out': {
      title: 'ERR_CONNECTION_TIMED_OUT',
      description: 'Your browser couldn\'t connect to the server — timed out. Often caused by firewall, VPN, DNS issues, or site down.',
      fix: 'Try reloading the page, disable VPN/proxy, change DNS to 8.8.8.8 or 1.1.1.1, flush DNS cache, or check if the site is blocked/down.'
    },
    'err_name_not_resolved': {
      title: 'ERR_NAME_NOT_RESOLVED',
      description: 'DNS lookup failed — domain not found. Usually DNS server issue, typo, or site down.',
      fix: 'Change DNS (Google 8.8.8.8 / Cloudflare 1.1.1.1), flush DNS cache (ipconfig /flushdns on Windows), check spelling, or use the checker above.'
    },
    'err_connection_refused': {
      title: 'ERR_CONNECTION_REFUSED',
      description: 'Server refused connection — often firewall, antivirus, or site not accepting connections.',
      fix: 'Disable antivirus/firewall temporarily, check if VPN is interfering, or test on mobile data.'
    },
    'err_cache_miss': {
      title: 'ERR_CACHE_MISS',
      description: 'Cache issue — browser couldn\'t retrieve from cache.',
      fix: 'Clear browser cache/cookies, disable extensions, or try incognito mode.'
    },
    'err_internet_disconnected': {
      title: 'ERR_INTERNET_DISCONNECTED',
      description: 'No internet connection detected.',
      fix: 'Check your Wi-Fi/mobile data, restart router, or test on another network.'
    },
  };

  const errorInfo = commonErrors[errorCode.toLowerCase()] || {
    title: errorCode || 'Unknown Error',
    description: 'Unknown or custom error code — connection or browser issue.',
    fix: 'Refresh page, clear cache, disable extensions, try another browser, or check site status with the tool above.'
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
      <h1 style={{ fontSize: '2.8em', color: '#e74c3c' }}>
        {errorInfo.title}
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0' }}>
        {errorInfo.description}
      </p>

      <h2 style={{ fontSize: '1.6em', color: '#ecf0f1', margin: '40px 0 20px' }}>
        Quick Fix Guide
      </h2>
      <p style={{ fontSize: '1.1em', color: '#95a5a6', marginBottom: '30px' }}>
        {errorInfo.fix}
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
          Back to Checker Tool
        </button>
      </div>
      <p style={{ color: '#95a5a6', fontSize: '0.9em' }}>
        Still stuck? Use the homepage checker to see if the site is down or blocked.
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