import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    position: 'relative',
  },
});

export const Box = styled('div', {
  base: {
    position: 'relative',
  },
});

export const IconWrap = styled('div', {
  base: {
    pos: 'absolute',
    left: 1,
    top: 2,
    zIndex: 1,
    cursor: 'pointer',
    p: 3,
    '& path': {
      transition: 'all 0.3s',
      fill: 'text.variant',
    },
    _hover: {
      '& path': {
        fill: 'text.secondary',
      },
    },
  },
});

export const Input = styled('div', {
  base: {
    h: '100%',
    w: '100%',
    textStyle: 'body2',
    color: 'text.secondary',
    rounded: 'xl',
    border: '2px solid token(colors.strokeVariant)',
    minH: '64px',
    pos: 'relative',
    pb: 4,
    pl: 9,
    pr: 14,
    pt: '21px',
    '&:not(:empty)': {
      _before: {
        display: 'none',
      },
    },
    _before: {
      content: "'دیدگاه خود را بنویسید...'",
      color: 'text.variant',
      pos: 'absolute',
      right: 14,
      top: '21px',
    },
    _focus: {
      outline: 'none',
    },
  },
});
