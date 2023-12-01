import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'stretch',
    w: 'full',
  },
});

export const Card = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid token(colors.gray3)',
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'stretch',
    w: 'full',
    px: {
      base: '20',
      lgDown: '5',
    },
    py: '11',
    mt: {
      lgDown: '6',
    },
  },
});

export const CategoryImage = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: '11',
    rounded: 'full',
    px: {
      lgDown: '5',
    },
    backgroundColor: 'gray1',
    position: 'relative',
    aspectRatio: 1,
  },
});
