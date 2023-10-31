import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    p: 6,
    bg: 'background',
  },
});

export const Item = styled('div', {
  base: {
    '&:not(:last-child)': {
      mb: 6,
    },
  },
});
