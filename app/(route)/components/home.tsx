'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Asterisk } from 'lucide-react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { animatePanel } from '@/lib/animation/panel-animation';
import { HomeQueryType } from '@/sanity/lib/types';

import { HeroTime } from './hero-time';

gsap.registerPlugin(ScrollTrigger);

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  const mainRef = useRef<HTMLElement>(null);
  const sectionAboutRef = useRef<HTMLElement>(null);
  const sectionColumnRef = useRef<HTMLDivElement>(null);
  const columnWrapRef = useRef<HTMLDivElement[]>([]);

  const pushColumnWrapRef = (el: HTMLDivElement) =>
    columnWrapRef.current.push(el);

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
                />{' '}
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
                />{' '}
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

      <section className="section" ref={sectionAboutRef}>
        <div className="section--about container">
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

      <section className="section section--project">
        <div className="container">
          <h2 className="project__title">{project_list.title}</h2>
          <ul className="project__list">
            {project_list.list.map((project) => (
              <li key={project._id} className="project__list__item">
                {/* <a target="_blank" href={project.site} rel="noopener noreferrer"> */}
                <div className="project__list__item__content">
                  <h3 className="project__list__item__title">
                    {project.title}
                  </h3>
                  <div className="project__list__item__tag">
                    {project.tags.map((tag, index) => (
                      <div key={index}>{tag}</div>
                    ))}
                  </div>
                </div>
                <figure className="project__list__item__image">
                  <Image
                    src={project.coverImage.asset.url}
                    alt="Project List"
                    width={310}
                    height={150}
                  />
                </figure>
                {/* </a> */}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section--skills container">
          <h2 className="skill__title">{skills.title}</h2>
          <div className="skill__content">
            <div className="skill__icon">
              <ArrowRight size={60} />
            </div>
            <div className="skill__list">
              {skills.list.map((skill) => (
                <div key={skill._id}>{skill.name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
