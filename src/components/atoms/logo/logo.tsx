import {css, cx} from '@styled/css';

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
      <span
        className={css({
          color: 'text.primary',
          fontSize: '32px',
          fontWeight: 500,
        })}
      >
        Water
        <span
          className={css({
            fontWeight: 300,
          })}
        >
          lyst
        </span>
      </span>
    </Container>
  );
}
