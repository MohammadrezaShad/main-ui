import {styled} from '@styled/jsx';

export const Head = styled('div', {
  base: {
    display: 'flex',
    bg: 'background',
    alignItems: 'center',
    mb: 6,
  },
});

export const DrawerContainer = styled('aside', {
  base: {
    p: 5,
    display: 'flex',
    flexDir: 'column',
    bg: 'background',
    // w: 350,
    alignSelf: 'flex-start',
    direction: 'rtl',
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
