import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatePanel } from '@/lib/animation/panel-animation';

import { useIsomorphicLayoutEffect } from './use-isomorphic';

gsap.registerPlugin(ScrollTrigger);

const useScrollPanel = () => {
  const mainRef = useRef<HTMLElement>(null);
  const sectionAboutRef = useRef<HTMLElement>(null);
  const sectionColumnRef = useRef<HTMLDivElement>(null);
  const columnWrapRef = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: true,
        },
      });

      timeline.add(
        animatePanel({
          target: sectionColumnRef,
          triggerTarget: sectionAboutRef,
          endTarget: columnWrapRef,
        })
      );
    }, mainRef);

    return () => context.revert();
  }, []);

  return {
    mainRef,
    sectionColumnRef,
    sectionAboutRef,
    columnWrapRef,
  } as const;
};

export { useScrollPanel };
