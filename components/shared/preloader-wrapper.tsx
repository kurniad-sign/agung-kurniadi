'use client';

import { useState } from 'react';
import gsap from 'gsap';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';

import { Preloader } from './preloader';

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loader, setLoader] = useState(false);
  const [timeline, setTimeline] = useState<GSAPTimeline | null>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoader(true),
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  return <>{loader ? children : <Preloader timeline={timeline} />}</>;
}
