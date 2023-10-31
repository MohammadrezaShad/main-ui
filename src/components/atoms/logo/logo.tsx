'use client';

import {css, cx} from '@styled/css';

import {IconParaj, IconParajMobile} from '@/assets';
import Paths from '@/utils/paths';

import {Container} from './logo.styled';

interface LogoProps {
  className?: string;
}

export default function Logo({className}: LogoProps) {
  const defaultClassName = css({});
  const containerClass = cx(defaultClassName, className);
  return (
    <Container className={containerClass} href={Paths.Home.getPath()}>
      <IconParaj className={css({hideBelow: 'md'})} />
      <IconParajMobile className={css({hideFrom: 'md'})} />
    </Container>
  );
}
