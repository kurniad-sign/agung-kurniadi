'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { HomeQueryType } from '@/sanity/lib/types';

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  console.log(skills);

  return (
    <main>
      <section className="section section--hero">
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__description">{hero.description}</p>
        <span className="hero__scroll-text">{hero.scroll_text}</span>
      </section>

      <section className="section section--about">
        <div>
          <ArrowRight size={60} />
        </div>
        <div>
          <h2 className="about__title">{about.title}</h2>
          <p className="about__description">{about.description}</p>
        </div>
      </section>

      <section className="section section--project">
        <h2 className="project__title">{project_list.title}</h2>
        <ul className="project__list">
          {project_list.list.map((project) => (
            <li key={project._id} className="project__list__item">
              {/* <a target="_blank" href={project.site} rel="noopener noreferrer"> */}
              <div className="project__list__item__content">
                <h3 className="project__list__item__title">{project.title}</h3>
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
                  width={410}
                  height={250}
                  style={{ objectFit: 'cover' }}
                />
              </figure>
              {/* </a> */}
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--skills">
        <h2 className="skill__title">{skills.title}</h2>
        <div className="skill__list">
          {skills.list.map((skill) => (
            <div key={skill._id}>{skill.name}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
