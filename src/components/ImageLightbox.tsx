'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxImage {
  src: string;
  title?: string;
  subtitle?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const prev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const next = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const current = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.97)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
      }}
    >
      {/* Logo — links to homepage */}
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

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '32px',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'none',
          padding: '8px',
          zIndex: 10,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
      >
        CLOSE
      </button>

      {/* Counter */}
      <p
        style={{
          position: 'absolute',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          zIndex: 10,
        }}
      >
        {currentIndex + 1} / {images.length}
      </p>

      {/* Prev arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: 'absolute',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'none',
          padding: '16px',
          zIndex: 10,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
      >
        ←
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'none',
          padding: '16px',
          zIndex: 10,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
      >
        →
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '88vw',
            maxHeight: '82vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.title || ''}
            style={{
              maxWidth: '100%',
              maxHeight: '82vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      {current.title && (
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {current.title}
            {current.subtitle && (
              <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: '12px' }}>
                {current.subtitle}
              </span>
            )}
          </p>
        </div>
      )}
    </motion.div>
  );
}
