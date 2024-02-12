import Image from 'next/image';

import {Container, Duration, ImageWrap, SubTitle, Title} from './video-card.styled';

export default function VideoCard() {
  return (
    <Container>
      <ImageWrap>
        <Image unoptimized src='/test/thumbnail.png' fill alt='' />
        <Duration>00:50:25</Duration>
      </ImageWrap>
      <Title>10 فیلم منتخب کمدی سال 2023</Title>
      <SubTitle>200 بازدید . 2 روز پیش</SubTitle>
    </Container>
  );
}
