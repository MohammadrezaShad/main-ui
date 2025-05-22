'use client';

import {useEffect, useState} from 'react';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';
import {ArticleType, searchArticles, StatusType} from '@/graphql';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Pagination} from './articles.styled';

const Page = ({hasPdf}: {hasPdf: boolean}) => {
  const [page, setPage] = useState(1);
  const READMORE_PAGE_COUNT = 12;

  const topThreeArticlesQuery = useQuery({
    queryKey: ['top-three-articles'],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 6, hasPdf}),
  }) as any;

  const {data, refetch} = useQuery({
    queryKey: ['search-articles'],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page, hasPdf}),
    placeholderData: keepPreviousData,
  }) as any;

  const topThreeArticles: Array<ArticleType> =
    topThreeArticlesQuery.data?.article!.searchArticles.results;
  const articles: Array<ArticleType> = data.article!.searchArticles.results;
  const {totalPages} = data.article!.searchArticles;
  const totalCount: number = data.article!.searchArticles.totalCount - 6;

  const startResult = (+page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(+page * READMORE_PAGE_COUNT, totalCount || 0);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <Box className={css({mx: {mdDown: '-4'}})}>
        <Slider hasPdf={hasPdf} slides={topThreeArticles.slice(0, 3)} />
      </Box>
      <RecentArticles hasPdf={hasPdf} posts={topThreeArticles.slice(3, 6)} />
      <Divider label='Keep Reading' />
      <Articles hasPdf={hasPdf} articles={page === 1 ? articles.slice(6) : articles} />
      <div
        className={css({
          mt: 6,
          mb: -6,
        })}
      >
        <Pagination
          nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
          onPageChange={current => setPage(current.selected + 1)}
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
        Showing {startResult}-{endResult} of {totalCount || 0}
      </span>
    </>
  );
};

export default Page;
