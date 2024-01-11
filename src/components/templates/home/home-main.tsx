'use client';

import {IconSearch, hero} from '@/assets';
import {Articles, Divider, RecentArticles, Spinner} from '@/components';
import {ArticleType, CategoryType, StatusType} from '@/graphql/generated/types';
import {searchCategories} from '@/graphql/query/categories';
import {searchArticles} from '@/graphql/query/search-articles';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import Select from 'react-select';
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

const cities = [{id: 1, value: 'amsterdam', label: 'Amsterdam'}];

export default function HomeMain() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const {data, fetchNextPage, hasNextPage, isError, isFetching, isLoading, isFetched, refetch} =
    useInfiniteQuery({
      queryKey: ['search-articles-home'],
      queryFn: ({pageParam}) =>
        searchArticles({status: StatusType.Publish, count: 15, page: pageParam}),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any, allPages, lastPagParam, allPagesParam) => {
        const totalPages = lastPage?.article?.searchArticles?.totalPages;
        if (totalPages) {
          return lastPagParam + 1 <= totalPages ? lastPagParam + 1 : undefined;
        }

        return undefined;
      },
    }) as any;
  const res = useQuery({
    queryKey: ['search-categories-home'],
    queryFn: () => searchCategories({}),
  }) as any;

  const categories: Array<CategoryType> = res.data.category!.searchCategories.results;
  const options = categories.map(category => ({
    id: category._id,
    value: category._id,
    label: category.title,
  }));

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
                  mdDown: {
                    flexDirection: 'column',
                    gap: 2,
                  },
                })}
                flex={1}
              >
                <Box
                  p={6}
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                  })}
                >
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

                <Box
                  p={6}
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                  })}
                >
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
                <Box
                  p={6}
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                  })}
                >
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <RecentArticles posts={articles?.slice(0, 3)} />
            <Divider label='Keep Reading' />
            <Articles articles={articles?.slice(3)} />
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
          </>
        )}
      </Container>
    </>
  );
}
