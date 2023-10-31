'use client';

import {css, cx} from '@styled/css';

import {Container} from './video-carousel.styled';

interface VideoCarouselProps {
  className?: string;
}

export default function VideoCarousel({className}: VideoCarouselProps) {
  const defaultClassName = css({});
  const videoCarouselClass = cx(defaultClassName, className);

  return <Container className={videoCarouselClass} />;
}
