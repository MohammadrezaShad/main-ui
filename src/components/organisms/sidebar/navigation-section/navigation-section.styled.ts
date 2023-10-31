import {css} from '@styled/css';
import {styled} from '@styled/jsx';

export const Container = styled('ul', {
  base: {},
});

export const Item = styled('li', {
  base: {
    p: 2,
    rounded: '2xl',
    _hover: {
      bg: 'hover',
    },
    '& path': {
      fill: 'text.variant',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'hover',
        '& path': {
          fill: 'secondary',
        },
      },
    },
  },
});

export const Text = styled('span', {
  base: {
    textStyle: 'body2',
    color: 'text.secondary',
    mr: 4,
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
  alignItems: 'center',
});
