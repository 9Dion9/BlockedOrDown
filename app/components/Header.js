'use client';

import Link from 'next/link';
import { useTheme } from '../ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ 
      background: '#111111', 
      padding: '12px 20px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.6)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      borderBottom: '1px solid #222' 
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '12px' 
      }}>
        {/* Logo – Top Left */}
        <Link href="/" style={{ 
          textDecoration: 'none', 
          fontSize: '1.6em', 
          fontWeight: 'bold', 
          color: '#0A84FF', 
          letterSpacing: '-0.5px' 
        }}>
          BlockedOrDown
        </Link>

        {/* Centered Navigation Buttons – smaller */}
        <nav style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap', 
          justifyContent: 'center' 
        }}>
          <Link 
            href="/" 
            style={{ 
              padding: '8px 16px', 
              background: '#1c1c1c', 
              color: '#ecf0f1', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontSize: '0.95em', 
              fontWeight: '500', 
              border: '1px solid #222222', 
              transition: 'all 0.2s ease' 
            }}
          >
            Home
          </Link>
          <Link 
            href="/categories" 
            style={{ 
              padding: '8px 16px', 
              background: '#1c1c1c', 
              color: '#ecf0f1', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontSize: '0.95em', 
              fontWeight: '500', 
              border: '1px solid #222222', 
              transition: 'all 0.2s ease' 
            }}
          >
            Categories
          </Link>
          <Link 
            href="/outages" 
            style={{ 
              padding: '8px 16px', 
              background: '#1c1c1c', 
              color: '#ecf0f1', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontSize: '0.95em', 
              fontWeight: '500', 
              border: '1px solid #222222', 
              transition: 'all 0.2s ease' 
            }}
          >
            Outages
          </Link>
          <Link 
            href="/my-ip" 
            style={{ 
              padding: '8px 16px', 
              background: '#1c1c1c', 
              color: '#ecf0f1', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontSize: '0.95em', 
              fontWeight: '500', 
              border: '1px solid #222222', 
              transition: 'all 0.2s ease' 
            }}
          >
            My IP
          </Link>
        </nav>

        {/* Theme Toggle – Top Right */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          className="hover:bg-gray-800"
        >
          {theme === 'dark' ? (
            // Sun icon (click to switch to light)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Moon icon (click to switch to dark)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}