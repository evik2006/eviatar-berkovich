'use client';

import { useEffect, useRef } from 'react';

const MOVE_FRAMES = ['/cursor1.png', '/cursor2.png', '/cursor3.png', '/cursor2.png'];
const HOVER_FRAME = '/cursor-hover.png';
const UNIQUE_FRAMES = ['/cursor1.png', '/cursor2.png', '/cursor3.png', HOVER_FRAME];

const FRAME_INTERVAL = 110; // ms per animation frame
const STOP_DELAY = 180;     // ms of no movement before going idle

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Skip on touch / pointer-coarse devices (phones, tablets)
    if (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const showFrame = (src: string) => {
      UNIQUE_FRAMES.forEach((s, i) => {
        const img = imgRefs.current[i];
        if (img) img.style.opacity = s === src ? '1' : '0';
      });
    };

    // Position state
    let targetX = -200, targetY = -200;
    let currentX = -200, currentY = -200;
    let velX = 0, prevX = -200;
    let rotation = 0;

    // Frame state
    let frameIndex = 0;
    let lastFrameTime = 0;
    let isMoving = false;
    let isHovered = false;

    // Timers
    let stopMovingTimer: ReturnType<typeof setTimeout> | null = null;
    let leaveTimerId: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    showFrame(MOVE_FRAMES[0]);

    // ── Single RAF loop ───────────────────────────────────────────────────────
    const animate = (timestamp: number) => {
      // Smooth position lerp
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      const targetRot = Math.max(-18, Math.min(18, velX * 1.4));
      rotation += (targetRot - rotation) * 0.1;
      velX *= 0.82;

      wrapper.style.left = `${currentX}px`;
      wrapper.style.top = `${currentY}px`;
      wrapper.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

      // Frame cycling — only when not hovering
      if (!isHovered) {
        if (isMoving) {
          if (timestamp - lastFrameTime >= FRAME_INTERVAL) {
            frameIndex = (frameIndex + 1) % MOVE_FRAMES.length;
            showFrame(MOVE_FRAMES[frameIndex]);
            lastFrameTime = timestamp;
          }
        } else if (frameIndex !== 0) {
          // Idle: snap back to rest frame
          frameIndex = 0;
          showFrame(MOVE_FRAMES[0]);
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    // ── Hover helpers ─────────────────────────────────────────────────────────
    const applyHover = (val: boolean) => {
      if (val === isHovered) return;
      isHovered = val;
      if (val) {
        showFrame(HOVER_FRAME);
        wrapper.style.width = '60px';
        wrapper.style.height = '52px';
      } else {
        showFrame(MOVE_FRAMES[frameIndex]);
        wrapper.style.width = '64px';
        wrapper.style.height = '56px';
      }
    };

    const onCursorEnter = () => {
      if (leaveTimerId) { clearTimeout(leaveTimerId); leaveTimerId = null; }
      applyHover(true);
    };

    const onCursorLeave = () => {
      if (leaveTimerId) clearTimeout(leaveTimerId);
      leaveTimerId = setTimeout(() => applyHover(false), 40);
    };

    // ── Mouse move ────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      velX = e.clientX - prevX;
      prevX = e.clientX;
      targetX = e.clientX;
      targetY = e.clientY;

      // Hover detection
      const el = (e.target as HTMLElement).closest('a, button');
      if (el) {
        if (leaveTimerId) { clearTimeout(leaveTimerId); leaveTimerId = null; }
        applyHover(true);
      } else if (!(window as unknown as Record<string, unknown>).__cursorMediaHovered) {
        if (leaveTimerId) clearTimeout(leaveTimerId);
        leaveTimerId = setTimeout(() => applyHover(false), 40);
      }

      // Mark as moving; reset frame timer when transitioning from idle
      if (!isMoving) {
        isMoving = true;
        lastFrameTime = performance.now();
      }
      if (stopMovingTimer) clearTimeout(stopMovingTimer);
      stopMovingTimer = setTimeout(() => { isMoving = false; }, STOP_DELAY);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('cursor:enter', onCursorEnter);
    window.addEventListener('cursor:leave', onCursorLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('cursor:enter', onCursorEnter);
      window.removeEventListener('cursor:leave', onCursorLeave);
      if (stopMovingTimer) clearTimeout(stopMovingTimer);
      if (leaveTimerId) clearTimeout(leaveTimerId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '64px',
        height: '56px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, left, top',
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
    >
      {UNIQUE_FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          ref={el => { imgRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}
