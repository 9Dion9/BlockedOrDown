'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlockedAtSchoolPage({ params }) {
  const resolvedParams = await params;
  const site = resolvedParams.site;

  const siteName = site 
    ? site.charAt(0).toUpperCase() + site.slice(1).replace(/-/g, ' ')
    : 'Site';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why is ${siteName} blocked at school?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Schools often block ${siteName} and similar sites to maintain focus, prevent distractions, comply with filtering laws (e.g., CIPA in the US), or reduce bandwidth usage during class time.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I check if ${siteName} is blocked at my school?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Use the quick check button below — it tests reachability from your network vs global. If global works but yours fails, it's likely blocked by school firewall/DNS/proxy.`
        }
      },
      {
        "@type": "Question",
        "name": `What can I do if ${siteName} is blocked at school?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Try a VPN (if allowed), mobile data, or wait until after school. Results are indicative — some blocks may not be detected. Always follow school rules.`
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
        Is {siteName} Blocked at School?
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0' }}>
        Test if {siteName} is blocked on your school network (firewall/proxy/DNS) or just down globally.
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
          Quick Check for {siteName} at School
        </button>
      </div>

      <p style={{ color: '#95a5a6', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected.
      </p>

      <section style={{ marginTop: '60px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8em', color: '#ecf0f1' }}>
          Frequently Asked Questions about {siteName} at School
        </h2>

        <details style={{ 
          margin: '15px 0', 
          padding: '15px', 
          background: '#1c1c1c', 
          borderRadius: '8px', 
          border: '1px solid #333' 
        }}>
          <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#bdc3c7' }}>
            Why is {siteName} blocked at school?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            Schools block social/streaming/entertainment sites to maintain focus, comply with filtering laws (e.g., CIPA), or reduce bandwidth during class time.
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
            How can I check if {siteName} is blocked at my school?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            Click the quick check button — it compares your network reachability to global. If global passes but yours fails, it's blocked.
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
            What can I do if {siteName} is blocked at school?
          </summary>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>
            Use a VPN (if allowed), mobile data, or wait until after school. Always follow school rules.
          </p>
        </details>
      </section>

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