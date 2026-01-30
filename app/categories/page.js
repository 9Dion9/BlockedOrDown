'use client';

import Link from 'next/link';

export default function CategoriesPage() {
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
        Quick Scan Categories
      </h1>

      <p style={{ fontSize: '1.3em', color: '#bdc3c7', margin: '20px 0 40px 0' }}>
        Choose a category to scan popular sites and see what's blocked on your network (work/school/firewall).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Link 
          href="/categories/social-media"
          style={{ 
            padding: '30px', 
            background: '#1c1c1c', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#bdc3c7', 
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            border: '1px solid #333', 
            cursor: 'pointer', 
            transition: 'background 0.2s' 
          }}
        >
          Social Media
        </Link>
        <Link 
          href="/categories/ai"
          style={{ 
            padding: '30px', 
            background: '#1c1c1c', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#bdc3c7', 
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            border: '1px solid #333', 
            cursor: 'pointer', 
            transition: 'background 0.2s' 
          }}
        >
          AI Tools
        </Link>
        <Link 
          href="/categories/streaming"
          style={{ 
            padding: '30px', 
            background: '#1c1c1c', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#bdc3c7', 
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            border: '1px solid #333', 
            cursor: 'pointer', 
            transition: 'background 0.2s' 
          }}
        >
          Streaming
        </Link>
        <Link 
          href="/categories/gaming"
          style={{ 
            padding: '30px', 
            background: '#1c1c1c', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            color: '#bdc3c7', 
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            border: '1px solid #333', 
            cursor: 'pointer', 
            transition: 'background 0.2s' 
          }}
        >
          Gaming
        </Link>
      </div>

      <p style={{ marginTop: '60px', color: '#95a5a6', fontSize: '0.9em' }}>
        Scans are client-side only — fast and private. Results indicative, depend on your internet speed.
      </p>

      <p style={{ marginTop: '40px' }}>
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