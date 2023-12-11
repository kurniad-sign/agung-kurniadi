'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { ProjectListQuery } from '@/sanity/lib/types';

gsap.registerPlugin(ScrollTrigger);

export function Project({ list, title }: ProjectListQuery) {
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
    <section className="section section--project" ref={projectRef}>
      <div className="container">
        <h2 className="project__title">{title}</h2>
        <div className="project__list__wrapper" ref={scrollWrapperRef}>
          <ul className="project__list" ref={scrollContainerRef}>
            {list.map((project) => (
              <li key={project._id} className="project__list__item">
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
