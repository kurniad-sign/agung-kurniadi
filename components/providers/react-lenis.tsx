'use client';

import { useEffect, useRef } from 'react';
import { LenisInstance, ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';

export function ReactLenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisInstance>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      autoRaf={false}
      root
      options={{
        lerp: 0.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
