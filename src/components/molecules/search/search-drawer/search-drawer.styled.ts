import {styled} from '@styled/jsx';

export const DrawerContainer = styled('aside', {
  base: {
    pt: 4,
    pb: 4,
    pr: 8,
    pl: 8,
    display: 'flex',
    bg: 'background',
    alignItems: 'center',
    direction: 'rtl',
    w: '100vw',
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
