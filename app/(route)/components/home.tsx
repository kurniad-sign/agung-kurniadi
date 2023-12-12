'use client';

import { Asterisk } from 'lucide-react';

import { HomeQueryType } from '@/sanity/lib/types';

import { CallToAction } from './cta';
import { HeroTime } from './hero-time';
import { Project } from './project';
import { ScrollPanel } from './scroll-panel';
import { Skills } from './skills';

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  return (
    <main>
      <section className="section section--hero" id="section-hero">
        <div className="container">
          <header className="hero__header">
            <h1 className="hero__title">{hero.title}</h1>
          </header>
          <div className="hero__content">
            <p className="hero__description">{hero.description}</p>
            <HeroTime />
            <div className="hero__scroll">
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
