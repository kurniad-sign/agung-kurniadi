import { MutableRefObject, RefObject } from 'react';
import gsap from 'gsap';

export const animatePanel = ({
  target,
  triggerTarget,
  endTarget,
}: {
  target: RefObject<HTMLDivElement>;
  triggerTarget: RefObject<HTMLElement>;
  endTarget: MutableRefObject<HTMLDivElement[]>;
}) => {
  const timeline = gsap.timeline();

  timeline
    .addLabel('start', 0)
    .to(
      target.current,
      {
        ease: 'none',
        startAt: { scale: 1.1 },
        scale: 1,
      },
      'start'
    )
    .to(
      target.current,
      {
        scrollTrigger: {
          trigger: triggerTarget.current,
          start: 0,
          end: 'top top',
          scrub: true,
        },
        ease: 'power4.inOut',
        startAt: {
          opacity: 0.2,
        },
        opacity: 1,
        // repeat once (go back to "startAt" values)
        yoyo: true,
        repeat: 1,
      },
      'start'
    )
    .to(
      endTarget.current,
      {
        ease: 'none',
        yPercent: (pos) => (pos % 2 ? 3 : -3),
      },
      'start'
    );

  return timeline;
};
