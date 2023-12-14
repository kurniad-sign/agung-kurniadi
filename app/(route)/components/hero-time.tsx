'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType, { TargetElement } from 'split-type';

import { useDate } from '@/hooks/use-date';
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { revealTextAnimation } from '@/lib/animation/reveal-text';

export function HeroTime() {
  const [isMounted, setIsMounted] = useState(false);
  const { date, time } = useDate();
  const dateRef = useRef<HTMLParagraphElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  useIsomorphicLayoutEffect(() => {
    const textSplitted = new SplitType(
      [dateRef.current, timeRef.current] as TargetElement,
      {
        types: 'words',
      }
    );
    const textSplitWord = new SplitType(textSplitted.words as TargetElement, {
      types: 'words',
    });

    const context = gsap.context(() => {
      const tl = gsap.timeline();

      tl.add(revealTextAnimation(textSplitWord.words), '+=0.5');
    });

    return () => context.revert();
  }, []);

  // if (!isMounted) return null;

  return (
    <div className="hero__time">
      <p ref={dateRef} data-animation="text-reveal">
        {date}
      </p>
      <p ref={timeRef} data-animation="text-reveal">
        Local Time: {time}
      </p>
    </div>
  );
}
