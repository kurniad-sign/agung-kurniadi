'use client';

import Image from 'next/image';
import LogoBlack from '@/public/images/logo-black.svg';
import { Dot, FileDown } from 'lucide-react';

import { NavigationType } from '@/sanity/types/navigation';

export function Navigation({
  data: { resume, status },
}: {
  data: NavigationType;
}) {
  return (
    <header className="c-header">
      <nav className="c-nav">
        <div className="c-nav__logo">
          <Image src={LogoBlack} alt="Logo" width={60} height={60} />
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
