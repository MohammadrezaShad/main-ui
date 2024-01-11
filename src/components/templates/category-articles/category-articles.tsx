'use client';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';
import {ArticleType} from '@/graphql/generated/types';
import {searchArticleByCategory} from '@/graphql/query/search-articles-by-category';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useState} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination} from './articles.styled';

const Page = () => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const READMORE_PAGE_COUNT = 1;
  const {isPending, isError, error, data, isFetching, isPlaceholderData} = useQuery({
    queryKey: ['search-cs', params.categoryId],
    queryFn: () =>
      searchArticleByCategory({categories: [params.categoryId as string], count: 5, page}),
    placeholderData: keepPreviousData,
  }) as any;

  const articles: Array<ArticleType> = data.article!.searchArticles.results;
  const {totalPages} = data.article!.searchArticles;
  const totalCount: number = data.article!.searchArticles.totalCount - 6;

  const startResult = (+page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(+page * READMORE_PAGE_COUNT, totalCount || 0);

  return (
    <>
      <Box className={css({mx: {mdDown: '-4'}})}>
        <Slider slides={articles.slice(0, 3)} />
      </Box>
      <RecentArticles posts={articles.slice(3, 6)} />
      {articles.length > 6 ? (
        <>
          <Divider label='Keep Reading' />
          <Articles articles={articles.slice(6)} />
        </>
      ) : null}
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
