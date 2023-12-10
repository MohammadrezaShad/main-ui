import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    w: 'full',
    objectFit: 'cover',
    mb: 6,
    bgSize: 'cover',
    bgPosition: 'center',
    bgRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: {
      base: 'column',
      mdDown: 'row',
    },
    justifyContent: 'end',
    breakInside: 'avoid',
    alignItems: {
      mdDown: 'start',
    },
  },
  variants: {
    _aspectRatio: {
      square: {
        aspectRatio: 'square',
      },
      portrait: {aspectRatio: '76/121'},
    },
  },
});

export const Footer = styled('div', {
  base: {
    h: {
      base: '5/6',
      mdDown: 'full',
    },
    bgGradient: 'to-b',
    gradientFrom: '#00000000',
    gradientVia: '#00000000',
    gradientTo: {
      base: '#000000',
      mdDown: '#00000000',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    backgroundColor: {
      mdDown: 'white',
    },
    p: {
      base: 6,
      mdDown: '0 16px',
    },
  },
});
