import {css} from '@styled/css';

import {
  CommentArea,
  Sticky,
  VideoCarousel,
  VideoDescription,
  VideoList,
  VideoPlayer,
} from '@/components';

import {Block, Container, Wrap} from './video.styled';

export default function Video() {
  return (
    <Container>
      <Block>
        <VideoPlayer src='https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8' />
        <VideoDescription />
        <VideoCarousel />
        <CommentArea className={css({mt: 6})} />
      </Block>
      <Sticky offsetTop={10}>
        <Wrap>
          <VideoList
            className={css({display: {lgDown: 'flex'}, gap: 4, flexWrap: 'wrap'})}
            classes={{
              item: css({
                lgDown: {flex: '0 0 48%', mb: 'unset', maxW: '48%'},
                smDown: {flex: '0 0 100%', maxW: '100%'},
              }),
            }}
          />
        </Wrap>
      </Sticky>
    </Container>
  );
}
