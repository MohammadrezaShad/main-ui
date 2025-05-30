import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import Image from 'next/image';
import Link from 'next/link';
import {Navigation, Pagination as SWPagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {PostDate} from '@/components';
import {ArticleType} from '@/graphql/generated/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  slides: Array<ArticleType>;
  hasPdf?: boolean;
}

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL!;

const Slider = ({slides, hasPdf = false}: Props) => (
  <Swiper
    autoplay
    pagination={{type: 'bullets', clickable: true}}
    modules={[Navigation, SWPagination]}
    onSwiper={swiper => console.log(swiper)}
    className={css({
      w: 'full',
      h: '540px',
      maxW: '960px',
      mdDown: {
        h: 'max',
      },
    })}
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={slide._id}>
        <div
          className={flex({
            position: 'relative',
            h: 'full',
            w: 'full',
            mdDown: {
              flexDir: 'column',
              h: 'max',
            },
          })}
        >
          {slide.thumbnail ? (
            <Image
              unoptimized
              width={900}
              height={500}
              src={`${IMAGE_STORAGE_URL}/${slide.thumbnail?.filename}-${slide.thumbnail?._id}`}
              alt={slide.title}
              className={css({
                display: 'block',
                w: 'full',
                h: 'full',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
                mdDown: {
                  position: 'relative',
                  w: 'full',
                  h: 'auto',
                },
              })}
            />
          ) : null}
          <Box
            className={css({
              display: 'flex',
              justifyContent: 'end',
              h: 'full',
              w: 'full',
              position: 'absolute',
              inset: 0,
              py: '8',
              px: '16',
              flexDir: 'column',
              zIndex: '50',
              bgGradient: 'to-b',
              gradientFrom: '#00000000',
              gradientVia: '#00000000',
              gradientTo: '#000000',
              mdDown: {
                justifyContent: 'start',
                position: 'relative',
                gradientTo: '#00000000',
                h: 'max',
                py: '6',
                px: '6',
              },
            })}
          >
            <Box zIndex='50' mb='1'>
              <PostDate date={slide.publishDate} />
            </Box>
            <p
              className={css({
                zIndex: '50',
                textStyle: 'h1',
                color: 'text.invert',
                mdDown: {
                  color: 'text.primary',
                },
              })}
            >
              {slide.title}
            </p>
            <p
              className={css({
                zIndex: '50',
                textStyle: 'subtitle1',
                color: 'text.invert',
                lineClamp: '2',
                mdDown: {
                  color: 'text.primary',
                  display: 'none',
                },
              })}
            >
              {slide.excerpt}
            </p>
            <Box zIndex='50' mt='4'>
              <Link
                href={`/${hasPdf ? 'pdf-articles' : 'articles'}/${slide.slug}`}
                className={css({
                  border: '1px solid token(colors.gray3)',
                  color: 'gray3',
                  px: '4',
                  py: '2.5',
                  cursor: 'pointer',
                  lineHeight: '[18.38px]',
                  display: 'inline-block',
                  h: '10',
                  mdDown: {
                    border: '1px solid token(colors.text.primary)',
                    color: 'text.primary',
                    mb: '4',
                  },
                })}
              >
                Read more ...
              </Link>
            </Box>
          </Box>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Slider;
