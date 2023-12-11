'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Asterisk } from 'lucide-react';

import { RunningText } from '@/components/shared/running-text';
import { useScrollPanel } from '@/hooks/use-scroll-animation';
import { HomeQueryType } from '@/sanity/lib/types';

import { HeroTime } from './hero-time';
import { Project } from './project';
import { Skills } from './skills';

// const Project = dynamic(() => import('./project').then((comp) => comp.Project));

gsap.registerPlugin(ScrollTrigger);

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;
  const { columnWrapRef, mainRef, sectionAboutRef, sectionColumnRef } =
    useScrollPanel();

  const pushColumnWrapRef = (el: HTMLDivElement) =>
    columnWrapRef.current.push(el);

  return (
    <main ref={mainRef}>
      <section className="section section--hero">
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

      <section className="section section--columns" ref={sectionColumnRef}>
        <div className="columns">
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-4.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-1.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-3.png)' }}
                />
              </div>
            </div>
          </div>
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-4.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-2.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-4.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-1.png)' }}
                />
              </div>
            </div>
          </div>
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-2.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-3.png)' }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{ backgroundImage: 'url(images/project-1.png)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--about" ref={sectionAboutRef}>
        <div className="container">
          <figure className="about__image">
            <Image
              src={about.image.asset.url}
              alt={about.image.caption as string}
              fill
            />
          </figure>
          <div className="about__content">
            <div className="about__text">
              <h2 className="about__title">{about.title}</h2>
              <p className="about__description">{about.description}</p>
            </div>
          </div>
        </div>
      </section>

      <Project {...project_list} />
      <Skills {...skills} />

      <section className="section section--cta">
        <RunningText>
          Let&apos;s Talk <Asterisk />
        </RunningText>
      </section>
    </main>
  );
}
