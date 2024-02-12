import Image from 'next/image';

import {Block, Container, Duration, ImageWrap, SubTitle, Title} from './video-mini-card.styled';

export default function VideoMiniCard() {
  return (
    <Container>
      <ImageWrap>
        <Image unoptimized src='/test/thumbnail.png' fill objectFit='cover' alt='' />
        <Duration>00:50:25</Duration>
      </ImageWrap>
      <Block>
        <Title>10 فیلم منتخب کمدی سال 2023</Title>
        <SubTitle>درام | 2023 | آمریکا</SubTitle>
      </Block>
    </Container>
  );
}
