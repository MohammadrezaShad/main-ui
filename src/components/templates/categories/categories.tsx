'use client';
import {CategoryCard, Divider, PrimarySubtitle, PrimaryTitle} from '@/components';
import {CategoryType} from '@/graphql/generated/types';
import {searchCategories} from '@/graphql/query/categories';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Container, SliderWrapper, Wrapper} from './categories.styled';

export default function Categories() {
  const {data} = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => searchCategories({count: 50}),
  }) as any;
  const categories: Array<CategoryType> = data?.category!.searchCategories.results;
  const hasExtraCategories = categories.length > 3;

  return (
    <Container>
      <Box>
        <PrimaryTitle
          className={css({
            textAlign: 'center',
          })}
          title='Categories of Articles'
        />
        <PrimarySubtitle
          className={css({
            textAlign: 'center',
            mt: '4',
          })}
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Viverra justo nec
        ultrices dui sapien eget. Suspendisse in est ante in nibh mauris.
        Facilisis sed odio morbi quis commodo. Egestas maecenas pharetra
        convallis posuere morbi leo'
        />
      </Box>
      <Wrapper hideBelow='md'>
        {categories.slice(0, 3).map(category => (
          <CategoryCard key={category._id} category={category} />
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
          {categories.slice(0, 3).map(category => (
            <SwiperSlide key={category._id}>
              <div
                className={flex({
                  position: 'relative',
                  w: 'full',
                })}
              >
                <CategoryCard key={category._id} category={category} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderWrapper>
      {hasExtraCategories ? (
        <>
          <Divider label='Other Categories' />
          <Wrapper hideBelow='md'>
            {categories.slice(3).map(category => (
              <CategoryCard category={category} />
            ))}
          </Wrapper>
          <Wrapper hideFrom='md'>
            {categories.slice(3).map(category => (
              <CategoryCard collapsed category={category} />
            ))}
          </Wrapper>
        </>
      ) : null}
    </Container>
  );
}
