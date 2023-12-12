import gsap from 'gsap';

export const revealImageAnimation = (target: HTMLImageElement | null) => {
  const tl = gsap.timeline();

  tl.to(target, {
    ease: 'power3',
    duration: 1.5,
    scale: 1,
    alpha: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
  });

  return tl;
};
