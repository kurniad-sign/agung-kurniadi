'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import SplitType, { TargetElement } from 'split-type';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { revealEachImageAnimation } from '@/lib/animation/reveal-each-image';
import { revealTextAnimation } from '@/lib/animation/reveal-text';
import { SkillsQuery } from '@/sanity/lib/types';

export function Skills({ list, title }: SkillsQuery) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentTitleRef = useRef<HTMLHeadingElement[]>([]);
  const contentDescriptionRef = useRef<HTMLParagraphElement[]>([]);
  const imageContainerRef = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const textSplitted = new SplitType(
      [
        titleRef.current,
        contentTitleRef.current,
        contentDescriptionRef.current,
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
        tl.add(revealTextAnimation(textSplitWord.words), '+=0.2').add(
          revealEachImageAnimation(imageContainerRef.current),
          '-=0.8'
        );
      }
    }, ref);

    return () => context.revert();
  }, [inView]);

  return (
    <section className="section section--skills">
      <div className="skill__wrapper container" ref={ref}>
        <div className="skill__header">
          <h2
            className="skill__title"
            ref={titleRef}
            data-animation="text-reveal"
          >
            {title}
          </h2>
        </div>
        <div className="skill__content">
          {list.map((skill, index) => (
            <div key={skill._id} className="skill__content__item">
              <h3
                className="skill__content__title"
                ref={(el) =>
                  (contentTitleRef.current[index] = el as HTMLHeadingElement)
                }
                data-animation="text-reveal"
              >
                {skill.name}
              </h3>
              <p
                className="skill__content__description"
                ref={(el) =>
                  (contentDescriptionRef.current[index] =
                    el as HTMLParagraphElement)
                }
                data-animation="text-reveal"
              >
                {skill.description}
              </p>
              <div className="skill__content__image">
                {skill.image.map((img, imageIndex) => (
                  <div
                    key={imageIndex}
                    ref={(el) =>
                      imageContainerRef.current.push(el as HTMLDivElement)
                    }
                    style={{
                      position: 'relative',
                      width: 80,
                      height: 80,
                      aspectRatio: '1/1',
                      willChange: 'transform',
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
