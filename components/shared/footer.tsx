'use client';

import { MouseEvent } from 'react';
import Image from 'next/image';
import LogoBlack from '@/public/images/logo-black.svg';
import { ArrowUp, Mail, Phone } from 'lucide-react';

export function Footer() {
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="c-footer c-footer__primary">
        <div className="container">
          <div className="c-footer__content">
            <div className="c-footer__logo">
              <Image src={LogoBlack} alt="Logo" width={120} height={120} />
            </div>
            <div className="c-footer__contact">
              <p className="c-footer__contact-text">
                Feel free to reach out if you want for simply have a chat
              </p>
              <div className="c-footer__contact-list">
                <a className="c-footer__contact-item" href="">
                  <Mail size={18} /> agungkurniadi99@gmail.com
                </a>
                <a className="c-footer__contact-item" href="">
                  <Phone size={18} /> +628992406200
                </a>
              </div>
            </div>
            <div className="c-footer__social">
              <div className="c-footer__social-title">Follow me</div>
              <ul className="c-footer__social-list">
                <li className="c-footer__social-item">
                  <a
                    className="c-footer__social-link"
                    href="https://www.linkedin.com/in/agung-kurniadi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linked In
                  </a>
                </li>
                <li className="c-footer__social-item">
                  <a
                    className="c-footer__social-link"
                    href="https://github.com/kurniad-sign"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li className="c-footer__social-item">
                  <a
                    className="c-footer__social-link"
                    href="https://medium.com/@kurniagung.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Medium
                  </a>
                </li>
                <li className="c-footer__social-item">
                  <a
                    className="c-footer__social-link"
                    href="https://codepen.io/kurniad-sign"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Codepen
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="c-footer c-footer__secondary">
        <div className="container c-footer__copy">
          <p className="c-footer__copy-text">
            © Agung Kurniadi 2023. Allright Reserved.
          </p>
          <a className="c-footer__copy-top" onClick={scrollToTop}>
            Back to Top <ArrowUp />
          </a>
        </div>
      </footer>
    </>
  );
}
