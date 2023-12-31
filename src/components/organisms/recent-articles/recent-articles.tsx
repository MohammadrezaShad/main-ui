'use client';

import {css} from '@styled/css';
import {flex, grid} from '@styled/patterns';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Card} from '@/components/molecules/card';
import {ArticleType} from '@/graphql/generated/types';

const RecentArticles = ({posts}: {posts: ArticleType[]}) => (
  <>
    <div
      className={grid({
        gridTemplateColumns: '3',
        gap: 6,
        hideBelow: 'md',
      })}
    >
      {posts.map(post => (
        <Card
          key={post._id}
          title={post.title}
          articleLink={`/articles/${post.slug}`}
          date={post.publishDate}
          imageUrl={post.thumbnail?.preview}
        />
      ))}
    </div>
    <div className={css({hideFrom: 'md'})}>
      <Swiper
        autoplay
        slidesPerView={1.2}
        centeredSlides
        spaceBetween='10'
        pagination={{type: 'bullets', clickable: true}}
        onSwiper={swiper => console.log(swiper)}
        className={css({
          w: 'full',
          maxW: '960px',
        })}
      >
        {posts.slice(0, 3).map(post => (
          <SwiperSlide key={post.slug}>
            <div
              className={flex({
                position: 'relative',
                w: 'full',
                justifyContent: 'center',
              })}
            >
              <Card
                key={post._id}
                title={post.title}
                articleLink={`/articles/${post.slug}`}
                date={post.publishDate}
                imageUrl={post.thumbnail?.preview}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </>
);

export default RecentArticles;
