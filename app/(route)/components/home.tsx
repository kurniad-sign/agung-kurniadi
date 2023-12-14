'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { Asterisk } from 'lucide-react';
import SplitType, { TargetElement } from 'split-type';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { revealTextAnimation } from '@/lib/animation/reveal-text';
import { HomeQueryType } from '@/sanity/lib/types';

import { CallToAction } from './cta';
import { HeroTime } from './hero-time';
import { Project } from './project';
import { ScrollPanel } from './scroll-panel';
import { Skills } from './skills';

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const textSplitted = new SplitType(
      [titleRef.current, descriptionRef.current] as TargetElement,
      {
        types: 'words',
      }
    );
    const textSplitWord = new SplitType(textSplitted.words as TargetElement, {
      types: 'words',
    });

    const context = gsap.context(() => {
      const tl = gsap.timeline();

      tl.add(revealTextAnimation(textSplitWord.words), '+=0.5').add(
        tl.from(
          scrollRef.current,
          {
            alpha: 1,
            ease: 'power3',
            duration: 1,
          },
          '+=5'
        )
      );
    });

    return () => context.revert();
  }, []);

  return (
    <main>
      <section className="section section--hero" id="section-hero">
        <div className="container">
          <header className="hero__header">
            <h1
              ref={titleRef}
              className="hero__title"
              data-animation="text-reveal"
            >
              {hero.title}
            </h1>
          </header>
          <div className="hero__content">
            <p
              ref={descriptionRef}
              className="hero__description"
              data-animation="text-reveal"
            >
              {hero.description}
            </p>
            <HeroTime />
            <div className="hero__scroll" ref={scrollRef}>
              <div className="hero__scroll-text">
                <p>
                  {hero.scroll_text.split('').map((char, i) => (
                    <span key={i} style={{ transform: `rotate(${i * 15}deg)` }}>
                      {char}
                    </span>
                  ))}
                </p>
              </div>
              <div className="hero__scroll-icon">
                <Asterisk size={72} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollPanel {...about} />
      <Project {...project_list} />
      <Skills {...skills} />
      <CallToAction />
    </main>
  );
}
