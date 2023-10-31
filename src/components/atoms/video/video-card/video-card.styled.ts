import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const ImageWrap = styled('div', {
  base: {
    pos: 'relative',
    pt: '56.25%',
  },
});

export const Title = styled('span', {
  base: {
    display: 'block',
    textStyle: 'subtitle2',
    color: 'text.primary',
    mt: 4,
  },
});

export const SubTitle = styled('span', {
  base: {
    display: 'block',
    textStyle: 'caption',
    color: 'text.secondary',
    mt: 1,
  },
});

export const Duration = styled('span', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rounded: 'lg',
    pos: 'absolute',
    w: '64px',
    h: '20px',
    bg: 'stroke',
    zIndex: '1',
    left: 3,
    bottom: 3,
    textStyle: 'caption',
    color: 'text.primary',
    pt: 1,
  },
});
