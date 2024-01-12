// PaginationSection.tsx
import {IconChevronLeft, IconChevronRight} from '@/assets';
import {css} from '@styled/css';
import {FC} from 'react';
import {Pagination} from '../articles/articles.styled';

interface PaginationSectionProps {
  totalCount: number;
  totalPages: number;
  onPageChange: (current: {selected: number}) => void;
  startResult: number;
  endResult: number;
}

const PaginationSection: FC<PaginationSectionProps> = ({
  totalCount,
  totalPages,
  onPageChange,
  startResult,
  endResult,
}) => (
  <>
    <div
      className={css({
        mt: 6,
        mb: -6,
      })}
    >
      <Pagination
        nextLabel={<IconChevronRight />}
        onPageChange={onPageChange}
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
        mt: '8',
      })}
    >
      Showing {startResult}-{endResult} of {totalCount || 0}
    </span>
  </>
);

export default PaginationSection;
