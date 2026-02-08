'use client';
export const runtime = 'edge';
import Link from 'next/link';

const categories = [
  {
    title: 'Social Media Sites',
    description: 'Popular platforms for connecting, sharing, and scrolling',
    slug: 'social-media',
    icon: '🌐',
  },
  {
    title: 'AI Tools',
    description: 'Chatbots, image generators, writing assistants & more',
    slug: 'ai',
    icon: '🤖',
  },
  {
    title: 'Streaming Sites',
    description: 'Movies, series, live TV, music & video platforms',
    slug: 'streaming',
    icon: '📺',
  },
  {
    title: 'Gaming Platforms',
    description: 'Games, stores, launchers & online multiplayer hubs',
    slug: 'gaming',
    icon: '🎮',
  },
  {
    title: 'Finance & Crypto',
    description: 'Banks, wallets, exchanges, payment platforms & trading',
    slug: 'finance-crypto',
    icon: '💰',
  },
  {
    title: 'Shopping & E-commerce',
    description: 'Online stores, marketplaces, fashion & electronics shops',
    slug: 'shopping',
    icon: '🛒',
  },
];

export default function CategoriesPage() {
  return (
    <div style={{
      padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px) clamp(40px, 6vw, 80px)',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      minHeight: '100vh',
      background: 'transparent',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.18) 0%, transparent 45%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.14) 0%, transparent 55%),
        radial-gradient(circle at 80% 20%, rgba(154, 255, 206, 0.08) 0%, transparent 70%),
        url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cpath fill="none" stroke="%2300d4ff" stroke-width="0.5" stroke-opacity="0.03" d="M0 0H100M0 10H100M0 20H100M0 30H100M0 40H100M0 50H100M0 60H100M0 70H100M0 80H100M0 90H100M0 100H100M0 0V100M10 0V100M20 0V100M30 0V100M40 0V100M50 0V100M60 0V100M70 0V100M80 0V100M90 0V100M100 0V100"/%3E%3C/svg%3E'),
        linear-gradient(45deg, rgba(255,255,255,0.015) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.015) 75%, rgba(255,255,255,0.015)) 0 0 / 4px 4px
      `,
      backgroundSize: 'cover, cover, cover, 100px 100px, 4px 4px',
      backgroundPosition: '0% 50%, 100% 50%, 50% 50%, 0 0, 0 0',
      backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat, repeat',
      backgroundBlendMode: 'normal, normal, normal, normal, multiply'
    }}>
      {/* Smaller title */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        textShadow: '0 0 40px rgba(0,212,255,0.6)'
      }}>
        Choose a Category
      </h1>

      {/* Smaller description */}
      <p style={{ 
        fontSize: 'clamp(1rem, 2.8vw, 1.25rem)', 
        color: '#c9d1d9', 
        marginBottom: '32px' 
      }}>
        Scan popular sites in each category to see what's blocked on your network.
      </p>

      {/* Compact pill-shaped category cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', // slightly smaller min width
        gap: 'clamp(12px, 2vw, 20px)',
        maxWidth: 'clamp(560px, 90vw, 1000px)', // narrower max width
        margin: '0 auto'
      }}>
        {categories.map((cat) => (
          <Link 
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              padding: 'clamp(14px, 2.5vw, 18px) clamp(10px, 3vw, 16px)', // more compact horizontally
              background: 'rgba(13,17,23,0.75)',
              borderRadius: '9999px',
              border: '1px solid rgba(0,212,255,0.25)',
              boxShadow: '0 6px 24px rgba(0,212,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              minHeight: '120px',
              justifyContent: 'center'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,212,255,0.35)';
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,212,255,0.2)';
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
              }}
            >
              <div style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)' }}>
                {cat.icon}
              </div>
              <h2 style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                fontWeight: '700', 
                color: '#00d4ff',
                margin: 0 
              }}>
                {cat.title}
              </h2>
              <p style={{ 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                color: '#94a3b8', 
                textAlign: 'center',
                margin: 0,
                lineHeight: '1.3'
              }}>
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Smaller bottom note */}
      <p style={{ 
        color: '#94a3b8', 
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
        marginTop: '32px' 
      }}>
        Pick a category to scan popular sites for blocks on your network (work/school/firewall).
      </p>
    </div>
  );
}