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
  const READMORE_PAGE_COUNT = 1;
  const {data} = useQuery({
    queryKey: ['search-cs', params.categoryId],
    queryFn: () =>
      searchArticleByCategory({categories: [params.categoryId as string], count: 12, page, hasPdf}),
    placeholderData: keepPreviousData,
  }) as any;

  if (!data) throw new Error('No data found from search catagories query');

  const articles: Array<ArticleType> = data.article!.searchArticles.results;
  const {totalPages} = data.article!.searchArticles;
  const totalCount: number = data.article!.searchArticles.totalCount - 9;

  const startResult = (+page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(+page * READMORE_PAGE_COUNT, totalCount || 0);

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
        <Slider slides={articles.slice(0, 3)} hasPdf={hasPdf} />
      </Box>
      <RecentArticles posts={articles.slice(3, 6)} hasPdf={hasPdf} />
      {articles.length > 6 ? (
        <>
          <Divider label='Keep Reading' />
          <Articles articles={articles.slice(6)} hasPdf={hasPdf} />
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
      )}
    </>
  );
};

export default Page;
