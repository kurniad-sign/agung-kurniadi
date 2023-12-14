import gsap from 'gsap';

export const revealTextAnimation = (
  target: HTMLElement | HTMLElement[] | null
) => {
  const tl = gsap.timeline();

  tl.to(target, {
    y: '0%',
    duration: 1,
    stagger: 0.015,
    ease: 'power3',
  });

  return tl;
};

export const revealTextSideAnimation = (
  target: HTMLElement | HTMLElement[] | null
) => {
  const tl = gsap.timeline();

  tl.to(target, {
    x: '0%',
    duration: 1,
    stagger: 0.015,
    ease: 'power3',
  });

  return tl;
};
