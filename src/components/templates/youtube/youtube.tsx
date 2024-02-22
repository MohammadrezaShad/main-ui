'use client';

import {css} from '@styled/css';
import {FC} from 'react';

import {youtubeLogo} from '@/assets';
import {Card, SmallCard} from '@/components';

import moment from 'moment';
import Image from 'next/image';
import {Cards, Container, Wrapper} from './youtube.styled';

interface YouTubeProps {
  data: any;
}

const YouTube: FC<YouTubeProps> = ({data}) => {
  return (
    <Container>
      <Wrapper>
        <header className={css({textStyle: 'h1', color: 'text.primary', px: '-4'})}>
          <Image width={179} height={40} alt='' src={youtubeLogo.src} />
        </header>
        <div
          className={css({textStyle: 'body2', color: 'text.primary'})}
          role='status'
          aria-label={`Result: ${data.items.length} videos`}
        >
          Result: {data.items.length} videos
        </div>
      </Wrapper>

      <Cards hideBelow='md'>{data.items.map(renderCard)}</Cards>
      <Cards hideFrom='md'>{data.items.map(renderSmallCard)}</Cards>
    </Container>
  );
};

export default YouTube;

const renderCard = (video: any) => {
  const {thumbnails, resourceId, publishedAt} = video.snippet;
  const {medium = {}} = thumbnails;
  return (
    <Card
      key={video.id}
      articleLink={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
      date={moment(publishedAt).fromNow()}
      imageUrl={medium.url}
      title={video.snippet.title}
      linkTitle='WATCH'
    />
  );
};

const renderSmallCard = (video: any) => {
  const {thumbnails, resourceId, publishedAt} = video.snippet;
  const {medium = {}} = thumbnails;
  return (
    <SmallCard
      key={video.id}
      articleLink={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
      date={moment(publishedAt).fromNow()}
      imageUrl={medium.url}
      title={video.snippet.title}
      linkTitle='WATCH'
    />
  );
};
