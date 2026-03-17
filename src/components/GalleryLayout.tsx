'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    label: 'VIDEO',
    href: '/video/music-videos' as string | null,
    sub: [
      { label: 'MUSIC VIDEOS', href: '/video/music-videos' },
      { label: 'LIVE SESSIONS', href: '/video/live-sessions' },
      { label: 'SOCIAL CONTENT', href: '/video/social-content' },
    ],
  },
  {
    label: 'STILLS',
    href: '/stills/cover-art' as string | null,
    sub: [
      { label: 'COVER ART', href: '/stills/cover-art' },
      { label: 'PORTRAITS', href: '/stills/portraits' },
    ],
  },
  { label: 'PERSONAL PROJECTS', href: '/personal-projects' as string | null, sub: [] },
  { label: 'ABOUT', href: '/about' as string | null, sub: [] },
];

interface GalleryLayoutProps {
  children: React.ReactNode;
  activeHref?: string;
}

export default function GalleryLayout({ children, activeHref }: GalleryLayoutProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000000', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          flexShrink: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 24px 28px 28px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          style={{ display: 'block', marginBottom: '16px', cursor: 'none', position: 'relative', zIndex: 10 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo1.png"
            alt="Eviatar Berkovich"
            width={132}
            height={132}
            style={{ objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
          />
        </a>


        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => (
            <div key={item.label}>
              {item.sub.length === 0 ? (
                <Link
                  href={item.href!}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    color: activeHref === item.href ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    padding: '6px 0',
                    cursor: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = activeHref === item.href ? '#FFFFFF' : 'rgba(255,255,255,0.4)';
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  {/* Parent label navigates to first sub AND toggles expand */}
                  <Link
                    href={item.href!}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.12em',
                      color: item.sub.some(s => s.href === activeHref) ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase',
                      padding: '6px 0',
                      cursor: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => {
                      const isActive = item.sub.some(s => s.href === activeHref);
                      (e.currentTarget as HTMLElement).style.color = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)';
                    }}
                  >
                    {item.label}
                  </Link>

                  <AnimatePresence initial={false}>
                    {(expanded === item.label || item.sub.some(s => s.href === activeHref)) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{ overflow: 'hidden', paddingLeft: '12px' }}
                      >
                        {item.sub.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '10px',
                              fontWeight: 300,
                              letterSpacing: '0.1em',
                              color: activeHref === sub.href ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                              textTransform: 'uppercase',
                              padding: '4px 0',
                              cursor: 'none',
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = activeHref === sub.href ? '#FFFFFF' : 'rgba(255,255,255,0.3)';
                            }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}
