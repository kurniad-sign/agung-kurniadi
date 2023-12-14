import gsap from 'gsap';

export const revealLogoAnimation = (target: HTMLImageElement | null) => {
  const tl = gsap.timeline();

  tl.to(target, {
    ease: 'power3',
    duration: 1,
    y: '0%',
  });

  return tl;
};
