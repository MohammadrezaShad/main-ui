import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    pos: 'relative',
    pt: '150%',
    overflow: 'hidden',
    rounded: '2xl',
    minW: '172px',
  },
});

export const Title = styled('span', {
  base: {
    display: 'block',
    textAlign: 'center',
    pos: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
    bg: 'rgba(47, 47, 47, 0.6)',
    px: 4,
    py: 3,
    textStyle: 'body2',
    color: 'text.invert',
  },
});
