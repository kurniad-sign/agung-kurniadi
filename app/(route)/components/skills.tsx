'use client';

import Image from 'next/image';

import { SkillsQuery } from '@/sanity/lib/types';

export function Skills({ list, title }: SkillsQuery) {
  return (
    <section className="section section--skills">
      <div className="skill__wrapper container">
        <div className="skill__header">
          <h2 className="skill__title">{title}</h2>
        </div>
        <div className="skill__content">
          {list.map((skill) => (
            <div key={skill._id} className="skill__content__item">
              <h3 className="skill__content__title">{skill.name}</h3>
              <p className="skill__content__description">{skill.description}</p>
              <div className="skill__content__image">
                {skill.image.map((img, index) => (
                  <div
                    key={index}
                    style={{
                      // backgroundImage: `url(${img.asset.url})`,
                      position: 'relative',
                      width: 80,
                      height: 80,
                      // backgroundSize: 'contain',
                      aspectRatio: '1/1',
                      // backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'center center',
                    }}
                  >
                    <Image
                      src={img.asset.url}
                      alt="image logo list"
                      fill
                      style={{
                        borderRadius: '50%',
                        objectFit: 'contain',
                        background: '#d8d8d8',
                        padding: '0.875rem',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
