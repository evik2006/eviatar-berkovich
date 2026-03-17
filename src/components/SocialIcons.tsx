'use client';

import { motion } from 'framer-motion';

export default function SocialIcons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '32px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        alignItems: 'flex-start',
      }}
    >
      {/* Instagram */}
      <a
        href="https://www.instagram.com/eviatar_2006/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          cursor: 'none',
          opacity: 0.35,
          transition: 'opacity 0.25s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.35'; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="#FFFFFF" stroke="none" />
        </svg>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', fontWeight: 300, letterSpacing: '0.22em', color: '#FFFFFF', textTransform: 'uppercase' }}>
          Instagram
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:dodly1111@gmail.com"
        title="Email"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          cursor: 'none',
          opacity: 0.35,
          transition: 'opacity 0.25s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.35'; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="2,4 12,13 22,4" />
        </svg>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '8px', fontWeight: 300, letterSpacing: '0.22em', color: '#FFFFFF', textTransform: 'uppercase' }}>
          Email
        </span>
      </a>
    </motion.div>
  );
}
