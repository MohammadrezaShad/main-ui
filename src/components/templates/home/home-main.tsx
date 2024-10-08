'use client';

import {useEffect, useState} from 'react';
import Select from 'react-select';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {hero, IconSearch} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {
  ArticleSortType,
  ArticleType,
  CategoryType,
  searchArticles,
  searchCategories,
  StatusType,
} from '@/graphql';

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
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  mdDown: {
                    flexDirection: 'column',
                    gap: 2,
                  },
                  py: '7',
                })}
                flex={1}
              >
                <Box
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                    borderRight: '1px solid token(colors.gray3)',
                    px: '6',
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
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                    borderRight: '1px solid token(colors.gray3)',
                    px: '6',
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
                  className={css({
                    width: {
                      base: '1/3',
                      mdDown: 'full',
                    },
                    bgColor: {
                      mdDown: 'white',
                    },
                    px: '6',
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
