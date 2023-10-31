import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const Box = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    pb: 6,
  },
});

export const Title = styled('span', {
  base: {
    textStyle: 'subtitle1',
    color: 'text.primary',
    mr: 2,
  },
});

export const SubTitle = styled('span', {
  base: {textStyle: 'body2', color: 'text.secondary'},
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

export const ShowMore = styled('span', {
  base: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    textStyle: 'body1',
    color: 'text.primary',
    mt: 6,
  },
});
