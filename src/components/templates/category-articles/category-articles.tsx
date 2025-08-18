'use client';

import React from 'react';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {keepPreviousData, useQuery, useQueryClient} from '@tanstack/react-query';
import {useParams, useSearchParams} from 'next/navigation';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Description} from '@/components/molecules/description';
import {Slider} from '@/components/organisms/slider';
import {searchArticleByCategory} from '@/graphql';
import {ArticleType, CategoryType} from '@/graphql/generated/types';
import {findCategoryBySlug} from '@/graphql/query/categories/find-category-by-slug';
import {useUpdateSearchParam} from '@/hooks';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Pagination} from './articles.styled';

interface Props {
  hasPdf?: boolean;
}

const SHOWCASE_COUNT = 6; // first 6 shown in slider + recent
const READMORE_PAGE_COUNT = 18; // per-page grid items

export default function CategoryArticlesView({hasPdf = false}: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();
  const page = Number(searchParams.get('page') ?? '1');

  const queryClient = useQueryClient();
  const slug = params.categoryId as string;

  // Use hydrated cache from server; fetch only if missing
  const cached = queryClient.getQueryData(['find-category', slug]) as
    | {result?: CategoryType}
    | undefined;

  const {data: category} = useQuery({
    queryKey: ['find-category', slug],
    queryFn: () => findCategoryBySlug({slug}),
    enabled: !cached,
    initialData: cached as any,
  });

  const categoryId = category?._id;

  const enabled = Boolean(categoryId);

  // Main paged list
  const {data, isFetching, isLoading} = useQuery({
    queryKey: ['search-articles-by-category', categoryId, page],
    queryFn: () =>
      searchArticleByCategory({
        categories: [categoryId as string],
        count: READMORE_PAGE_COUNT,
        page,
        hasPdf,
      }),
    enabled,
    placeholderData: keepPreviousData,
  }) as any;

  // Recent block (only page 1)
  const {data: recentArticlesData} = useQuery({
    queryKey: ['category-recent-articles', categoryId],
    queryFn: () =>
      searchArticleByCategory({
        categories: [categoryId as string],
        count: SHOWCASE_COUNT,
        page: 1,
        hasPdf,
      }),
    enabled: enabled && page === 1,
  }) as any;

  const articles: Array<ArticleType> = data?.article?.searchArticles?.results ?? [];
  const recentArticles: Array<ArticleType> =
    recentArticlesData?.article?.searchArticles?.results ?? [];

  const {totalPages = 0, totalCount: rawTotalCount = 0} = data?.article?.searchArticles ?? {};

  // Page 1 hides the first SHOWCASE_COUNT in the grid (they’re used in the slider/recent)
  const totalCount =
    page === 1 && rawTotalCount > SHOWCASE_COUNT ? rawTotalCount - SHOWCASE_COUNT : rawTotalCount;

  const startResult = (page - 1) * READMORE_PAGE_COUNT + 1 - (page === 1 ? SHOWCASE_COUNT : 0);
  const endResultBase = page * READMORE_PAGE_COUNT - (page === 1 ? SHOWCASE_COUNT : 0);
  const endResult = Math.min(endResultBase, totalCount);

  const gridArticles = page === 1 ? articles.slice(SHOWCASE_COUNT) : articles;

  // Loading state
  if (isLoading || !categoryId) {
    return (
      <div
        className={css({
          display: 'flex',
          minH: 'screen',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <div className={css({textStyle: 'body2', color: 'gray5'})}>Loading…</div>
      </div>
    );
  }

  // Empty state (for paged results beyond first)
  if (!isFetching && gridArticles.length < 1 && page > 1) {
    return (
      <div
        className={css({
          display: 'flex',
          minH: 'screen',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <h2 className={css({textStyle: 'h2'})}>No articles found!</h2>
      </div>
    );
  }

  return (
    <>
      {/* H1 + count (matches Tag page) */}
      <div
        className={css({
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          mb: -6,
        })}
      >
        <h1 className={css({textStyle: 'h1', color: 'text.primary', px: '-4'})}>
          {category?.title}
        </h1>
      </div>

      {category.originalDescription || category.description ? (
        <div className={css({mb: -6})}>
          <Description>{category.originalDescription || category.description}</Description>
        </div>
      ) : null}

      {/* Only page 1: Slider + Recent */}
      {page === 1 && recentArticles.length > 0 && (
        <>
          <Box className={css({mx: {mdDown: '-4'}})}>
            <Slider slides={recentArticles.slice(0, 3)} hasPdf={hasPdf} />
          </Box>
          <RecentArticles posts={recentArticles.slice(3)} hasPdf={hasPdf} />
        </>
      )}

      {/* Keep Reading */}
      {gridArticles.length > 0 && (
        <>
          <Divider label='Keep Reading' />
          <Articles articles={gridArticles} hasPdf={hasPdf} />
        </>
      )}

      {/* Pagination + range */}
      {totalCount > 0 && (
        <>
          <div className={css({mt: 6, mb: -6})}>
            <Pagination
              forcePage={page - 1}
              nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
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
          </div>

          <span
            className={css({
              color: 'gray4',
              fontWeight: 300,
              fontSize: '14px',
              textAlign: 'center',
            })}
          >
            Showing {Math.max(startResult, 1)}–{Math.max(endResult, 0)} of {totalCount}
          </span>
        </>
      )}
    </>
  );
}
