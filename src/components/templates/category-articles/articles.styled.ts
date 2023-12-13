import ReactPaginate from 'react-paginate';
import {styled} from '@styled/jsx';

export const Pagination = styled(ReactPaginate, {
  base: {
    columnGap: 2,
    display: 'flex',
    justifyContent: 'center',
    '& li': {
      w: 8,
      h: 8,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      '&.active': {
        backgroundColor: 'primary',
        '& a': {
          color: 'text.invert',
        },
      },
      '& a': {
        color: 'gray4',
        textStyle: 'subtitle2',
      },
    },
  },
});
