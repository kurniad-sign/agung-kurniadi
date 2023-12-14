import { useEffect, useRef } from 'react';
import Image from 'next/image';
import LogoWhite from '@/public/images/logo-white.svg';
import SplitType, { TargetElement } from 'split-type';

import { revealLogoAnimation } from '@/lib/animation/reveal-logo';
import { revealTextAnimation } from '@/lib/animation/reveal-text';

export function Preloader({ timeline }: { timeline: GSAPTimeline | null }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quotesRef = useRef<HTMLQuoteElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textSplitted = new SplitType(
      [headingRef.current, quotesRef.current] as TargetElement,
      {
        types: 'words',
      }
    );
    const textSplitWord = new SplitType(textSplitted.words as TargetElement, {
      types: 'words',
    });

    timeline &&
      timeline
        .add(revealLogoAnimation(logoRef.current))
        .add(revealTextAnimation(textSplitWord.words), '-=0.5')
        .add(
          timeline.to(wrapperRef.current, {
            duration: 1,
            y: '-100%',
            ease: 'power3.in',
            delay: 1,
          })
        );
  }, [timeline]);

  return (
    <div className="c-preloader" ref={wrapperRef}>
      <div className="c-preloader__headline">
        <figure className="c-preloader__image">
          <Image src={LogoWhite} alt="Logo White" fill ref={logoRef} />
        </figure>
        <h1 ref={headingRef} data-animation="text-reveal">
          Agung Kurniadi
        </h1>
      </div>
      <div className="c-preloader__quotes">
        <blockquote ref={quotesRef} data-animation="text-reveal">
          &quot;If it meant to be, it will be&quot;
        </blockquote>
      </div>
    </div>
  );
}
