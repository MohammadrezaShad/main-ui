'use client';

import {useEffect, useState} from 'react';
import {css} from '@styled/css';
import {Box, Divider} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'next/navigation';

import {IconChevronLeft, IconChevronRight, IconClose, IconSearch} from '@/assets';
import {Pagination} from '@/components/templates/articles/articles.styled';
import ProductCard from '@/components/templates/business/product-card';
import {
  findCityById,
  findProductCategoryById,
  searchCities,
  searchCountries,
  searchProductCategories,
  searchProducts,
} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';

import AsyncSelect from './async-select';
import Filters from './filters';
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

export default function ProductsView() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const categories = searchParams.get('categories') || undefined;
  const city = searchParams.get('city') || undefined;
  const [cityName, setCityName] = useState<any>();
  const [countryName, setCountryName] = useState<{id: string; value: string; label: string}[]>();
  const [categoriesName, setCategoriesName] = useState<any[]>([]);
  const minimumCompanyRating = searchParams.get('minimumCompanyRating') || undefined;

  const minimumProductRating = searchParams.get('minimumProductRating') || undefined;

  const lowPrice = searchParams.get('lowPrice') || 0;
  const highPrice = searchParams.get('highPrice') || 0;

  const {data, refetch} = useQuery({
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
        lowPrice: lowPrice ? +lowPrice : undefined,
        highPrice: highPrice ? +highPrice : undefined,
        isActive: true,
      }),
  });

  const filterProductCategories = async (inputValue: string) => {
    const response = await searchProductCategories({
      page: 1,
      count: 50,
      text: inputValue,
    });
    return response.results?.map(result => ({
      id: result._id,
      value: result._id,
      label: result.title,
    }));
  };
  const filterCountries = async (inputValue: string) => {
    const response = await searchCountries({
      page: 1,
      count: 50,
      text: inputValue,
    });
    return response.results?.map(result => ({
      id: result._id,
      value: result._id,
      label: result.name,
    }));
  };
  const filterCities = async (inputValue: string, countryId?: string) => {
    const response = await searchCities({
      page: 1,
      count: 50,
      text: inputValue,
      parent: countryId || countryName?.[0]?.id || undefined,
    });
    return response.results?.map(result => ({
      id: result._id,
      value: result._id,
      label: result.name,
    }));
  };

  const categoryOptions = (inputValue: string) => filterProductCategories(inputValue);
  const cityOptions = (inputValue: string, country?: string) => filterCities(inputValue, country);
  const countryOptions = (inputValue: string) => filterCountries(inputValue);

  const getCityTitle = async (_city: string) => {
    const res = await findCityById({id: _city}).then(res => res.result?.name);
    return res;
  };

  useEffect(() => {
    if (city) {
      getCityTitle(city).then(res => {
        setCityName(res);
      });
    }
    if (categories) {
      const categoriesArray = categories.split(',');
      const categoryNames = categoriesArray.map(async category => {
        const res = await findProductCategoryById({id: category}).then(res => ({
          id: res?.result?._id,
          value: res?.result?._id,
          label: res?.result?.title,
        }));
        return res;
      });
      Promise.all(categoryNames).then(res => {
        setCategoriesName(res);
      });
    }
  }, [city, categories]);

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
                  flexDir: {
                    base: 'row',
                    mdDown: 'column',
                  },
                })}
                flex={1}
              >
                <Box
                  className={css({
                    p: {
                      base: '6',
                      mdDown: '2',
                    },
                    w: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    px: {
                      mdDown: '0 !important',
                    },
                  })}
                >
                  <AsyncSelect
                    loadOptions={categoryOptions as any}
                    onChange={val => {
                      setCategoriesName([val]);
                      const existingCategories = searchParams.get('categories');
                      const newValue = existingCategories
                        ? `${existingCategories},${val.value}`
                        : val.value;
                      updateSearchParams('categories', newValue);
                    }}
                    placeholder='Select category...'
                    defaultOptions
                    className={{
                      h: {
                        mdDown: '64px',
                      },
                    }}
                  />
                </Box>
                <Divider
                  hideBelow='md'
                  orientation='vertical'
                  className={css({height: '8', borderColor: '#E3E3E3'})}
                />
                <Box
                  className={css({
                    p: {
                      base: '6',
                      mdDown: '2',
                    },
                    w: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    px: {
                      mdDown: '0 !important',
                    },
                  })}
                >
                  <AsyncSelect
                    loadOptions={countryOptions as any}
                    onChange={val => {
                      setCountryName([val]);
                    }}
                    placeholder='Select Country...'
                    defaultOptions
                    className={{
                      h: {
                        mdDown: '64px',
                      },
                    }}
                  />
                </Box>
                <Divider
                  hideBelow='md'
                  orientation='vertical'
                  className={css({height: '8', borderColor: '#E3E3E3'})}
                />
                <Box
                  className={css({
                    p: {
                      base: '6',
                      mdDown: '2',
                    },
                    w: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    px: {
                      mdDown: '0 !important',
                    },
                  })}
                >
                  <AsyncSelect
                    key={countryName?.[0]?.value}
                    loadOptions={input => cityOptions(input, countryName?.[0]?.value) as any}
                    onChange={val => {
                      setCityName([val.value]);
                      const existingCategories = searchParams.get('city');
                      const newValue = existingCategories
                        ? `${existingCategories},${val.value}`
                        : val.value;
                      updateSearchParams('city', newValue);
                    }}
                    placeholder='Select City...'
                    defaultOptions
                    className={{
                      h: {
                        mdDown: '64px',
                      },
                    }}
                  />
                </Box>
              </Box>
              <SearchButton
                className={css({
                  mdDown: {
                    h: '10',
                  },
                })}
                onClick={() => refetch()}
              >
                <IconSearch />
              </SearchButton>
            </SearchContainer>
            <div
              className={css({
                w: 'full',
                mt: '6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6',
              })}
            >
              {city ? (
                <span
                  className={css({
                    bgColor: 'success',
                    color: 'white',
                    rounded: 'md',
                    p: '1',
                    textStyle: 'captionB',
                    w: 'fit',
                    display: 'inline-flex',
                    alignItems: 'center',
                  })}
                >
                  {cityName}
                  <button type='button' onClick={() => updateSearchParams('city', '')}>
                    <IconClose className={css({ms: '2', fill: 'white', cursor: 'pointer'})} />
                  </button>
                </span>
              ) : null}
              {categoriesName
                ? categoriesName.map((category: any) => (
                    <span
                      key={category}
                      className={css({
                        bgColor: 'success',
                        color: 'white',
                        rounded: 'md',
                        p: '1',
                        textStyle: 'captionB',
                        w: 'fit',
                        display: 'inline-flex',
                        alignItems: 'center',
                      })}
                    >
                      {category.label}
                      <button
                        type='button'
                        onClick={() => {
                          const existingCategories =
                            searchParams.get('categories')?.split(',') || [];
                          const filteredCategories = existingCategories.filter(
                            cat => cat !== category.value,
                          );
                          const newValue = filteredCategories.join(',');
                          updateSearchParams('categories', newValue);
                          setCategoriesName(prevCategories =>
                            prevCategories.filter(cat => cat.value !== category.value),
                          );
                        }}
                      >
                        <IconClose className={css({ms: '2', fill: 'white', cursor: 'pointer'})} />
                      </button>
                    </span>
                  ))
                : null}
            </div>
          </Content>
        </HeroWrapper>
      </Hero>
      <Filters />
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
          forcePage={page - 1}
          nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
          onPageChange={current => updateSearchParams('page', (current.selected + 1).toString())}
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
