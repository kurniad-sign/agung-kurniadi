'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const isTouchDevice = 'ontouchstart' in window;

  useEffect(() => {
    const cursor = cursorRef.current;

    if (isTouchDevice || !cursor) return;

    window.addEventListener('mousemove', (event) => {
      const { target, x, y } = event;
      if (target instanceof HTMLElement) {
        const isTargetLinkOrBtn =
          target.closest('a') || target.closest('button');
        gsap.to(cursor, {
          x: x + -5,
          y: y + -5,
          duration: 0.7,
          ease: 'power3',
          opacity: isTargetLinkOrBtn ? 0.6 : 1,
          transform: `scale(${isTargetLinkOrBtn ? 3.5 : 1})`,
        });
      }
    });

    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        duration: 0.7,
        opacity: 0,
      });
    });
  }, [isTouchDevice]);

  return <span className="c-cursor" ref={cursorRef} />;
}
