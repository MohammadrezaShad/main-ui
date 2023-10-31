import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const Text = styled('div', {
  base: {
    textStyle: 'body2',
    color: 'text.secondary',
  },
});

export const List = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    mt: 4,
  },
});

export const Item = styled('div', {
  base: {
    '&:not(:last-child)': {
      ml: 4,
    },
    '& path': {
      fill: 'text.variant',
    },
  },
});
