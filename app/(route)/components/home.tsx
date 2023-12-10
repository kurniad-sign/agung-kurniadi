'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { useScrollPanel } from '@/hooks/use-scroll-animation';
import { HomeQueryType } from '@/sanity/lib/types';

import { HeroTime } from './hero-time';

gsap.registerPlugin(ScrollTrigger);

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;
  const { columnWrapRef, mainRef, sectionAboutRef, sectionColumnRef } =
    useScrollPanel();

  const pushColumnWrapRef = (el: HTMLDivElement) =>
    columnWrapRef.current.push(el);

  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      if (!scrollContainerRef.current) {
        return;
      }

      const contentWidth =
        scrollContainerRef.current.offsetWidth - window.innerWidth;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: 'center center',
          end: `+=${contentWidth}`,
          scrub: true, // Enable scrubbing for smoother animation
          pin: true, // Pin the container during the animation
          anticipatePin: 1, // Improve the pinning experience
        },
      });

      timeline.to(scrollContainerRef.current, {
        x: -contentWidth - 128, // Scroll to the left (negative x)
        ease: 'none',
      });
    }, projectRef);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
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

      <section className="section section--project">
        <div className="container">
          <h2 className="project__title">{project_list.title}</h2>
          <div className="project__list__wrapper" ref={scrollWrapperRef}>
            <ul className="project__list" ref={scrollContainerRef}>
              {project_list.list.map((project) => (
                <li key={project._id} className="project__list__item">
                  <a
                    target="_blank"
                    href={project.site}
                    rel="noopener noreferrer"
                  >
                    <figure className="project__list__item__image">
                      <div className="project__list__item__content">
                        <div>
                          <h4 className="project__list__item__title">
                            {project.title}
                          </h4>
                          <p className="project__list__item__description">
                            {project.description}
                          </p>
                          <a
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project__list__item__link"
                          >
                            Visit Site
                            <ArrowUpRight size={24} />
                          </a>
                        </div>
                      </div>
                      <Image
                        src={project.coverImage.asset.url}
                        alt="Project List"
                        fill
                      />
                    </figure>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--skills">
        <div className="container">
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
