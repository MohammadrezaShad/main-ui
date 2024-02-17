'use client';

import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {ArticleType, StatusType, searchArticles} from '@/graphql';
import {Pagination} from './articles.styled';

const Page = () => {
  const [page, setPage] = useState(1);
  const READMORE_PAGE_COUNT = 12;
  const {isPending, isError, error, data, isFetching, refetch, isPlaceholderData} = useQuery({
    queryKey: ['search-articles', 18],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page}),
    placeholderData: keepPreviousData,
  }) as any;

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
        <Slider slides={articles.slice(0, 3)} />
      </Box>
      <RecentArticles posts={articles.slice(3, 6)} />
      <Divider label='Keep Reading' />
      <Articles articles={articles.slice(6)} />
      <div
        className={css({
          mt: 6,
          mb: -6,
        })}
      >
        <Pagination
          nextLabel={<IconChevronRight />}
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
