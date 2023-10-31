'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import {css} from '@styled/css';

import {Spinner, VideoCollection} from '@/components';

import {Container} from './media.styled';
import MediaFilters from './media-filters';

export default function Media() {
  return (
    <Container>
      <MediaFilters />
      <InfiniteScroll
        dataLength={0} // This is important field to render the next data
        next={() => {
          console.log('call');
        }}
        hasMore
        loader={<Spinner value={75} />}
        className={css({overflowX: 'hidden !important'})}
      >
        <VideoCollection />
      </InfiniteScroll>
    </Container>
  );
}
