'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoBlack from '@/public/images/logo-black.svg';
import gsap from 'gsap';
import { Dot, FileDown } from 'lucide-react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic';
import { NavigationType } from '@/sanity/types/navigation';

export function Navigation({
  data: { resume, status },
}: {
  data: NavigationType;
}) {
  const [isNavVisible, setIsNavVisible] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const hideTrigger = 100;
      const showTrigger = 2000;

      if (
        currentScrollY > hideTrigger &&
        currentScrollY < showTrigger &&
        isNavVisible
      ) {
        gsap.to('.c-header', {
          y: '-100%',
          duration: 1,
          ease: 'power3.inOut',
        });
        setIsNavVisible(false);
      } else if (
        (currentScrollY <= hideTrigger || currentScrollY >= showTrigger) &&
        !isNavVisible
      ) {
        gsap.to('.c-header', {
          y: '0%',
          duration: 1,
          ease: 'power3.inOut',
        });
        setIsNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavVisible]);

  return (
    <header className="c-header">
      <nav className="c-nav">
        <div className="c-nav__logo">
          <Image src={LogoBlack} alt="Logo" width={50} height={50} />
        </div>
        <div className="c-nav__status">
          <div className="c__status">
            <Dot size={14} style={{ height: 20, width: 20 }} /> {status}
          </div>
        </div>
        <div className="c-nav__resume">
          <a className="c-button" href={`${resume.asset.url}?dl=`}>
            <FileDown size={14} />
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
