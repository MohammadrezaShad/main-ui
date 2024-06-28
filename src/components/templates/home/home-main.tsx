'use client';

import Select from 'react-select';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'next/navigation';

import {hero, IconChevronLeft, IconChevronRight, IconSearch} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {CategoryType, searchArticles, searchCategories, StatusType} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';

import {Pagination} from '../articles/articles.styled';
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
  const updateSearchParams = useUpdateSearchParam();
  const searchParams = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');
  const {data} = useQuery({
    queryKey: ['search-articles-home', page],
    queryFn: ({pageParam}) => searchArticles({status: StatusType.Publish, count: 18, page}),
    placeholderData: keepPreviousData,
  }) as any;

  const articles = data?.article.searchArticles.results;

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

  const totalPages = data?.article?.searchArticles?.totalPages as number;
  const totalCount = data?.article?.searchArticles?.totalCount as number;
  const count = 12;

  const startResult = (+page - 1) * count + 1;
  const endResult = Math.min(+page * count, totalCount || 0);

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
        <RecentArticles posts={articles?.slice(0, 3)} />
        <Divider label='Keep Reading' />
        <Articles articles={articles?.slice(3)} />

        <div
          className={css({
            mt: 6,
            mb: -6,
            mx: 'auto',
          })}
        >
          <Pagination
            nextLabel={<IconChevronRight />}
            onPageChange={current => updateSearchParams('page', String(current.selected + 1))}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
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
          <span
            className={css({
              color: 'gray4',
              fontWeight: 300,
              fontSize: '14px',
              textAlign: 'center',
            })}
          >
            Showing {startResult}-{endResult} of {totalCount || 0}
          </span>
        </div>
      </Container>
    </>
  );
}
