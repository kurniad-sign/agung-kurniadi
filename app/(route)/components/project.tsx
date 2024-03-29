'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import SplitType, { TargetElement } from 'split-type';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { revealTextAnimation } from '@/lib/animation/reveal-text';
import { ProjectListQuery } from '@/sanity/lib/types';

gsap.registerPlugin(ScrollTrigger);

export function Project({ list, title }: ProjectListQuery) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  useIsomorphicLayoutEffect(() => {
    const textSplitted = new SplitType([titleRef.current] as TargetElement, {
      types: 'words',
    });
    const textSplitWord = new SplitType(textSplitted.words as TargetElement, {
      types: 'words',
    });

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
      const timelineText = gsap.timeline();

      timeline.to(scrollContainerRef.current, {
        x: -contentWidth - 128, // Scroll to the left (negative x)
        ease: 'none',
      });
      if (inView) {
        timelineText.add(revealTextAnimation(textSplitWord.words), '+=0.2');
      }
    }, projectRef);

    return () => {
      context.revert();
      // ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [inView]);

  return (
    <section className="section section--project" ref={projectRef}>
      <div className="container" ref={ref}>
        <h2
          className="project__title"
          data-animation="text-reveal"
          ref={titleRef}
        >
          {title}
        </h2>
        <div className="project__list__wrapper" ref={scrollWrapperRef}>
          <ul className="project__list" ref={scrollContainerRef}>
            {list.map((project) => (
              <li key={project._id} className="project__list__item">
                <figure className="project__list__item__image">
                  <div className="project__list__item__content">
                    <div className="project__list__item__content-wrapper">
                      <h4 className="project__list__item__title">
                        {project.title}
                      </h4>
                      <p className="project__list__item__description">
                        {project.description}
                      </p>

                      <div className="project__list__item__tag">
                        {project.tags.map((tag, index) => (
                          <div
                            className="project__list__item__tag-list"
                            key={index}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="c-link project__list__item__link"
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
