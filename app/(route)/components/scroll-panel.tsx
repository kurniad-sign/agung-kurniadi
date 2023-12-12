'use client';

import Image from 'next/image';

import { useScrollPanel } from '@/hooks/use-scroll-animation';
import { AboutQuery } from '@/sanity/lib/types';

export function ScrollPanel({ description, image, title }: AboutQuery) {
  const { columnWrapRef, sectionAboutRef, sectionColumnRef } = useScrollPanel();

  const pushColumnWrapRef = (el: HTMLDivElement) =>
    columnWrapRef.current.push(el);
  return (
    <>
      <section className="section section--columns" ref={sectionColumnRef}>
        <div className="columns">
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-4.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-1.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-3.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-4.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-2.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-4.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-1.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="column-wrap" ref={pushColumnWrapRef}>
            <div className="column">
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-2.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-3.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
              <div className="column__item">
                <div
                  className="column__item-img"
                  style={{
                    backgroundImage: 'url(images/project-1.png)',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--about" ref={sectionAboutRef}>
        <div className="container">
          <figure className="about__image">
            <Image src={image.asset.url} alt={image.caption as string} fill />
          </figure>
          <div className="about__content">
            <div className="about__text">
              <h2 className="about__title">{title}</h2>
              <p className="about__description">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
