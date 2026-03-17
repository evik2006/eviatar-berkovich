'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hls from 'hls.js';
import Link from 'next/link';

interface VideoModalProps {
  src?: string;
  hlsSrc?: string;
  title: string;
  year?: string;
  onClose: () => void;
}

export default function VideoModal({ src = '', hlsSrc, title, year, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // ── HLS attachment ──────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    video.src = '';
    video.load();

    const streamUrl = hlsSrc || src;
    if (!streamUrl) return;

    if (hlsSrc) {
      if (Hls.isSupported()) {
        const hls = new Hls({ startLevel: -1, enableWorker: true });
        hlsRef.current = hls;
        hls.loadSource(hlsSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {/* autoplay may be blocked */});
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari — native HLS
        video.src = hlsSrc;
        video.play().catch(() => {});
      }
    } else if (src) {
      video.src = src;
      video.play().catch(() => {});
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [hlsSrc, src]);

  // ── Keyboard / scroll lock ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.96)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
        }}
      >
        {/* Logo — links to landing page */}
        <a
          href="/"
          onClick={(e) => { e.stopPropagation(); window.scrollTo(0, 0); }}
          style={{ position: 'absolute', top: '24px', left: '32px', zIndex: 20, display: 'block', lineHeight: 0, cursor: 'none' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo1.png"
            alt="Home"
            style={{ width: '132px', height: 'auto', opacity: 0.7, transition: 'opacity 0.2s ease', pointerEvents: 'none' }}
          />
        </a>

        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '32px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-heading)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'none',
            padding: '8px',
            zIndex: 20,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
        >
          CLOSE
        </button>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: '82vw', maxWidth: '1100px', aspectRatio: '16/9', background: '#000' }}
        >
          <video
            ref={videoRef}
            controls
            playsInline
            style={{ width: '100%', height: '100%', display: 'block', outline: 'none' }}
          />
        </motion.div>

        {/* Title + year */}
        {title && (
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              {title}
            </p>
            {year && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.2)' }}>
                {year}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
