'use client';

import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';
import {ArticleType, StatusType} from '@/graphql/generated/types';
import {searchArticles} from '@/graphql/query/search-articles';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {useQuery} from '@tanstack/react-query';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Pagination} from './articles.styled';

const Page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = searchParams.get('page') ?? '1';
  const READMORE_PAGE_COUNT = 12;
  const {data, refetch} = useQuery({
    queryKey: ['search-articles', 18],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page: +page}),
  }) as any;

  const updateSearchParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

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
          nextLabel='>'
          onPageChange={current => updateSearchParam('page', (current.selected + 1).toString())}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel='<'
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
