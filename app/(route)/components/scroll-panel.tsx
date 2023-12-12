'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import SplitType, { TargetElement } from 'split-type';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { useScrollPanel } from '@/hooks/use-scroll-animation';
import { revealImageAnimation } from '@/lib/animation/reveal-image';
import { revealTextAnimation } from '@/lib/animation/reveal-text';
import { AboutQuery } from '@/sanity/lib/types';

export function ScrollPanel({ description, image, title }: AboutQuery) {
  const splitDesc = description.split('\n').filter(Boolean);
  const [text1, text2] = splitDesc;

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });
  const { columnWrapRef, sectionAboutRef, sectionColumnRef } = useScrollPanel();

  const pushColumnWrapRef = (el: HTMLDivElement) =>
    columnWrapRef.current.push(el);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const description2Ref = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useIsomorphicLayoutEffect(() => {
    const textSplitted = new SplitType(
      [
        titleRef.current,
        descriptionRef.current,
        description2Ref.current,
      ] as TargetElement,
      {
        types: 'words',
      }
    );
    const textSplitWord = new SplitType(textSplitted.words as TargetElement, {
      types: 'words',
    });

    const context = gsap.context(() => {
      const tl = gsap.timeline();

      if (inView) {
        tl.add(revealImageAnimation(imageRef.current), '+=0.2').add(
          revealTextAnimation(textSplitWord.words),
          '-=1'
        );
      }
    }, ref);

    return () => context.revert();
  }, [inView]);

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
        <div className="container" ref={ref}>
          <figure className="about__image">
            <Image
              src={image.asset.url}
              alt={image.caption as string}
              fill
              ref={imageRef}
            />
          </figure>
          <div className="about__content">
            <div className="about__text">
              <h2
                className="about__title"
                ref={titleRef}
                data-animation="text-reveal"
              >
                {title}
              </h2>
              <p
                className="about__description"
                ref={descriptionRef}
                data-animation="text-reveal"
              >
                {text1}
              </p>
              <p
                className="about__description"
                ref={description2Ref}
                data-animation="text-reveal"
              >
                {text2}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
