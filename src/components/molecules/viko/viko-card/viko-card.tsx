import {css, cx} from '@styled/css';
import Image from 'next/image';

import {vikoTest} from '@/assets';

import {Container, Title} from './viko-card.styled';

interface VikoCardProps {
  className?: string;
}

export default function VikoCard({className, ...otherProps}: VikoCardProps) {
  const defaultClassName = css({});
  const vikoCardClass = cx(defaultClassName, className);

  return (
    <Container className={vikoCardClass} {...otherProps}>
      <Image src={vikoTest} alt='viko test' fill />
      <Title>Resident Evil: Afterlife 2010</Title>
    </Container>
  );
}
