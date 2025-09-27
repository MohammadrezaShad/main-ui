/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {css} from '@styled/css';
import {Box, Divider} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
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
  StatusType,
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
} from './home.styled';

type Option = {id: string; value: string; label: string};

const parseCsv = (csv?: string | null) =>
  (csv || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

const uniqByValue = (arr: Option[]) => Array.from(new Map(arr.map(o => [o.value, o])).values());

export default function ProductsView() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();

  // ---- URL params (as strings from the URL) ----
  const pageStr = searchParams.get('page') ?? '1';
  const categoriesParam = searchParams.get('categories') || '';
  const cityParam = searchParams.get('city') || '';
  const minimumCompanyRatingStr = searchParams.get('minimumCompanyRating') || '';
  const minimumProductRatingStr = searchParams.get('minimumProductRating') || '';
  const lowPriceStr = searchParams.get('lowPrice') || '';
  const highPriceStr = searchParams.get('highPrice') || '';

  // ---- Normalized/query-ready values ----
  const page = Number(pageStr || '1') || 1;
  const categoryIds = useMemo(
    () => Array.from(new Set(parseCsv(categoriesParam))),
    [categoriesParam],
  );
  const cityId = cityParam || undefined;
  const minimumCompanyRating = minimumCompanyRatingStr
    ? Number(minimumCompanyRatingStr)
    : undefined;
  const minimumProductRating = minimumProductRatingStr
    ? Number(minimumProductRatingStr)
    : undefined;
  const lowPrice = lowPriceStr ? Number(lowPriceStr) : undefined;
  const highPrice = highPriceStr ? Number(highPriceStr) : undefined;

  // ---- UI state for select values / chips ----
  const [cityName, setCityName] = useState<string | undefined>();
  const [countryName, setCountryName] = useState<Option[] | undefined>();
  const [categoriesName, setCategoriesName] = useState<Option[]>([]);

  // Abort controllers to prevent stale overwrites
  const cityAbortRef = useRef<AbortController | null>(null);
  const catsAbortRef = useRef<AbortController | null>(null);

  // ======= Data query =======
  const {data, isLoading, isError, error, refetch} = useQuery({
    // IMPORTANT: use the **same shape** as on the server (all strings)
    queryKey: [
      'search-products',
      pageStr, // <-- string, matches server prefetch
      categoriesParam,
      cityParam,
      minimumCompanyRatingStr,
      minimumProductRatingStr,
      lowPriceStr,
      highPriceStr,
    ],
    queryFn: () =>
      searchProducts({
        page,
        count: 8,
        categories: categoryIds.length ? categoryIds : undefined,
        city: cityId,
        minimumCompanyRating,
        minimumProductRating,
        lowPrice,
        highPrice,
        isActive: true,
        status: 'PUBLISH' as StatusType,
      }),
    // prevent initial refetch flash after hydration
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  });

  // Only show the big loader when we truly have no data yet
  const showInitialLoading = !data && isLoading;

  // ======= AsyncSelect option loaders =======
  const filterProductCategories = async (inputValue: string) => {
    const response = await searchProductCategories({page: 1, count: 50, text: inputValue});
    return (response.results ?? []).map(r => ({id: r._id, value: r._id, label: r.title}) as Option);
  };

  const filterCountries = async (inputValue: string) => {
    const response = await searchCountries({page: 1, count: 50, text: inputValue});
    return (response.results ?? []).map(r => ({id: r._id, value: r._id, label: r.name}) as Option);
  };

  const filterCities = async (inputValue: string, countryId?: string) => {
    const response = await searchCities({
      page: 1,
      count: 50,
      text: inputValue,
      parent: countryId || countryName?.[0]?.id || undefined,
    });
    return (response.results ?? []).map(r => ({id: r._id, value: r._id, label: r.name}) as Option);
  };

  const categoryOptions = (input: string) => filterProductCategories(input);
  const cityOptions = (input: string, country?: string) => filterCities(input, country);
  const countryOptions = (input: string) => filterCountries(input);

  // ======= Sync chips from URL (with cancellation) =======
  useEffect(() => {
    if (cityAbortRef.current) cityAbortRef.current.abort();
    const cityCtl = new AbortController();
    cityAbortRef.current = cityCtl;

    if (cityId) {
      findCityById({id: cityId})
        .then(res => {
          if (!cityCtl.signal.aborted) setCityName(res.result?.name || undefined);
        })
        .catch(() => {
          if (!cityCtl.signal.aborted) setCityName(undefined);
        });
    } else {
      setCityName(undefined);
    }

    return () => {
      cityCtl.abort();
    };
  }, [cityId]);

  useEffect(() => {
    if (catsAbortRef.current) catsAbortRef.current.abort();
    const ctl = new AbortController();
    catsAbortRef.current = ctl;

    if (categoryIds.length) {
      Promise.all(
        categoryIds.map(id =>
          findProductCategoryById({id})
            .then(res => {
              const r = res?.result;
              return r ? ({id: r._id, value: r._id, label: r.title} as Option) : null;
            })
            .catch(() => null),
        ),
      ).then(list => {
        if (!ctl.signal.aborted) {
          const opts = (list.filter(Boolean) as Option[]) ?? [];
          setCategoriesName(uniqByValue(opts));
        }
      });
    } else {
      setCategoriesName([]);
    }

    return () => {
      ctl.abort();
    };
  }, [categoryIds.join(',')]);

  // ======= Render =======
  return (
    <>
      <Hero>
        <HeroShade />
        <HeroWrapper>
          <Content>
            <h1 className={css({textStyle: 'title2', textAlign: 'center', pb: '6', color: '#333'})}>
              Search
            </h1>

            {/* Search Bar */}
            <SearchContainer>
              <Box
                className={flex({
                  alignItems: 'center',
                  flexDir: {base: 'row', mdDown: 'column'},
                })}
                flex={1}
                style={{minWidth: 0}}
              >
                {/* Category */}
                <Box
                  className={css({
                    p: {base: '6', mdDown: '2'},
                    w: {base: '1/3', mdDown: 'full'},
                    px: {mdDown: '0 !important'},
                    minW: 0,
                  })}
                >
                  <AsyncSelect
                    loadOptions={categoryOptions as any}
                    onChange={(val: Option) => {
                      const existing = parseCsv(categoriesParam);
                      if (!existing.includes(val.value)) {
                        const newValue = existing.length
                          ? `${existing.join(',')},${val.value}`
                          : val.value;
                        updateSearchParams('categories', newValue);
                        setCategoriesName(prev => uniqByValue([...prev, val]));
                      }
                    }}
                    placeholder='Select category...'
                    defaultOptions
                    className={{h: {mdDown: '64px'}}}
                  />
                </Box>

                <Divider
                  hideBelow='md'
                  orientation='vertical'
                  className={css({
                    height: 'auto',
                    alignSelf: 'stretch',
                    borderColor: '#E3E3E3',
                  })}
                />

                {/* Country */}
                <Box
                  className={css({
                    p: {base: '6', mdDown: '2'},
                    w: {base: '1/3', mdDown: 'full'},
                    px: {mdDown: '0 !important'},
                    minW: 0,
                  })}
                >
                  <AsyncSelect
                    loadOptions={countryOptions as any}
                    onChange={(val: Option) => {
                      setCountryName([val]);
                      updateSearchParams('city', '');
                      setCityName(undefined);
                    }}
                    placeholder='Select Country...'
                    defaultOptions
                    className={{h: {mdDown: '64px'}}}
                  />
                </Box>

                <Divider
                  hideBelow='md'
                  orientation='vertical'
                  className={css({
                    height: 'auto',
                    alignSelf: 'stretch',
                    borderColor: '#E3E3E3',
                  })}
                />

                {/* City */}
                <Box
                  className={css({
                    p: {base: '6', mdDown: '2'},
                    w: {base: '1/3', mdDown: 'full'},
                    px: {mdDown: '0 !important'},
                    minW: 0,
                  })}
                >
                  <AsyncSelect
                    key={countryName?.[0]?.value}
                    loadOptions={(input: string) =>
                      cityOptions(input, countryName?.[0]?.value) as any
                    }
                    onChange={(val: Option) => {
                      setCityName(val.label);
                      updateSearchParams('city', val.value);
                    }}
                    placeholder='Select City...'
                    defaultOptions
                    className={{h: {mdDown: '64px'}}}
                  />
                </Box>
              </Box>

              {/* Optional; query already reacts to URL changes */}
              <SearchButton
                aria-label='Search'
                className={css({mdDown: {h: '10'}, md: {minW: '98px'}})}
                onClick={() => refetch()}
              >
                <IconSearch />
              </SearchButton>
            </SearchContainer>

            {/* Active chips */}
            <div
              className={css({
                w: 'full',
                mt: '6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6',
                flexWrap: 'wrap',
              })}
            >
              {cityId ? (
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
                  {cityName || 'Selected city'}
                  <button
                    type='button'
                    aria-label='Remove city filter'
                    onClick={() => updateSearchParams('city', '')}
                  >
                    <IconClose className={css({ms: '2', fill: 'white', cursor: 'pointer'})} />
                  </button>
                </span>
              ) : null}

              {categoriesName.length
                ? categoriesName.map(category => (
                    <span
                      key={category.value}
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
                        aria-label={`Remove ${category.label}`}
                        onClick={() => {
                          const remaining = parseCsv(categoriesParam).filter(
                            v => v !== category.value,
                          );
                          updateSearchParams('categories', remaining.join(','));
                          setCategoriesName(prev => prev.filter(c => c.value !== category.value));
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

      {/* Results area with loading / empty / error states */}
      {showInitialLoading ? (
        <div
          className={css({
            px: {base: '6', mdDown: 0},
            py: '8',
            textAlign: 'center',
            color: 'gray.600',
          })}
        >
          Loading products…
        </div>
      ) : isError ? (
        <div
          className={css({
            px: {base: '6', mdDown: 0},
            py: '8',
            textAlign: 'center',
            color: 'red.600',
          })}
        >
          {(error as Error)?.message || 'Failed to load products.'}
        </div>
      ) : (data?.results?.length ?? 0) === 0 ? (
        <div
          className={css({
            px: {base: '6', mdDown: 0},
            py: '8',
            textAlign: 'center',
            color: 'gray.700',
          })}
        >
          No products match your filters. Try adjusting them.
        </div>
      ) : (
        <>
          <Cards>
            {data?.results?.map(product => (
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
          </Cards>

          {data?.totalCount && data.totalCount > 8 ? (
            <Pagination
              forcePage={page - 1}
              nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
              onPageChange={current =>
                updateSearchParams('page', (current.selected + 1).toString())
              }
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
      )}
    </>
  );
}
