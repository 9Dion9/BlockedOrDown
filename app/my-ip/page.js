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
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif', background: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.8em', color: '#ecf0f1' }}>What Is My IP Address?</h1>
      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0' }}>
        Your public IP, ISP, location, and connection details (no data stored).
      </p>
      <div style={{ background: '#1c1c1c', padding: '30px', borderRadius: '12px', margin: '40px 0', fontSize: '1.2em', lineHeight: '1.8', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        {loading && <p style={{ color: '#bdc3c7' }}>Loading your IP info...</p>}
        {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
        {ipData && (
          <>
            <p><strong>Main Public IP (what most sites see):</strong> <span style={{ color: '#2ecc71', fontSize: '1.3em' }}>{seenIPv4 || 'Loading...'}</span></p>
            {!hasUniqueIPv4 && seenIPv4 && <p style={{ color: '#f1c40f', fontSize: '1em', marginTop: '10px' }}>Your ISP uses shared/CGNAT IPv4 (common on German fiber connections like Glasfaser). This IP is shared among users.</p>}
            {seenIPv6 && <p><strong>Native IPv6 (unique & modern):</strong> <span style={{ color: '#3498db', fontSize: '1.1em' }}>{seenIPv6}</span> <br /><small>(Your connection uses IPv6 natively — faster and unique to your line)</small></p>}
            {!seenIPv6 && <p><strong>Native IPv6:</strong> Not detected</p>}
            <p><strong>Unique IPv4:</strong> {hasUniqueIPv4 ? ipData.ip : 'Not available (shared via CGNAT)'}</p>
            <p><strong>ISP:</strong> {ipData.org || 'N/A'}</p>
            <p><strong>Location:</strong> {ipData.city ? `${ipData.city}, ${ipData.region}, ${ipData.country_name}` : 'N/A'}</p>
            <p><strong>Connection Type:</strong> {ipData.org?.toLowerCase().includes('mobile') ? 'Likely mobile' : 'Likely residential/fiber'}</p>
          </>
        )}
        <div style={{ 
  margin: '50px 0', 
  padding: '30px', 
  background: '#1c1c1c', 
  borderRadius: '12px', 
  minHeight: '280px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  border: '2px dashed #444',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
}}>
  <p style={{ color: '#95a5a6', fontSize: '1.1em', textAlign: 'center' }}>
    Ad Placeholder (AdSense ready — 300×250 or responsive)<br />
    Coming soon — high RPM spot!
  </p>
</div>
      </div>
      <p style={{ color: '#95a5a6', fontSize: '0.9em' }}>
        Data from free public APIs (ipapi.co + ipify.org). Matches what most "what's my IP" sites show.
      </p>
    </div>
  );
}