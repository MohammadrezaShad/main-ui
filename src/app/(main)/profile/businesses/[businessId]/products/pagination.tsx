'use client';

import {css} from '@styled/css';
import {useSearchParams} from 'next/navigation';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {Pagination} from '@/components/templates/articles/articles.styled';
import {useUpdateSearchParam} from '@/hooks';

interface Props {
  totalPages: number;
}

function CardsPagination({totalPages}: Props) {
  const updateSearchParams = useUpdateSearchParam();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  return (
    <Pagination
      forcePage={+page - 1}
      nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
      onPageChange={current => updateSearchParams('page', (current.selected + 1).toString())}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages || 1}
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
  );
}

export default CardsPagination;
