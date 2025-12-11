import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    flexDir: 'column',
    border: '1px solid token(colors.gray3)',
    maxW: 'full',
    w: '[304px]',
    h: '[362px]',
    rounded: '8px',
    overflow: 'hidden',
  },
});

export const Wrap = styled('div', {
  base: {
    p: 6,
  },
});
