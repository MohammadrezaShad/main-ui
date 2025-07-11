'use client';

import {useEffect, useState} from 'react';
import {css} from '@styled/css';
import {Box, Divider as StyledDivider} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

import {hero, IconSearch} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {
  ArticleSortType,
  ArticleType,
  searchArticles,
  searchCities,
  searchCountries,
  searchHomepages,
  searchProductCategories,
  StatusType,
} from '@/graphql';

import AsyncSelect from '../products/async-select';
import {
  Container,
  Content,
  Hero,
  HeroShade,
  HeroWrapper,
  SearchButton,
  SearchContainer,
  TitleWrapper,
  Underline,
} from './home.styled';

interface CategoryOption {
  id: string;
  value: string;
  label: string;
}

export default function HomeMain() {
  const seoData = useQuery({
    queryKey: ['homepage-seo'],
    queryFn: () => searchHomepages({}),
  });

  const router = useRouter();
  const [primaryCategory, setPrimaryCategory] = useState<CategoryOption | null>(null);
  const [countryName, setCountryName] = useState<{id: string; value: string; label: string} | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    value: string;
    label: string;
  } | null>(null);
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['showcase-articles'],
    queryFn: ({pageParam}) =>
      searchArticles({
        status: StatusType.Publish,
        count: 12,
        page: pageParam,
        isShowcase: true,
        sortType: ArticleSortType.AscendingOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages, lastPagParam, allPagesParam) => {
      const totalPages = lastPage?.article?.searchArticles?.totalPages;
      if (totalPages) {
        return lastPagParam + 1 <= totalPages ? lastPagParam + 1 : undefined;
      }

      return undefined;
    },
  }) as any;
  const recentArticlesData = useQuery({
    queryKey: ['recent-articles', 1],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 3}),
  }) as any;

  const [articles, setArticles] = useState<ArticleType[]>(
    data.pages[0].article.searchArticles.results,
  );
  const recentArticles = recentArticlesData.data?.article.searchArticles.results;

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    const categories = primaryCategory?.value;

    if (categories) searchParams.append('categories', categories);
    if (selectedLocation?.value) searchParams.append('city', selectedLocation.value);

    const queryString = searchParams.toString();
    router.push(`/products${queryString ? `?${queryString}` : ''}`);
  };

  const loadProductCategories = async (searchText: string) => {
    const response = await searchProductCategories({
      page: 1,
      count: 50,
      text: searchText,
    });

    return response.results?.map(category => ({
      id: category._id,
      value: category._id,
      label: category.title,
    }));
  };

  const loadCities = async (searchText: string, countryId?: string) => {
    const response = await searchCities({
      page: 1,
      count: 50,
      text: searchText,
      parent: countryId || countryName?.value || undefined,
    });

    return response.results?.map(city => ({
      id: city._id,
      value: city._id,
      label: city.name,
    }));
  };

  const loadCountries = async (searchText: string) => {
    const response = await searchCountries({
      page: 1,
      count: 50,
      text: searchText,
    });

    return response.results?.map(country => ({
      id: country._id,
      value: country._id,
      label: country.name,
    }));
  };

  useEffect(() => {
    if (data) {
      const _articles =
        data?.pages.reduce(
          (acc: any, page: any, index: any) =>
            index !== 0 ? [...acc, ...page?.article?.searchArticles.results] : [...acc],
          data?.pages[0]?.article?.searchArticles.results,
        ) || [];
      setArticles(_articles);
    }
  }, [data]);

  return (
    <>
      <Hero>
        <HeroShade />
        <HeroWrapper style={{backgroundImage: `url(${hero.src})`}}>
          <Content>
            <TitleWrapper>
              Experienced Corporates are
              <br />
              ready to contact with you.
            </TitleWrapper>
            <Underline />
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
                  p={6}
                  className={css({
                    w: {
                      base: '1/3',
                      mdDown: '100%',
                    },
                    px: {
                      base: '6',
                      mdDown: '0',
                    },
                    py: {
                      base: '6',
                      mdDown: '2',
                    },
                  })}
                >
                  <AsyncSelect
                    loadOptions={loadProductCategories as any}
                    onChange={setPrimaryCategory}
                    placeholder='Select category...'
                    defaultOptions
                  />
                </Box>
                <StyledDivider
                  orientation='vertical'
                  className={css({
                    height: '8',
                    borderColor: '#E3E3E3',
                    mdDown: {
                      display: 'none',
                    },
                  })}
                />
                <Box
                  p={6}
                  className={css({
                    w: {
                      base: '1/3',
                      mdDown: '100%',
                    },
                    px: {
                      base: '6',
                      mdDown: '0',
                    },
                    py: {
                      base: '6',
                      mdDown: '2',
                    },
                  })}
                >
                  <AsyncSelect
                    loadOptions={loadCountries as any}
                    onChange={setCountryName}
                    placeholder='Select country...'
                    defaultOptions
                  />
                </Box>
                <StyledDivider
                  orientation='vertical'
                  className={css({
                    height: '8',
                    borderColor: '#E3E3E3',
                    mdDown: {
                      display: 'none',
                    },
                  })}
                />
                <Box
                  p={6}
                  className={css({
                    w: {
                      base: '1/3',
                      mdDown: '100%',
                    },
                    px: {
                      base: '6',
                      mdDown: '0',
                    },
                    py: {
                      base: '6',
                      mdDown: '2',
                    },
                  })}
                >
                  <AsyncSelect
                    key={countryName?.value}
                    loadOptions={val => loadCities(val, countryName?.value) as any}
                    onChange={setSelectedLocation}
                    placeholder='Select City...'
                    defaultOptions
                  />
                </Box>
              </Box>
              <SearchButton onClick={handleSearch}>
                <IconSearch />
                <span
                  className={css({
                    textStyle: 'h4',
                    color: 'text.primary',
                    hideFrom: 'md',
                  })}
                >
                  SEARCH
                </span>
              </SearchButton>
            </SearchContainer>
          </Content>
        </HeroWrapper>
      </Hero>
      <Container className={css({mt: '8'})}>
        <h1 className='visually-hidden'>{seoData.data?.results?.[0]?.title}</h1>
        <RecentArticles posts={recentArticles} />
        <Divider label='Keep Reading' />
        <Articles articles={articles} />
        {hasNextPage ? (
          <div
            className={css({
              mt: 6,
              mb: -6,
            })}
          >
            <button
              type='button'
              onClick={() => fetchNextPage()}
              className={css({
                backgroundColor: 'primary',
                px: '4',
                py: '3',
                mx: 'auto',
                display: 'block',
                cursor: 'pointer',
              })}
            >
              <span
                className={css({
                  textStyle: 'body',
                  color: 'text.invert',
                })}
              >
                Show more
              </span>
            </button>
          </div>
        ) : null}
      </Container>
    </>
  );
}
