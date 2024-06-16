'use client';

import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {Swiper, SwiperSlide} from 'swiper/react';

import {CategoryCard, Divider, PrimarySubtitle, PrimaryTitle} from '@/components';
import {CategoryType} from '@/graphql';

import {Container, SliderWrapper, Wrapper} from './categories.styled';

export default function Categories({hasPdf = false, data}: {hasPdf?: boolean; data: any}) {
  const categories: Array<CategoryType> = data?.category!.searchCategories.results;
  let filteredCategories;
  if (hasPdf) {
    filteredCategories = categories.filter(
      (cat: CategoryType) => cat.withPdfArticlesPostCount && cat.withPdfArticlesPostCount > 0,
    );
  } else {
    filteredCategories = categories.filter(
      (cat: CategoryType) => cat.withoutPdfArticlesPostCount && cat.withoutPdfArticlesPostCount > 0,
    );
  }
  const hasExtraCategories = filteredCategories?.length > 3;

  return (
    <Container>
      <Box>
        <PrimaryTitle
          className={css({
            textAlign: 'center',
          })}
          title='Categories'
        />
        <PrimarySubtitle
          className={css({
            textAlign: 'center',
            mt: '4',
          })}
          text='All types of categories are displayed here'
        />
      </Box>
      <Wrapper hideBelow='md'>
        {filteredCategories.slice(0, 3).map(category => (
          <CategoryCard id={category._id} key={category._id} category={category} hasPdf={hasPdf} />
        ))}
      </Wrapper>
      <SliderWrapper>
        <Swiper
          autoplay
          pagination={{type: 'bullets', clickable: true}}
          onSwiper={swiper => console.log(swiper)}
          className={css({
            w: 'full',
            maxW: '960px',
          })}
        >
          {filteredCategories.slice(0, 3).map(category => (
            <SwiperSlide key={category._id}>
              <div
                className={flex({
                  position: 'relative',
                  w: 'full',
                })}
              >
                <CategoryCard
                  id={category._id}
                  key={category._id}
                  category={category}
                  hasPdf={hasPdf}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderWrapper>
      {hasExtraCategories ? (
        <>
          <Divider label='Other Categories' />
          <Wrapper hideBelow='md'>
            {filteredCategories.slice(3).map(category => (
              <CategoryCard
                id={category._id}
                key={category._id}
                category={category}
                hasPdf={hasPdf}
              />
            ))}
          </Wrapper>
          <Wrapper hideFrom='md'>
            {filteredCategories.slice(3).map(category => (
              <CategoryCard
                id={category._id}
                key={category._id}
                collapsed
                category={category}
                hasPdf={hasPdf}
              />
            ))}
          </Wrapper>
        </>
      ) : null}
    </Container>
  );
}
