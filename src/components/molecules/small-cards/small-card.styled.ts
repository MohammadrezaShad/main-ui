import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    border: '1px solid token(colors.gray3)',
    maxW: 'full',
    rounded: '8px',
    overflow: 'hidden',
  },
});

export const Wrap = styled('div', {
  base: {
    px: 6,
  },
});
