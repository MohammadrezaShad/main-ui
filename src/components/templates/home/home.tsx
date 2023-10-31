'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import {css} from '@styled/css';

import {Section, Spinner, VideoCollection, VikoShowcase} from '@/components';

export default function Home() {
  const sectionClass = css({
    '&:not(:last-child)': {
      pb: 8,
    },
  });
  return (
    <>
      <Section title='اختصاصی' className={sectionClass}>
        <VideoCollection />
      </Section>
      <Section title='برگزیده' className={sectionClass}>
        <VideoCollection />
      </Section>
      <Section title='اخبار روز' className={sectionClass}>
        <VideoCollection />
      </Section>
      <Section title='ویکو' className={sectionClass}>
        <VikoShowcase />
      </Section>

      <Section title='جدیدترین' className={sectionClass}>
        <InfiniteScroll
          dataLength={0} // This is important field to render the next data
          next={() => {
            console.log('call');
          }}
          hasMore
          loader={<Spinner />}
          className={css({overflowX: 'hidden !important'})}
        >
          <VideoCollection />
        </InfiniteScroll>
      </Section>
    </>
  );
}
