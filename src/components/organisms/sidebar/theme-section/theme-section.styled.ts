import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const Item = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    p: 2,
    '& path': {
      fill: 'text.variant',
    },
  },
});

export const Text = styled('span', {
  base: {
    textStyle: 'body2',
    color: 'text.secondary',
    mr: 4,
  },
});
