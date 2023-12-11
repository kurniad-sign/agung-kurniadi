'use client';

import { ArrowRight } from 'lucide-react';

import { SkillsQuery } from '@/sanity/lib/types';

export function Skills({ list, title }: SkillsQuery) {
  return (
    <section className="section section--skills">
      <div className="container">
        <h2 className="skill__title">{title}</h2>
        <div className="skill__content">
          <div className="skill__icon">
            <ArrowRight size={60} />
          </div>
          <div className="skill__list">
            {list.map((skill) => (
              <>
                <div key={skill._id}>{skill.name}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
