'use client';

import {useState} from 'react';
import Select from 'react-select';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'next/navigation';

import {IconChevronLeft, IconChevronRight, IconSearch} from '@/assets';
import {Pagination} from '@/components/templates/articles/articles.styled';
import ProductCard from '@/components/templates/business/product-card';
import {searchProducts} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';

import {
  Cards,
  Content,
  Hero,
  HeroShade,
  HeroWrapper,
  SearchButton,
  SearchContainer,
  TitleWrapper,
} from './home.styled';

const options = [{id: 1, value: '', label: 'Category'}];
const cities = [{id: 1, value: 'amsterdam', label: 'Amsterdam'}];

export default function ProductsView() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState(searchParams.get('categories') || undefined);
  const [city, setCity] = useState(searchParams.get('city'));
  const [minimumCompanyRating, setMinimumCompanyRating] = useState(
    searchParams.get('minimumCompanyRating') || undefined,
  );
  const [minimumProductRating, setMinimumProductRating] = useState(
    searchParams.get('minimumProductRating') || undefined,
  );
  const [lowPrice, setLowPrice] = useState(searchParams.get('lowPrice') || 0);
  const [highPrice, setHighPrice] = useState(searchParams.get('highPrice') || 0);

  const {data} = useQuery({
    queryKey: [
      'search-products',
      page,
      categories,
      city,
      minimumCompanyRating,
      minimumProductRating,
      lowPrice,
      highPrice,
    ],
    queryFn: () =>
      searchProducts({
        page: +page,
        count: 6,
        categories: categories ? categories.split(',') : undefined,
        city,
        minimumCompanyRating: minimumCompanyRating ? +minimumCompanyRating : undefined,
        minimumProductRating: minimumProductRating ? +minimumProductRating : undefined,
        lowPrice: +lowPrice,
        highPrice: highPrice ? +highPrice : undefined,
      }),
  });

  return (
    <>
      <Hero>
        <HeroShade />
        <HeroWrapper>
          <Content>
            <TitleWrapper>Search</TitleWrapper>
            <SearchContainer>
              <Box
                className={flex({
                  alignItems: 'center',
                })}
                flex={1}
              >
                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={options[0]}
                    options={options}
                  />
                </Box>

                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={options[0]}
                    options={options}
                  />
                </Box>
                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={cities[0]}
                    options={cities}
                  />
                </Box>
              </Box>
              <SearchButton>
                <IconSearch />
              </SearchButton>
            </SearchContainer>
          </Content>
        </HeroWrapper>
      </Hero>
      <Cards>
        {data?.results?.map(product => (
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
        ))}
      </Cards>

      {data?.totalCount && data.totalCount > 6 ? (
        <Pagination
          nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
          onPageChange={current => setPage(current.selected + 1)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.totalPages || 1}
          previousLabel={<IconChevronLeft />}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
        />
      ) : null}
    </>
  );
}
