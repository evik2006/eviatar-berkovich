'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '972533401482';
const WHATSAPP_MESSAGE = 'היי, הגעתי דרך האתר, אשמח לתאם שיחה כדי לקבל פרטים נוספים';
const EMAIL_ADDRESS = 'dodly1111@gmail.com';

interface WorkWithMeModalProps {
  onClose: () => void;
}

export default function WorkWithMeModal({ onClose }: WorkWithMeModalProps) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        padding: '24px',
      }}
    >
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

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0A0A0A',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '48px 40px',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400,
          letterSpacing: '0.05em', color: '#FFFFFF', textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          Work With Me
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 300,
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '32px',
        }}>
          Choose how you&apos;d like to get in touch
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              padding: '24px 12px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2z" />
              <path d="M8.5 8.7c.2-.4.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.9.1.1.1.3 0 .4-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.8 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1l1.9 1c.2.1.4.2.4.3.1.2.1.9-.2 1.4-.2.6-1.3 1.1-1.8 1.2-.5.1-1 .3-3.2-.7-2.6-1.1-4.3-3.8-4.5-4-.1-.2-1-1.4-1-2.7s.7-2 .9-2.3z" fill="none" />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', color: '#FFFFFF', textTransform: 'uppercase' }}>
              WhatsApp
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              padding: '24px 12px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', color: '#FFFFFF', textTransform: 'uppercase' }}>
              Email
            </span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
