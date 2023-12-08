'use client';

import Image from 'next/image';
import { ArrowRight, Asterisk } from 'lucide-react';

import { useDate } from '@/hooks/use-date';
import { HomeQueryType } from '@/sanity/lib/types';

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  const { date, time } = useDate();

  return (
    <main>
      <section className="section section--hero">
        <div className="container">
          <header className="hero__header">
            <h1 className="hero__title">{hero.title}</h1>
          </header>
          <div className="hero__content">
            <p className="hero__description">{hero.description}</p>
            <div className="hero__time">
              <p>{date}</p>
              <p>{time}</p>
            </div>
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

      <section className="section">
        <div className="section--about container">
          <div className="about__icon">
            <ArrowRight size={60} />
          </div>
          <div className="about__content">
            <h2 className="about__title">{about.title}</h2>
            <p className="about__description">{about.description}</p>
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
