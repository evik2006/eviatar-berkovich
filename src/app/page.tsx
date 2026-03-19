'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  LayoutGroup,
} from 'framer-motion';
import Link from 'next/link';
import VideoModal from '@/components/VideoModal';
import ImageLightbox from '@/components/ImageLightbox';
import {
  type VideoItem,
  type StillItem,
  musicVideos,
  liveSessions,
  socialContent,
  coverArt,
  portraitsStills,
  personalProjectsStills,
  personalProjectVideos,
} from '@/data/projectsData';

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'VIDEO', anchor: 'video', sub: [
    { label: 'MUSIC VIDEOS', anchor: 'music-videos' },
    { label: 'LIVE SESSIONS', anchor: 'live-sessions' },
    { label: 'SOCIAL CONTENT', anchor: 'social-content' },
  ]},
  { label: 'STILLS', anchor: 'stills', sub: [
    { label: 'COVER ART', anchor: 'cover-art' },
    { label: 'PORTRAITS', anchor: 'portraits' },
  ]},
  { label: 'PERSONAL PROJECTS', anchor: 'personal-projects', sub: [] },
  { label: 'ABOUT', anchor: 'about', sub: [] },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scrollTo(anchor: string) {
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── VIDEO GRID ───────────────────────────────────────────────────────────────

function VideoGrid({ items, onSelect }: { items: VideoItem[]; onSelect: (item: VideoItem) => void }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="video-grid"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } },
          }}
          whileHover="hovered"
          onClick={() => onSelect(item)}
          onMouseEnter={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = true; window.dispatchEvent(new Event('cursor:enter')); }}
          onMouseLeave={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = false; window.dispatchEvent(new Event('cursor:leave')); }}
          style={{ position: 'relative', cursor: 'none', overflow: 'hidden', background: '#080808' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.thumb} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover', pointerEvents: 'none' }} />
          <motion.div
            variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '44px', height: '44px', border: '1px solid rgba(255,255,255,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid #fff', marginLeft: '3px' }} />
            </div>
          </motion.div>
          <motion.div
            variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
          >
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 400, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{item.artist} — {item.year}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── STILLS GRID ─────────────────────────────────────────────────────────────

function StillsGrid({ items, onSelect }: { items: StillItem[]; onSelect: (i: number) => void }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="stills-grid"
      style={{ columns: '3', columnGap: '12px' }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } },
          }}
          whileHover="hovered"
          onClick={() => onSelect(i)}
          onMouseEnter={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = true; window.dispatchEvent(new Event('cursor:enter')); }}
          onMouseLeave={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = false; window.dispatchEvent(new Event('cursor:leave')); }}
          style={{ position: 'relative', cursor: 'none', overflow: 'hidden', marginBottom: '12px', breakInside: 'avoid', background: '#080808' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
          <motion.div
            variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
          >
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 400, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.subtitle}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── SUB-SECTION LABEL ───────────────────────────────────────────────────────

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 300, letterSpacing: '0.28em', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px', textAlign: 'center' }}
    >
      {children}
    </motion.p>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '64px' }}
    >
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', color: '#FFFFFF', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#FFFFFF' }} />
    </motion.div>
  );
}

// ─── HOMEPAGE ────────────────────────────────────────────────────────────────


export default function HomePage() {
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Video modal
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePersonalVideo, setActivePersonalVideo] = useState<VideoItem | null>(null);

  // Image lightbox
  const [lbImages, setLbImages] = useState<StillItem[]>([]);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);

  const openLightbox = useCallback((images: StillItem[], index: number) => {
    setLbImages(images);
    setLbIndex(index);
    setLbOpen(true);
  }, []);

  // ── Hero video: force autoplay on mobile ──
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {/* blocked by browser policy */});
    };

    tryPlay();
    // Re-attempt on first touch (unlocks autoplay on some mobile browsers)
    document.addEventListener('touchstart', tryPlay, { once: true });
    // Re-attempt when tab becomes visible again
    const onVisibility = () => { if (document.visibilityState === 'visible') tryPlay(); };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Track scroll to switch nav mode
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      setIsSticky(v > window.innerHeight * 0.45);
    });
    return unsub;
  }, [scrollY]);

  // ── Parallax on hero video ──
  const rawHeroY = useTransform(scrollY, [0, 900], [0, -180]);
  const heroY = useSpring(rawHeroY, { stiffness: 55, damping: 22, restDelta: 0.001 });
  const rawHeroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroOpacity = useSpring(rawHeroOpacity, { stiffness: 55, damping: 22 });

  return (
    <main style={{ background: '#000000', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════════
          NAV — single LayoutGroup for FLIP animation between
          hero (centered) ↔ sticky (top-left)
      ═══════════════════════════════════════════════════════════ */}
      <LayoutGroup id="main-nav">

        {/* ── STICKY NAV (top-left, appears after hero scroll) ── */}
        <AnimatePresence>
          {isSticky && (
            <motion.nav
              key="sticky"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              style={{
                position: 'fixed', top: '28px', left: '32px', zIndex: 100,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Small logo */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
                style={{ marginBottom: '24px' }}
              >
                <a href="/" onClick={() => window.scrollTo(0, 0)} style={{ display: 'block', cursor: 'none' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo1.png" alt="Eviatar Berkovich" width={132} height={132} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
                </a>
              </motion.div>

              {navItems.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => item.sub.length > 0 && setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{ marginBottom: '10px' }}
                >
                  {/* Main label — layoutId enables FLIP from hero position */}
                  <motion.button
                    layoutId={`nav-label-${item.label}`}
                    onClick={() => scrollTo(item.anchor)}
                    style={{
                      fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 400,
                      letterSpacing: '0.22em', color: '#FFFFFF', textTransform: 'uppercase',
                      cursor: 'none', background: 'none', border: 'none', padding: '4px 0',
                      display: 'block', textAlign: 'left', whiteSpace: 'nowrap',
                      opacity: hoveredNav && hoveredNav !== item.label ? 0.35 : 1,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    {item.label}
                  </motion.button>

                  {/* Sub-items — in-flow, push siblings down on expand */}
                  <AnimatePresence initial={false}>
                    {hoveredNav === item.label && item.sub.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          {item.sub.map((sub, i) => (
                            <motion.div
                              key={sub.label}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.22, delay: i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                            >
                              <button
                                onClick={() => scrollTo(sub.anchor)}
                                style={{
                                  fontFamily: 'var(--font-heading)', fontSize: '9px', fontWeight: 300,
                                  letterSpacing: '0.16em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase',
                                  cursor: 'none', background: 'none', border: 'none',
                                  padding: '4px 0', textAlign: 'left', whiteSpace: 'nowrap',
                                  display: 'block', width: '100%',
                                  transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)'; }}
                              >
                                {sub.label}
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════ */}
        {/* Hero height slightly reduced so first section peeks below the fold */}
        <section id="hero" style={{ height: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Parallax video background */}
          <motion.div style={{ position: 'absolute', inset: 0, y: heroY, opacity: heroOpacity }}>
            <video
              ref={heroVideoRef}
              src="/animation-logo.mp4"
              autoPlay muted loop playsInline
              preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9, pointerEvents: 'none' }}
            />
          </motion.div>

          {/* Logo — fades out as sticky nav appears */}
          <motion.div
            animate={{ opacity: isSticky ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'fixed', top: '28px', left: '32px', zIndex: 50, pointerEvents: isSticky ? 'none' : 'auto' }}
          >
            <a href="/" onClick={() => window.scrollTo(0, 0)} style={{ display: 'block', cursor: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo1.png" alt="Eviatar Berkovich" width={156} height={156} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
            </a>
          </motion.div>

          {/* Centered hero nav — FLIP animates to sticky positions */}
          <AnimatePresence>
            {!isSticky && (
              <motion.nav
                key="hero-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                className="hero-nav"
              style={{ position: 'relative', zIndex: 5, display: 'flex', alignItems: 'center', gap: '56px' }}
              >
                {navItems.map((item) => {
                  const aboveCount = Math.ceil(item.sub.length / 2);
                  return (
                    <div
                      key={item.label}
                      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                      onMouseEnter={() => item.sub.length > 0 && setHoveredNav(item.label)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      {/* Above zone */}
                      <div className="hero-nav-sub-zone" style={{ height: '84px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <AnimatePresence>
                          {hoveredNav === item.label && item.sub.slice(0, aboveCount).map((sub, i) => (
                            <motion.div key={sub.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2, delay: i * 0.04, ease: [0.215, 0.61, 0.355, 1] }}>
                              <button onClick={() => scrollTo(sub.anchor)} style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', padding: '4px 0', whiteSpace: 'nowrap', cursor: 'none', background: 'none', border: 'none' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}>
                                {sub.label}
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Parent label — layoutId matches sticky nav for FLIP */}
                      <motion.button
                        layoutId={`nav-label-${item.label}`}
                        onClick={() => scrollTo(item.anchor)}
                        style={{
                          fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 400,
                          letterSpacing: '0.2em', color: '#FFFFFF', textTransform: 'uppercase',
                          cursor: 'none', whiteSpace: 'nowrap', padding: '4px 0',
                          opacity: hoveredNav && hoveredNav !== item.label ? 0.4 : 1,
                          transition: 'opacity 0.25s ease', background: 'none', border: 'none',
                        }}
                      >
                        {item.label}
                      </motion.button>

                      {/* Below zone */}
                      <div className="hero-nav-sub-zone" style={{ height: '84px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <AnimatePresence>
                          {hoveredNav === item.label && item.sub.slice(aboveCount).map((sub, i) => (
                            <motion.div key={sub.label} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, delay: i * 0.04, ease: [0.215, 0.61, 0.355, 1] }}>
                              <button onClick={() => scrollTo(sub.anchor)} style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', padding: '4px 0', whiteSpace: 'nowrap', cursor: 'none', background: 'none', border: 'none' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}>
                                {sub.label}
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))' }}
            />
          </motion.div>
        </section>

      </LayoutGroup>

      {/* ═══════════════════════════════════════════════════════════
          VIDEO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="video" className="content-section" style={{ padding: '128px 72px 96px', background: '#000000' }}>
        <SectionDivider label="VIDEO" />

        {/* Music Videos */}
        <div id="music-videos" style={{ marginBottom: '96px' }}>
          <SubLabel>Music Videos</SubLabel>
          <VideoGrid items={musicVideos} onSelect={setActiveVideo} />
        </div>

        {/* Live Sessions */}
        <div id="live-sessions" style={{ marginBottom: '96px' }}>
          <SubLabel>Live Sessions</SubLabel>
          <VideoGrid items={liveSessions} onSelect={setActiveVideo} />
        </div>

        {/* Social Content */}
        <div id="social-content">
          <SubLabel>Social Content</SubLabel>
          <VideoGrid items={socialContent} onSelect={setActiveVideo} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STILLS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="stills" className="content-section" style={{ padding: '128px 72px 96px', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <SectionDivider label="STILLS" />

        {/* Cover Art */}
        <div id="cover-art" style={{ marginBottom: '96px' }}>
          <SubLabel>Cover Art</SubLabel>
          <StillsGrid items={coverArt} onSelect={(i) => openLightbox(coverArt, i)} />
        </div>

        {/* Portraits */}
        <div id="portraits">
          <SubLabel>Portraits</SubLabel>
          <StillsGrid items={portraitsStills} onSelect={(i) => openLightbox(portraitsStills, i)} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PERSONAL PROJECTS
      ═══════════════════════════════════════════════════════════ */}
      <section id="personal-projects" className="content-section" style={{ padding: '128px 72px 96px', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <SubLabel>Personal Projects</SubLabel>
        {/* First 3 polaroids */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="pp-stills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}
        >
          {personalProjectsStills.slice(0, 3).map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } } }}
              whileHover="hovered"
              onClick={() => openLightbox(personalProjectsStills, i)}
              onMouseEnter={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = true; window.dispatchEvent(new Event('cursor:enter')); }}
              onMouseLeave={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = false; window.dispatchEvent(new Event('cursor:leave')); }}
              style={{ position: 'relative', cursor: 'none', overflow: 'hidden', background: '#080808' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
              <motion.div variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.subtitle}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="pp-videos-grid"
          style={{ columns: '3', columnGap: '12px', marginTop: '12px' }}
        >
          {personalProjectVideos.map((item) => (
            <motion.div
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } } }}
              whileHover="hovered"
              onClick={() => setActivePersonalVideo(item)}
              onMouseEnter={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = true; window.dispatchEvent(new Event('cursor:enter')); }}
              onMouseLeave={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = false; window.dispatchEvent(new Event('cursor:leave')); }}
              style={{ position: 'relative', cursor: 'none', overflow: 'hidden', marginBottom: '12px', breakInside: 'avoid', background: '#080808' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.thumb} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
              <motion.div
                variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ width: '44px', height: '44px', border: '1px solid rgba(255,255,255,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid #fff', marginLeft: '3px' }} />
                </div>
              </motion.div>
              <motion.div
                variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
              >
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.year}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Last 3 polaroids */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="pp-stills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}
        >
          {personalProjectsStills.slice(3).map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } } }}
              whileHover="hovered"
              onClick={() => openLightbox(personalProjectsStills, i + 3)}
              onMouseEnter={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = true; window.dispatchEvent(new Event('cursor:enter')); }}
              onMouseLeave={() => { (window as unknown as Record<string, unknown>).__cursorMediaHovered = false; window.dispatchEvent(new Event('cursor:leave')); }}
              style={{ position: 'relative', cursor: 'none', overflow: 'hidden', background: '#080808' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
              <motion.div variants={{ hovered: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.subtitle}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {activePersonalVideo && (
        <VideoModal
          src={activePersonalVideo.src}
          hlsSrc={activePersonalVideo.hlsSrc}
          title={activePersonalVideo.title}
          year={activePersonalVideo.year}
          onClose={() => setActivePersonalVideo(null)}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="content-section" style={{ padding: '128px 72px 128px', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <SubLabel>About</SubLabel>

        {/*
          3-child grid so we can reorder on mobile:
            desktop: [bio | image]   (image spans 2 rows)
                     [links| image]
            mobile:  bio → image → links  (single column, DOM order)
        */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>

          {/* 1 — Name + bio  (desktop: col 1, row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ gridColumn: 1, gridRow: 1, alignSelf: 'start' }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '6px' }}>
              EVIATAR<br />BERKOVICH
            </h2>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '44px' }}>
              Director &amp; Cinematographer
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: '440px' }}>
                Eviatar is a graduate of the Film Department at the Thelma Yellin High School of the Arts. At the age of 17, he launched his first independent live-session project. Since then, he has filmed and directed music videos for artists such as iogi, Gon Ben Ari, Maayan Linik, Daniel Rubin, and more. In 2024, he published his debut art book, featuring photography and texts in collaboration with various musicians. The book was celebrated with a special launch event at Beit Romano in Tel Aviv.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: '440px' }}>
                Eviatar's work is defined by an intimate, minimalist, and highly aesthetic perspective, seeking out the simple, inherent beauty in every space, location, and face.<br />
                Today, he continues to create projects that capture his unique visual perspective on the Israeli music scene.
              </p>
            </div>
          </motion.div>

          {/* 2 — Portrait  (desktop: col 2, rows 1–2; mobile: between bio and links) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ gridColumn: 2, gridRow: '1 / 3', position: 'relative', overflow: 'hidden', alignSelf: 'start' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://Eviatarstills2006.b-cdn.net/about/DSC04516.jpg" alt="Eviatar Berkovich" loading="lazy" decoding="async" style={{ width: '100%', display: 'block', filter: 'contrast(1.05) brightness(0.9)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 40%)', pointerEvents: 'none' }} />
          </motion.div>

          {/* 3 — Contact links  (desktop: col 1, row 2; mobile: after image) */}
          <div style={{ gridColumn: 1, gridRow: 2, alignSelf: 'start' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '36px', marginTop: '44px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'EMAIL', value: 'dodly1111@gmail.com', href: 'mailto:dodly1111@gmail.com' },
                { label: 'INSTAGRAM', value: '@eviatar_2006', href: 'https://www.instagram.com/eviatar_2006/' },
                { label: 'BASED IN', value: 'Tel Aviv, Israel', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', fontWeight: 400, letterSpacing: '0.2em', color: '#FFFFFF', textTransform: 'uppercase', minWidth: '76px' }}>
                    {label}
                  </span>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', cursor: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════════════════════ */}
      {activeVideo && (
        <VideoModal
          src={activeVideo.src}
          hlsSrc={activeVideo.hlsSrc}
          title={`${activeVideo.title} — ${activeVideo.artist}`}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <AnimatePresence>
        {lbOpen && (
          <ImageLightbox
            images={lbImages}
            currentIndex={lbIndex}
            onClose={() => setLbOpen(false)}
            onNavigate={setLbIndex}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
