'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import {css} from '@styled/css';

import {Spinner, VikoCollection} from '@/components';

import {Container} from './viko.styled';
import VikoFilters from './viko-filters';

export default function Viko() {
  return (
    <Container>
      <VikoFilters />
      <InfiniteScroll
        dataLength={0} // This is important field to render the next data
        next={() => {
          console.log('call');
        }}
        hasMore
        loader={<Spinner value={75} />}
        className={css({overflowX: 'hidden !important'})}
      >
        <VikoCollection />
      </InfiniteScroll>
    </Container>
  );
}
