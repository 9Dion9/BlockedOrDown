'use client';

import { useState, useEffect } from 'react';

export default function MyIP() {
  const [ipData, setIpData] = useState(null);
  const [seenIPv4, setSeenIPv4] = useState('');
  const [seenIPv6, setSeenIPv6] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Main details from ipapi.co
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setIpData(data);

        // "What others see" IPv4 from ipify
        const ipv4Res = await fetch('https://api.ipify.org?format=json');
        const ipv4Data = await ipv4Res.json();
        setSeenIPv4(ipv4Data.ip || '');

        // Reliable IPv6 from ipify v6 endpoint
        try {
          const ipv6Res = await fetch('https://api6.ipify.org?format=json');
          const ipv6Data = await ipv6Res.json();
          setSeenIPv6(ipv6Data.ip || '');
        } catch {
          setSeenIPv6('');
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load IP info — try again or check connection.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasUniqueIPv4 = ipData?.ip && !ipData.ip.includes(':');

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif', 
      background: 'var(--bg-primary)', 
      color: 'var(--text-primary)', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.4em', color: 'var(--text-primary)' }}>
        What Is My IP Address?
      </h1>
      <p style={{ fontSize: '1.2em', color: 'var(--text-secondary)', margin: '20px 0' }}>
        Your public IP, ISP, location, and connection details (no data stored).
      </p>

      <div style={{ 
        background: 'var(--card-bg)', 
        padding: '30px', 
        borderRadius: '12px', 
        margin: '40px 0', 
        fontSize: '1.2em', 
        lineHeight: '1.8', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        border: '1px solid var(--border)' 
      }}>
        {loading && <p style={{ color: 'var(--text-secondary)' }}>Loading your IP info...</p>}
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        {ipData && (
          <>
            {/* Main Public IP */}
            <p style={{ fontSize: '1.4em', marginBottom: '20px' }}>
              <strong>Main Public IP (what most sites see):</strong>{' '}
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                {seenIPv4 || 'Loading...'}
              </span>
            </p>

            {/* IPv4 & IPv6 separated */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--text-primary)' }}>IPv4:</strong>
                <p style={{ fontSize: '1.1em', color: seenIPv4 ? 'var(--success)' : 'var(--text-muted)' }}>
                  {seenIPv4 || 'Not detected'}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--text-primary)' }}>IPv6:</strong>
                <p style={{ fontSize: '1.1em', color: seenIPv6 ? 'var(--success)' : 'var(--text-muted)' }}>
                  {seenIPv6 || 'Not detected'}
                </p>
              </div>
            </div>

            {/* Additional Info Box */}
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '10px', 
              marginTop: '20px', 
              border: '1px solid var(--border)' 
            }}>
              <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
                <strong>ISP:</strong> {ipData.org || 'N/A'}
              </p>
              <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
                <strong>Location:</strong> {ipData.city ? `${ipData.city}, ${ipData.region}, ${ipData.country_name}` : 'N/A'}
              </p>
              <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
                <strong>Connection Type:</strong> {ipData.org?.toLowerCase().includes('mobile') ? 'Likely mobile' : 'Likely residential/fiber'}
              </p>
            </div>

            {!hasUniqueIPv4 && seenIPv4 && (
              <p style={{ color: 'var(--warning)', fontSize: '1em', marginTop: '20px' }}>
                Your ISP uses shared/CGNAT IPv4 (common on German fiber connections like Glasfaser). This IP is shared among users.
              </p>
            )}
          </>
        )}
      </div>

      {/* Ad Placeholder */}
      <div style={{ 
        margin: '50px 0', 
        padding: '30px', 
        background: 'var(--card-bg)', 
        borderRadius: '12px', 
        minHeight: '280px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        border: '2px dashed var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1em', textAlign: 'center' }}>
          Ad Placeholder (AdSense ready — 300×250 or responsive)<br />
          Coming soon — high RPM spot!
        </p>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>
        Data from free public APIs (ipapi.co + ipify.org). Matches what most "what's my IP" sites show.
      </p>
    </div>
  );
}