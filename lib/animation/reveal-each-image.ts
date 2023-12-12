import gsap from 'gsap';

export const revealEachImageAnimation = (
  target: HTMLElement | HTMLElement[] | null
) => {
  const tl = gsap.timeline();

  tl.fromTo(
    target,
    {
      y: '20%',
      alpha: 0,
    },
    {
      y: '0%',
      duration: 1,
      ease: 'power3',
      alpha: 1,
    }
  );

  return tl;
};
