'use client';

import StickyBox, {StickyBoxCompProps} from 'react-sticky-box';
import {css, cx} from '@styled/css';

interface StickyProps extends StickyBoxCompProps {
  children: React.ReactNode;
  className?: string;
}

export default function Sticky({children, className, ...otherProps}: StickyProps) {
  const defaultClassName = css({});
  const stickyClass = cx(defaultClassName, className);

  return (
    <StickyBox className={stickyClass} {...otherProps}>
      {children}
    </StickyBox>
  );
}
