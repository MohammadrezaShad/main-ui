import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {Swiper, SwiperSlide} from 'swiper/react';

import ProductCard from '@/components/templates/business/product-card';
import {getSimilarProducts} from '@/graphql';

const RelatedProducts = ({productId}: {productId: string}) => {
  const {data, isError, isLoading} = useQuery({
    queryKey: ['get-related-products', productId],
    queryFn: () => getSimilarProducts({product: productId}),
  });

  return (
    <>
      <div className={css({hideFrom: 'md', w: 'full'})}>
        <Swiper
          autoHeight
          autoplay
          slidesPerView={1.5}
          centeredSlides={!!data?.results?.length && data?.results?.length <= 1}
          spaceBetween='10'
          pagination={{type: 'bullets', clickable: true}}
          onSwiper={swiper => {}}
          className={css({
            w: 'full',
          })}
        >
          {data?.results?.map(
            product =>
              product.isActive && (
                <SwiperSlide key={product._id}>
                  <ProductCard
                    id={product.slug as string}
                    title={product.title}
                    thumbnail={product.thumbnail || undefined}
                    company={product.sellerCompany.title || ''}
                    rating={product.sellerCompany.rate || 0}
                    waterRating={product.rate || 0}
                    price={product?.variations?.[0]?.cost?.toString() || ''}
                    location={`${product.sellerCompany.country?.name}, ${product.sellerCompany.city?.name}`}
                    keywords={product.keywords || []}
                    phoneNumber={product.sellerCompany.callNumber || ''}
                    website={product.sellerCompany.website || ''}
                  />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '4',
          gap: '6',
          flexWrap: 'wrap',
          hideBelow: 'md',
        })}
      >
        {data?.results?.map(
          product =>
            product.isActive && (
              <ProductCard
                key={product._id}
                id={product.slug as string}
                title={product.title}
                thumbnail={product.thumbnail || undefined}
                company={product.sellerCompany.title || ''}
                rating={product.sellerCompany.rate || 0}
                waterRating={product.rate || 0}
                price={product?.variations?.[0]?.cost?.toString() || ''}
                location={`${product.sellerCompany.country?.name}, ${product.sellerCompany.city?.name}`}
                keywords={product.keywords || []}
                phoneNumber={product.sellerCompany.callNumber || ''}
                website={product.sellerCompany.website || ''}
              />
            ),
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
