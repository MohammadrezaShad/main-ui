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
    flexDirection: 'column',
    justifyContent: 'end',
    breakInside: 'avoid'
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
        h: '5/6',
        bgGradient: 'to-b',
        gradientFrom: '#00000000',
        gradientVia: '#00000000',
        gradientTo: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        p: 6
    }
})
