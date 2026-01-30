'use client';

import Link from 'next/link';

export default function ClientStatusContent({ site, siteName }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${siteName} down right now?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Use the checker on this page — it tests reachability from your network and our global probe. Results update live.`
        }
      },
      {
        "@type": "Question",
        "name": `Why is ${siteName} blocked at work or school?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Workplaces and schools often block ${siteName} and similar sites using firewalls, DNS filtering, or proxy rules to improve focus, reduce bandwidth usage, or comply with policies.`
        }
      },
      {
        "@type": "Question",
        "name": `How accurate is the ${siteName} status check?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `High accuracy for common outages and blocks. Some advanced filtering (SSL inspection, content-based) may not be detected — results are indicative only. Try direct access or VPN if unsure.`
        }
      }
    ]
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
      <h1 style={{ fontSize: '2.8em', color: '#ecf0f1' }}>
        Is {siteName} Down or Blocked?
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0' }}>
        Check if {siteName} is down globally or blocked on your network (work/school/firewall).
      </p>

      <p style={{ fontSize: '1.1em', color: '#95a5a6', margin: '10px 0' }}>
        Quick test for {siteName} below — or use the full checker.
      </p>

      <div style={{ margin: '40px 0' }}>
        <button 
          onClick={() => window.location.href = `/?url=${site}.com`}
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            background: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Check {siteName} Now
        </button>
      </div>

      <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected. Confidence based on checks.
      </p>

      <section style={{ marginTop: '60px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8em', color: '#ecf0f1' }}>
          Frequently Asked Questions about {siteName}
        </h2>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: '#1c1c1c', 
          borderRadius: '8px', 
          border: '1px solid #333' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#bdc3c7' }}>
            Is {siteName} down right now?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            Use the checker above — it tests reachability from your network and our global probe.
          </p>
        </details>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: '#1c1c1c', 
          borderRadius: '8px', 
          border: '1px solid #333' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#bdc3c7' }}>
            Why is {siteName} blocked at work or school?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            Workplaces and schools often block social media, streaming, or entertainment sites for productivity or bandwidth reasons using firewall, DNS filtering, or proxy rules.
          </p>
        </details>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: '#1c1c1c', 
          borderRadius: '8px', 
          border: '1px solid #333' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#bdc3c7' }}>
            How accurate is the check for {siteName}?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            High for common blocks/outages — medium for sophisticated filtering. Results are indicative; try direct access or VPN if unsure.
          </p>
        </details>
      </section>

      <p style={{ margin: '60px 0 20px', color: '#bdc3c7' }}>
        More specific checks for {siteName}:
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link 
          href={`/blocked-at-work/${site}`}
          style={{ padding: '12px 24px', background: '#e67e22', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '1.1em' }}
        >
          Blocked at Work?
        </Link>
        <Link 
          href={`/blocked-at-school/${site}`}
          style={{ padding: '12px 24px', background: '#8e44ad', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '1.1em' }}
        >
          Blocked at School?
        </Link>
      </div>

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
          Back to Homepage Checker
        </Link>
      </p>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </div>
  );
}