import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {Swiper, SwiperSlide} from 'swiper/react';

import ProductCard from '@/components/templates/business/product-card';
import {getSimilarProducts, StatusType} from '@/graphql';

const RelatedProducts = ({productId}: {productId: string}) => {
  const {data, isError, isLoading} = useQuery({
    queryKey: ['get-related-products', productId],
    queryFn: () => getSimilarProducts({product: productId}),
  });

  const availableProducts =
    data?.results?.filter(product => product.status === StatusType.Publish && product.isActive) ||
    [];

  return (
    <>
      {availableProducts.length > 0 ? (
        <h3 className={css({textStyle: 'headline3', color: '#333333', marginBottom: '16px'})}>
          You Might Also Like
        </h3>
      ) : null}
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
          {availableProducts?.map(product => (
            <SwiperSlide key={product._id}>
              <ProductCard
                id={product.slug as string}
                title={product.title}
                thumbnail={product.thumbnail || undefined}
                company={product.sellerCompany.title || ''}
                companyId={product.sellerCompany.slug as string}
                rating={product.sellerCompany.rate || 0}
                sellerCompanyId={product.sellerCompany._id}
                waterRating={product.rate || 0}
                price={product?.variations?.[0]?.cost?.toString() || ''}
                location={`${product.sellerCompany.country?.name}, ${product.sellerCompany.city?.map(c => c.name).join(', ')}`}
                keywords={product.keywords || []}
                phoneNumber={product.sellerCompany.callNumber || ''}
                website={product.sellerCompany.website || ''}
                coords={{
                  lat: product.sellerCompany.latitude,
                  lng: product.sellerCompany.longitude,
                }}
              />
            </SwiperSlide>
          ))}
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
        {availableProducts?.map(product => (
          <ProductCard
            key={product._id}
            id={product.slug as string}
            title={product.title}
            thumbnail={product.thumbnail || undefined}
            company={product.sellerCompany.title || ''}
            companyId={product.sellerCompany.slug as string}
            rating={product.sellerCompany.rate || 0}
            waterRating={product.rate || 0}
            price={product?.variations?.[0]?.cost?.toString() || ''}
            location={`${product.sellerCompany.country?.name}, ${product.sellerCompany.city?.map(c => c.name).join(', ')}`}
            keywords={product.keywords || []}
            phoneNumber={product.sellerCompany.callNumber || ''}
            sellerCompanyId={product.sellerCompany._id}
            website={product.sellerCompany.website || ''}
            coords={{
              lat: product.sellerCompany.latitude,
              lng: product.sellerCompany.longitude,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
