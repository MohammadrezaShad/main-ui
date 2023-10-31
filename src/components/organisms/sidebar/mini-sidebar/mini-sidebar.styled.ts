import {css} from '@styled/css';
import {styled} from '@styled/jsx';

export const Container = styled('aside', {
  base: {
    display: 'flex',
    flexDir: 'column',
    bg: 'white',
    rounded: '2xl',
    w: '98px',
    alignSelf: 'flex-start',
    hideBelow: 'lg',
  },
});

export const Item = styled('span', {
  base: {
    listStyleType: 'none',
    rounded: '2xl',
    p: 4,
    _hover: {
      bg: 'hover',
    },
    '& path': {
      fill: 'text.variant',
    },
    '&:not(:last-child)': {},
  },
  variants: {
    active: {
      true: {
        '& path': {
          fill: 'secondary',
        },
      },
    },
  },
});

export const Text = styled('span', {
  base: {
    textStyle: 'caption',
    color: 'text.secondary',
    mt: 2,
  },
  variants: {
    active: {
      true: {
        color: 'secondary',
      },
    },
  },
});

export const linkClass = css({
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
