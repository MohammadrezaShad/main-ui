import {PostDate} from '@/components';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import Image, {StaticImageData} from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination as SWPagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

interface Slide {
  src: StaticImageData;
  alt: string;
  title: string;
  subtitle: string;
  date: string;
  href: string;
}

interface Props {
  slides: Array<Slide>;
}

const Slider = ({slides}: Props) => {
  return (
    <Swiper
      autoplay
      pagination={{type: 'bullets', clickable: true}}
      modules={[Navigation, SWPagination]}
      onSwiper={swiper => console.log(swiper)}
      className={css({
        w: 'full',
        h: '540px',
        maxW: '960px',
      })}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className={flex({
              position: 'relative',
              h: 'full',
              w: 'full',
            })}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className={css({
                display: 'block',
                w: 'full',
                h: 'full',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              })}
            />
            <Box
              className={flex({
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
              })}
            >
              <Box zIndex='50' mb='1'>
                <PostDate date={slide.date} />
              </Box>
              <h1
                className={css({
                  zIndex: '50',
                  textStyle: 'h1',
                  color: 'text.invert',
                })}
              >
                {slide.title}
              </h1>
              <p
                className={css({
                  zIndex: '50',
                  textStyle: 'subtitle1',
                  color: 'text.invert',
                })}
              >
                {slide.subtitle}
              </p>
              <Box zIndex='50' mt='4'>
                <button
                  className={css({
                    border: '1px solid token(colors.gray3)',
                    color: 'gray3',
                    px: '4',
                    py: '3',
                    cursor: 'pointer',
                  })}
                >
                  Read more ...
                </button>
              </Box>
            </Box>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
