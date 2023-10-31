import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    maxW: '700px',
    pos: 'relative',
  },
});

export const IconWrap = styled('div', {
  base: {
    pos: 'absolute',
    left: 3,
    top: '50%',
    zIndex: 1,
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    '& path': {
      fill: 'text.variant',
    },
  },
});
