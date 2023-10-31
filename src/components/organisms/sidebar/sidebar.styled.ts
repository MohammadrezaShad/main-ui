import {styled} from '@styled/jsx';

export const Container = styled('aside', {
  base: {
    p: 5,
    display: 'flex',
    flexDir: 'column',
    bg: 'background',
    rounded: '2xl',
    w: 342,
    alignSelf: 'flex-start',
    hideBelow: 'lg',
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    '&:not(:last-child)': {
      borderBottom: '1px solid token(colors.stroke)',
      pb: 4,
      mb: 4,
    },
  },
});
