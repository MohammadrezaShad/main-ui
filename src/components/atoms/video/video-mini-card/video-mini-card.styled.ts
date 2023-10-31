import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

export const ImageWrap = styled('div', {
  base: {
    pos: 'relative',
    h: '80px',
    w: '80px',
    flex: '0 0 80px',
    rounded: 'md',
    overflow: 'hidden',
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    flex: 1,
    pr: 3,
    maxW: `calc(100% - 80px)`,
  },
});

export const Title = styled('span', {
  base: {
    display: 'block',
    textStyle: 'subtitle2',
    color: 'text.primary',
    truncate: true,
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
    left: 2,
    bottom: 2,
    textStyle: 'caption',
    color: 'text.primary',
    pt: 1,
  },
});
