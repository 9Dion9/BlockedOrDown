'use client';

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
];

export default function CategoriesPage() {
  return (
    <div style={{
      padding: '120px 20px 100px',
      margin: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
    }}>
      {/* Title – glowing cyan/teal */}
      <h1 style={{
        fontSize: '4.2rem',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00d4ff, #3b82f6, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '32px',
        textShadow: '0 0 60px rgba(0,212,255,0.7), 0 0 120px rgba(59,130,246,0.5)'
      }}>
        Choose a Category
      </h1>

      <p style={{ fontSize: '1.6rem', color: '#c9d1d9', marginBottom: '64px' }}>
        Scan popular sites in each category to see what's blocked on your network.
      </p>

      {/* Category Cards – much smaller, compact, centered */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {categories.map((cat) => (
          <Link 
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            style={{ 
              padding: '24px 20px', // much smaller padding
              background: 'linear-gradient(135deg, #0d1117, #161b22)', 
              borderRadius: '16px', 
              textDecoration: 'none', 
              color: '#ffffff', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid rgba(0,212,255,0.2)', 
              transition: 'all 0.3s ease', 
              boxShadow: '0 8px 24px rgba(0,212,255,0.12)',
              minHeight: '180px', // compact height
              justifyContent: 'center'
            }}
            className="hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] hover:scale-105 hover:border-[rgba(0,212,255,0.5)]"
          >
            <div style={{ fontSize: '2.8rem' }}>
              {cat.icon}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#00d4ff' }}>
              {cat.title}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', textAlign: 'center' }}>
              {cat.description}
            </p>
          </Link>
        ))}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '64px' }}>
        Pick a category to scan popular sites for blocks on your network (work/school/firewall).
      </p>
    </div>
  );
}