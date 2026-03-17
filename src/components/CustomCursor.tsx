'use client';

import { useEffect, useRef } from 'react';

// Frames for the movement animation (ping-pong: 1→2→3→2→1→2→3...)
const MOVE_FRAMES = ['/cursor1.png', '/cursor2.png', '/cursor3.png', '/cursor2.png'];
const HOVER_FRAME = '/cursor-hover.png';
const FRAME_INTERVAL = 110; // ms per frame while moving
const STOP_DELAY = 180;    // ms of no movement before stopping animation

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let velX = 0;
    let velY = 0;
    let prevX = -200;
    let prevY = -200;
    let rotation = 0;
    let rafId: number;

    // Frame animation state
    let frameIndex = 0;
    let frameTimerId: ReturnType<typeof setTimeout> | null = null;
    let stopTimerId: ReturnType<typeof setTimeout> | null = null;
    let isHovered = false;
    let isAnimating = false;

    const startFrameLoop = () => {
      if (isAnimating || isHovered) return;
      isAnimating = true;

      const tick = () => {
        if (isHovered || !isAnimating) {
          isAnimating = false;
          return;
        }
        frameIndex = (frameIndex + 1) % MOVE_FRAMES.length;
        cursor.style.backgroundImage = `url(${MOVE_FRAMES[frameIndex]})`;
        frameTimerId = setTimeout(tick, FRAME_INTERVAL);
      };
      frameTimerId = setTimeout(tick, FRAME_INTERVAL);
    };

    const stopFrameLoop = () => {
      isAnimating = false;
      if (frameTimerId) { clearTimeout(frameTimerId); frameTimerId = null; }
      // Reset to first frame when stopped
      frameIndex = 0;
      if (!isHovered) {
        cursor.style.backgroundImage = `url(${MOVE_FRAMES[0]})`;
      }
    };

    const setHover = (val: boolean) => {
      if (val === isHovered) return;
      isHovered = val;
      if (val) {
        stopFrameLoop();
        cursor.style.backgroundImage = `url(${HOVER_FRAME})`;
        cursor.style.width = '60px';
        cursor.style.height = '52px';
      } else {
        cursor.style.backgroundImage = `url(${MOVE_FRAMES[frameIndex]})`;
        cursor.style.width = '64px';
        cursor.style.height = '56px';
      }
    };

    const onCursorEnter = () => setHover(true);
    const onCursorLeave = () => setHover(false);

    const onMouseMove = (e: MouseEvent) => {
      velX = e.clientX - prevX;
      velY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetX = e.clientX;
      targetY = e.clientY;

      // Detect hover state for standard interactive elements
      const el = (e.target as HTMLElement).closest('a, button');
      if (el) {
        setHover(true);
      } else if (!(window as unknown as Record<string, unknown>).__cursorMediaHovered) {
        setHover(false);
      }

      // Start animation on move (only when not hovered)
      if (!isHovered) startFrameLoop();

      // Schedule stop after movement ceases
      if (stopTimerId) clearTimeout(stopTimerId);
      stopTimerId = setTimeout(stopFrameLoop, STOP_DELAY);
    };

    const animate = () => {
      // Smooth follow with easing
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;

      // Tilt based on horizontal velocity, max ±18deg
      const targetRotation = Math.max(-18, Math.min(18, velX * 1.4));
      rotation += (targetRotation - rotation) * 0.1;

      // Decay velocity
      velX *= 0.82;
      velY *= 0.82;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

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
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '64px',
        height: '56px',
        backgroundImage: 'url(/cursor1.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, left, top',
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
    />
  );
}
