'use client';

import {useState} from 'react';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';
import {searchArticleByCategory} from '@/graphql';
import {ArticleType} from '@/graphql/generated/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Pagination} from './articles.styled';

const Page = ({hasPdf = false}: {hasPdf?: boolean}) => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const SHOWCASE_COUNT = 6;
  const READMORE_PAGE_COUNT = 18;
  const {data, isFetching} = useQuery({
    queryKey: ['search-cs', params.categoryId, page],
    queryFn: () =>
      searchArticleByCategory({
        categories: [params.categoryId as string],
        count: READMORE_PAGE_COUNT,
        page,
        hasPdf,
      }),
    placeholderData: keepPreviousData,
  }) as any;
  const recentArticlesData = useQuery({
    queryKey: ['recent-article-cats', 1],
    queryFn: () =>
      searchArticleByCategory({
        categories: [params.categoryId as string],
        count: SHOWCASE_COUNT,
        page: 1,
        hasPdf,
      }),
  }) as any;

  const articles: Array<ArticleType> = data?.article?.searchArticles.results || [];
  const recentArticles: Array<ArticleType> =
    recentArticlesData?.data?.article?.searchArticles.results || [];
  const {totalPages, totalCount: rawTotalCount} = data?.article?.searchArticles || {
    totalPages: 0,
    totalCount: 0,
  };
  const totalCount =
    page === 1 && rawTotalCount != null ? rawTotalCount - SHOWCASE_COUNT : rawTotalCount ?? 0;

  const startResult =
    page === 1
      ? (page - 1) * READMORE_PAGE_COUNT + 1
      : (page - 1) * READMORE_PAGE_COUNT + 1 - SHOWCASE_COUNT;
  const endResult =
    page === 1
      ? page * READMORE_PAGE_COUNT - SHOWCASE_COUNT
      : Math.min(page * READMORE_PAGE_COUNT, totalCount - SHOWCASE_COUNT);

  if (isFetching) return <div>Loading...</div>;

  if (articles.length < 1)
    return (
      <div
        className={css({
          display: 'flex',
          minH: 'screen',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <h2
          className={css({
            textStyle: 'h2',
          })}
        >
          No articles found!
        </h2>
      </div>
    );

  return (
    <>
      <Box className={css({mx: {mdDown: '-4'}})}>
        <Slider slides={recentArticles.slice(0, 3)} hasPdf={hasPdf} />
      </Box>
      <RecentArticles posts={recentArticles.slice(3)} hasPdf={hasPdf} />
      {articles.length ? (
        <>
          <Divider label='Keep Reading' />
          <Articles
            articles={page === 1 ? articles.slice(SHOWCASE_COUNT) : articles}
            hasPdf={hasPdf}
          />
        </>
      ) : null}
      {totalCount > 0 && (
        <>
          <div
            className={css({
              mt: 6,
              mb: -6,
            })}
          >
            <Pagination
              nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
              onPageChange={data => setPage(data.selected + 1)}
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
            Showing {startResult}-{endResult} of{' '}
            {page === 1 ? totalCount : totalCount - SHOWCASE_COUNT}
          </span>
        </>
      )}
    </>
  );
};
export default Page;
