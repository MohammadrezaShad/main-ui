'use client';

import {useEffect} from 'react';

function TemplateContainer({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const mainElement = document.querySelector('#main-container');
    let prevScrollPos = mainElement ? mainElement.scrollTop : 0;

    const handleScroll = () => {
      if (!mainElement) return;
      if (mainElement) {
        const currentScrollPos = mainElement.scrollTop;
        const navbar = document.querySelector('#main-nav-header') as HTMLElement;
        if (navbar) {
          if (prevScrollPos > currentScrollPos) {
            navbar.style.transform = 'translateY(0)';
          } else {
            navbar.style.transform = 'translateY(-100%)';
          }
        }
        prevScrollPos = currentScrollPos;
      }
    };

    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);
  return <main id='main-container'>{children}</main>;
}

export default TemplateContainer;
