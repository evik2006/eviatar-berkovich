'use client';

import { useEffect, useRef } from 'react';

const MOVE_FRAMES = ['/cursor1.png', '/cursor2.png', '/cursor3.png', '/cursor2.png'];
const HOVER_FRAME = '/cursor-hover.png';
const ALL_FRAMES = [...MOVE_FRAMES, HOVER_FRAME];
const UNIQUE_FRAMES = ['/cursor1.png', '/cursor2.png', '/cursor3.png', HOVER_FRAME];

const FRAME_INTERVAL = 110;
const STOP_DELAY = 180;

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Map frame src → img element index in UNIQUE_FRAMES
    const srcToIdx: Record<string, number> = {};
    UNIQUE_FRAMES.forEach((src, i) => { srcToIdx[src] = i; });

    const showFrame = (src: string) => {
      UNIQUE_FRAMES.forEach((s, i) => {
        const img = imgRefs.current[i];
        if (img) img.style.opacity = s === src ? '1' : '0';
      });
    };

    let targetX = -200, targetY = -200;
    let currentX = -200, currentY = -200;
    let velX = 0, velY = 0;
    let prevX = -200, prevY = -200;
    let rotation = 0;
    let rafId: number;

    let frameIndex = 0;
    let frameTimerId: ReturnType<typeof setTimeout> | null = null;
    let stopTimerId: ReturnType<typeof setTimeout> | null = null;
    let leaveTimerId: ReturnType<typeof setTimeout> | null = null;
    let isHovered = false;
    let isAnimating = false;

    // Show initial frame
    showFrame(MOVE_FRAMES[0]);

    const startFrameLoop = () => {
      if (isAnimating || isHovered) return;
      isAnimating = true;
      const tick = () => {
        if (isHovered || !isAnimating) { isAnimating = false; return; }
        frameIndex = (frameIndex + 1) % MOVE_FRAMES.length;
        showFrame(MOVE_FRAMES[frameIndex]);
        frameTimerId = setTimeout(tick, FRAME_INTERVAL);
      };
      frameTimerId = setTimeout(tick, FRAME_INTERVAL);
    };

    const stopFrameLoop = () => {
      isAnimating = false;
      if (frameTimerId) { clearTimeout(frameTimerId); frameTimerId = null; }
      frameIndex = 0;
      if (!isHovered) showFrame(MOVE_FRAMES[0]);
    };

    const applyHover = (val: boolean) => {
      if (val === isHovered) return;
      isHovered = val;
      if (val) {
        stopFrameLoop();
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

    const onMouseMove = (e: MouseEvent) => {
      velX = e.clientX - prevX;
      velY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetX = e.clientX;
      targetY = e.clientY;

      const el = (e.target as HTMLElement).closest('a, button');
      if (el) {
        if (leaveTimerId) { clearTimeout(leaveTimerId); leaveTimerId = null; }
        applyHover(true);
      } else if (!(window as unknown as Record<string, unknown>).__cursorMediaHovered) {
        if (leaveTimerId) clearTimeout(leaveTimerId);
        leaveTimerId = setTimeout(() => applyHover(false), 40);
      }

      if (!isHovered) startFrameLoop();
      if (stopTimerId) clearTimeout(stopTimerId);
      stopTimerId = setTimeout(stopFrameLoop, STOP_DELAY);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      const targetRotation = Math.max(-18, Math.min(18, velX * 1.4));
      rotation += (targetRotation - rotation) * 0.1;
      velX *= 0.82;
      velY *= 0.82;
      wrapper.style.left = `${currentX}px`;
      wrapper.style.top = `${currentY}px`;
      wrapper.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('cursor:enter', onCursorEnter);
    window.addEventListener('cursor:leave', onCursorLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('cursor:enter', onCursorEnter);
      window.removeEventListener('cursor:leave', onCursorLeave);
      cancelAnimationFrame(rafId);
      if (frameTimerId) clearTimeout(frameTimerId);
      if (stopTimerId) clearTimeout(stopTimerId);
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
