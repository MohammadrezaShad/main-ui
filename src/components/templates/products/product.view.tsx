/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {memo, Suspense, useEffect, useState} from 'react';
import {css, cx} from '@styled/css';
import {Flex} from '@styled/jsx';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {IconDrop} from '@/assets';
import {findProductBySlug} from '@/graphql/query/products/find-product-by-slug';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {MarketplaceSelect} from './market-place-select';
import RelatedProducts from './related-products';
import StarRatingComponent from './star-rating';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const ProductView = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const params = useParams();
  const {data, refetch} = useQuery({
    queryKey: ['get-product', params.slug],
    queryFn: () => findProductBySlug({slug: params.slug as string}),
  });
  const product = data?.result;
  const [selectedColor, setSelectedColor] = useState(
    product?.variations?.[0]?.variationAttributes?.[0]?.value,
  );
  const [selectedVariationn, setSelectedVariation] = useState(product?.variations?.[0]);

  useEffect(() => {
    const findVariationBasedOnColor = (color: string) =>
      product?.variations?.find(variation =>
        variation.variationAttributes?.find(attr => attr.value === color),
      );
    if (selectedColor) {
      const variation = findVariationBasedOnColor(selectedColor);
      setSelectedVariation(variation);
    }
  }, [selectedColor, product?.variations]);

  return (
    <div className={css({width: '100%', padding: '16px'})}>
      <p
        className={css({
          textStyle: 'body',
          color: 'gray4',
        })}
      >
        {product?.category?.title}
      </p>
      <h1 className={css({textStyle: 'h1', color: '#333333'})}>{product?.title}</h1>
      <div className={css({hideFrom: 'md', display: 'flex', color: 'gray4', mb: '6'})}>
        <IconDrop className={css({w: 6, h: 6, mr: '2'})} />
        <span>{product?.rate ?? 0} / 10</span>
      </div>
      <div
        className={css({
          w: 'full',
          display: 'flex',
          alignItems: 'stretch',
          gap: '6',
          flexDirection: {base: 'column', md: 'row'},
        })}
      >
        <div
          className={cx(
            'product',
            css({
              width: {
                base: '[548px]',
                mdDown: 'full',
              },
              height: {
                md: '[548px]',
              },
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'relative',
              marginBottom: '20px',
            }),
          )}
        >
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            spaceBetween={10}
            thumbs={{swiper: thumbsSwiper}}
            modules={[FreeMode, Thumbs]}
            className={cx(
              'mySwiper2',
              css({
                mdDown: {
                  height: '[343px] !important',
                  mb: '4',
                },
              }),
            )}
          >
            {product?.images?.map(image => (
              <SwiperSlide key={image._id}>
                <img
                  src={`${IMAGE_STORAGE_URL}/${image.filename}-${image._id}`}
                  alt={image.filename}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={28}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className={cx(
              'mySwiper',
              css({
                md: {
                  bgGradient: 'to-b',
                  gradientFrom: '#00000000',
                  gradientTo: '#000',
                },
                mt: {
                  base: '[-120px]',
                  mdDown: 0,
                },
              }),
            )}
          >
            {product?.images?.map(image => (
              <SwiperSlide key={image._id}>
                <img
                  src={`${IMAGE_STORAGE_URL}/${image.filename}-${image._id}`}
                  alt={image.filename}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <div>
            <p
              className={css({
                textStyle: 'body',
                color: 'gray4',
                hideBelow: 'md',
              })}
            >
              {product?.category?.title}
            </p>
            <h2 className={css({textStyle: 'h1', color: '#333333', hideBelow: 'md'})}>
              {product?.title}
            </h2>
            <div className={css({hideBelow: 'md'})}>
              <StarRatingComponent rating={product?.rate || 0} />
            </div>
            <div
              className={css({
                h: '1px',
                w: '226px',
                bgGradient: 'to-r',
                gradientFrom: '#E3E3E3',
                gradientTo: '#E3E3E300',
                my: '4',
                hideBelow: 'md',
              })}
            />
            <div className={css({hideFrom: 'md'})}>
              {selectedVariationn?.variationAttributes?.map(
                attr =>
                  attr.isMainFeature &&
                  attr.name !== 'Color' && (
                    <div
                      key={attr.name}
                      className={css({
                        display: 'grid',
                        alignItems: 'start',
                        gap: '4',
                        mb: '2',
                        gridTemplateColumns: '2',
                      })}
                    >
                      <Flex gap={2}>
                        <Image
                          unoptimized
                          width={20}
                          height={20}
                          src={attr.icon || ''}
                          alt=''
                          className={css({w: '5', h: '5', objectFit: 'cover'})}
                        />
                        <p className={css({textStyle: 'body', color: '#6E7072'})}>{attr.name}</p>
                      </Flex>
                      <p className={css({textStyle: 'body', color: '#333333'})}>{attr.value}</p>
                    </div>
                  ),
              )}
            </div>
            <div
              className={css({
                h: '1px',
                w: '226px',
                bgGradient: 'to-r',
                gradientFrom: '#E3E3E3',
                gradientTo: '#E3E3E300',
                my: '4',
                hideFrom: 'md',
              })}
            />
            <p className={css({textStyle: 'body', color: '#333333', mb: '14px'})}>Color</p>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '4',
                mb: '8',
              })}
            >
              {product?.variations?.map(variation => {
                const colorId = `color-${variation._id}`;
                return (
                  <label
                    htmlFor={colorId}
                    style={{backgroundColor: variation.variationAttributes?.[0]?.value || '#000'}}
                    key={variation._id}
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4',
                      w: '36px',
                      h: '36px',
                      outline:
                        selectedColor === variation.variationAttributes?.[0]?.value
                          ? '1px solid #44BAEB'
                          : 'none',
                      outlineOffset: '2px',
                      cursor: 'pointer',
                    })}
                  >
                    <input
                      id={colorId}
                      type='radio'
                      name='color'
                      value={selectedColor}
                      onChange={() => setSelectedColor(variation.variationAttributes?.[0]?.value)}
                      className={css({
                        display: 'none',
                        opacity: 0,
                        visibility: 'hidden',
                      })}
                    />
                  </label>
                );
              })}
            </div>
            <div className={css({hideBelow: 'md'})}>
              {selectedVariationn?.variationAttributes?.map(
                attr =>
                  attr.isMainFeature &&
                  attr.name !== 'Color' && (
                    <div
                      key={attr.name}
                      className={css({
                        display: 'grid',
                        alignItems: 'center',
                        gap: '4',
                        mb: '2',
                        gridTemplateColumns: '2',
                      })}
                    >
                      <Flex gap={2}>
                        <Image
                          unoptimized
                          width={20}
                          height={20}
                          src={attr.icon || ''}
                          alt=''
                          className={css({w: '5', h: '5', objectFit: 'cover'})}
                        />
                        <p className={css({textStyle: 'body', color: '#6E7072'})}>{attr.name}</p>
                      </Flex>
                      <p className={css({textStyle: 'body', color: '#333333'})}>{attr.value}</p>
                    </div>
                  ),
              )}
            </div>
            <p className={css({textStyle: 'h1', color: '#44BAEB', mt: '9', mb: '31px'})}>
              ${selectedVariationn?.cost}
            </p>
            <Flex gap={4} hideBelow='md'>
              {product?.amazon ? (
                <Link
                  href={product.amazon}
                  className={css({
                    justifyContent: 'center',
                    alignSelf: 'center',
                    pl: '12',
                    pr: '12',
                    pt: '3',
                    pb: '3',
                    mt: '4',
                    fontSize: 'base',
                    lineHeight: 'base',
                    textAlign: 'center',
                    color: 'white',
                    whiteSpace: 'nowrap',
                    bgColor: 'sky.400',
                    mdDown: {pl: '5', pr: '5'},
                    cursor: 'pointer',
                    marginTop: '[88px]',
                  })}
                >
                  Buy from Amazon
                </Link>
              ) : null}
              {product?.eBay ? (
                <Link
                  href={product.eBay}
                  className={css({
                    justifyContent: 'center',
                    alignSelf: 'center',
                    pl: '12',
                    pr: '12',
                    pt: '3',
                    pb: '3',
                    mt: '4',
                    fontSize: 'base',
                    lineHeight: 'base',
                    textAlign: 'center',
                    color: 'white',
                    whiteSpace: 'nowrap',
                    bgColor: 'sky.400',
                    mdDown: {pl: '5', pr: '5'},
                    cursor: 'pointer',
                    marginTop: '[88px]',
                  })}
                >
                  Buy from eBay
                </Link>
              ) : null}
              {product?.wallmart ? (
                <Link
                  href={product.wallmart}
                  className={css({
                    justifyContent: 'center',
                    alignSelf: 'center',
                    pl: '12',
                    pr: '12',
                    pt: '3',
                    pb: '3',
                    mt: '4',
                    fontSize: 'base',
                    lineHeight: 'base',
                    textAlign: 'center',
                    color: 'white',
                    whiteSpace: 'nowrap',
                    bgColor: 'sky.400',
                    mdDown: {pl: '5', pr: '5'},
                    cursor: 'pointer',
                    marginTop: '[88px]',
                  })}
                >
                  Buy from Walmart
                </Link>
              ) : null}
            </Flex>
            {product ? <MarketplaceSelect product={product} /> : null}
          </div>
        </div>
      </div>

      <div
        className={css({
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: '6',
        })}
      >
        <div className={css({bgColor: '#F7F7F7', p: '6', w: 'full'})}>
          <h2 className={css({fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'})}>
            About Product
          </h2>
          <p className={css({marginBottom: '20px'})}>{product?.about}</p>

          <ul
            className={css({marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '2'})}
          >
            {product?.keywords?.map(keyword => (
              <li key={keyword}>
                <span
                  className={css({
                    bgColor: 'success',
                    color: 'white',
                    rounded: 'md',
                    p: '1',
                    textStyle: 'captionB',
                    w: 'fit',
                  })}
                >
                  {keyword}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className={css({textStyle: 'headline3', color: '#333333', marginBottom: '16px'})}>
        Features
      </h3>
      <ul>
        {product?.features?.map((feature, index) => (
          <li
            key={feature.name}
            className={css({
              marginBottom: '8px',
              display: 'grid',
              gridTemplateColumns: '8',
              alignItems: 'start',
              gap: '70px',
              mb: '6',
            })}
          >
            <span className={css({textStyle: 'body', color: 'gray4'})}>{feature.name}:</span>
            <span
              style={{gridColumn: 'span 6'}}
              className={css({
                textStyle: 'body',
                color: '#333',
                display: 'inline-flex',
                pb: '4',
                borderBottom:
                  index !== (product?.features?.length || 1) - 1
                    ? '1px solid token(colors.gray3)'
                    : 'none',
              })}
            >
              {feature.value}
            </span>
          </li>
        ))}
      </ul>

      <div className={css({marginTop: '32px'})}>
        {product ? (
          <Suspense fallback={<div />}>
            <RelatedProducts productId={product._id} />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};
export default memo(ProductView);
