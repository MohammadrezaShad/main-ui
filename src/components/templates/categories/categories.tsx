'use client';

import {css, cx} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {CategoryCard, Divider, PrimarySubtitle, PrimaryTitle} from '@/components';
import {CategoryType} from '@/graphql';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {BackgroundShade, Container, SliderWrapper, Wrapper} from './categories.styled';

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
      <BackgroundShade>
        <Wrapper hideBelow='md'>
          {filteredCategories.slice(0, 3).map(category => (
            <CategoryCard
              id={category._id}
              key={category._id}
              category={category}
              hasPdf={hasPdf}
            />
          ))}
        </Wrapper>
      </BackgroundShade>
      <BackgroundShade>
        <SliderWrapper>
          <Swiper
            modules={[Navigation, Pagination]}
            autoplay
            pagination={{type: 'bullets', clickable: true}}
            navigation={{nextEl: '.arrow-right', prevEl: '.arrow-left'}}
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
          <button
            type='button'
            className={cx(
              'arrow-left',
              css({
                position: 'absolute',
                py: '6',
                pr: '6',
                top: '[50%]',
                transform: '[translateY(-50%)]',
                zIndex: 1,
                left: 0,
              }),
            )}
          >
            <IconChevronLeft className={css({w: '6', h: '6', '& path': {fill: '#333'}})} />
          </button>
          <button
            type='button'
            className={cx(
              'arrow-right',
              css({
                position: 'absolute',
                py: '6',
                pl: '6',
                top: '[50%]',
                transform: '[translateY(-50%)]',
                zIndex: 1,
                right: 0,
              }),
            )}
          >
            <IconChevronRight className={css({w: '6', h: '6', '& path': {fill: '#333'}})} />
          </button>
        </SliderWrapper>
      </BackgroundShade>
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
          <Wrapper hideFrom='md' className={css({px: '4'})}>
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
