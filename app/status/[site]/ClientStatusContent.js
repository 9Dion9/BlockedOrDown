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
        "name": `How accurate is the check for ${siteName}?`,
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
      background: 'var(--bg-primary)', 
      color: 'var(--text-primary)', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.4em', color: 'var(--text-primary)' }}>
        Is {siteName} Down or Blocked?
      </h1>

      <p style={{ fontSize: '1.2em', color: 'var(--text-secondary)', margin: '20px 0 10px' }}>
        Check if {siteName} is down globally or blocked on your network (work/school/firewall).
      </p>

      <p style={{ fontSize: '1.0em', color: 'var(--text-muted)', margin: '0 0 40px 0' }}>
        Quick test for {siteName} below — or use the full checker.
      </p>

      <div style={{ margin: '0 0 50px 0' }}>
        <button 
          onClick={() => window.location.href = `/?url=${site}.com`}
          style={{ 
            padding: '12px 32px', 
            fontSize: '1.1em', 
            background: 'var(--danger)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Check {siteName} Now
        </button>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.85em', margin: '0 0 60px 0' }}>
        Results are indicative only — advanced filtering may not be detected. Confidence based on checks.
      </p>

      <section style={{ margin: '0 0 60px 0', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.6em', color: 'var(--text-primary)', marginBottom: '20px' }}>
          Frequently Asked Questions about {siteName}
        </h2>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: 'var(--card-bg)', 
          borderRadius: '8px', 
          border: '1px solid var(--border)' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            Is {siteName} down right now?
          </summary>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Use the checker above — it tests reachability from your network and our global probe.
          </p>
        </details>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: 'var(--card-bg)', 
          borderRadius: '8px', 
          border: '1px solid var(--border)' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            Why is {siteName} blocked at work or school?
          </summary>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Workplaces and schools often block social media, streaming, or entertainment sites for productivity or bandwidth reasons using firewall, DNS filtering, or proxy rules.
          </p>
        </details>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: 'var(--card-bg)', 
          borderRadius: '8px', 
          border: '1px solid var(--border)' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            How accurate is the check for {siteName}?
          </summary>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            High for common blocks/outages — medium for sophisticated filtering. Results are indicative; try direct access or VPN if unsure.
          </p>
        </details>
      </section>

      <p style={{ margin: '60px 0 20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
        More specific checks for {siteName}:
      </p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px', 
        flexWrap: 'wrap', 
        margin: '0 0 60px 0' 
      }}>
        <Link 
          href={`/blocked-at-work/${site}`}
          style={{ 
            padding: '12px 24px', 
            background: '#e67e22', 
            color: 'white', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontSize: '1.0em',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
          Blocked at Work?
        </Link>
        <Link 
          href={`/blocked-at-school/${site}`}
          style={{ 
            padding: '12px 24px', 
            background: '#8e44ad', 
            color: 'white', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontSize: '1.0em',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
          Blocked at School?
        </Link>
      </div>

      {/* Ad Placeholder - Clean & Blended */}
      <div style={{ 
        margin: '0 0 60px 0', 
        padding: '30px', 
        background: 'var(--card-bg)', 
        borderRadius: '12px', 
        minHeight: '280px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        border: '2px dashed var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.0em', textAlign: 'center' }}>
          Ad Placeholder (AdSense ready — 300×250 or responsive)<br />
          Coming soon — high RPM spot!
        </p>
      </div>

      <p style={{ marginTop: '50px' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '12px 24px', 
            fontSize: '1.0em', 
            background: 'var(--success)', 
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