'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'VIDEO',
    href: null,
    sub: [
      { label: 'MUSIC VIDEOS', href: '/video/music-videos' },
      { label: 'LIVE SESSIONS', href: '/video/live-sessions' },
      { label: 'SOCIAL CONTENT', href: '/video/social-content' },
    ],
  },
  {
    label: 'STILLS',
    href: null,
    sub: [
      { label: 'COVER ART', href: '/stills/cover-art' },
      { label: 'PORTRAITS', href: '/stills/portraits' },
    ],
  },
  { label: 'PERSONAL PROJECTS', href: '/personal-projects', sub: [] },
  { label: 'ABOUT', href: '/about', sub: [] },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', cursor: 'none' }}>
        <Image
          src="/logo1.png"
          alt="Eviatar Berkovich"
          width={44}
          height={44}
          style={{ objectFit: 'contain' }}
        />
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {navLinks.map((item) => (
          <div
            key={item.label}
            style={{ position: 'relative' }}
            onMouseEnter={() => item.sub.length > 0 && setOpenMenu(item.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s ease',
                  cursor: 'none',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  transition: 'opacity 0.2s ease',
                  padding: 0,
                  opacity: openMenu === item.label ? 1 : undefined,
                }}
              >
                {item.label}
              </button>
            )}

            {/* Dropdown */}
            <AnimatePresence>
              {openMenu === item.label && item.sub.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '12px',
                    background: 'rgba(0,0,0,0.96)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: '10px 0',
                    minWidth: '160px',
                  }}
                >
                  {item.sub.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      style={{
                        display: 'block',
                        padding: '8px 20px',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '10px',
                        fontWeight: 400,
                        letterSpacing: '0.12em',
                        color: 'rgba(255,255,255,0.5)',
                        textTransform: 'uppercase',
                        transition: 'color 0.2s ease',
                        cursor: 'none',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
}
