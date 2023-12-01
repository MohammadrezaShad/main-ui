import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    gap: '8',
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: {
      base: 3,
      lgDown: 1,
    },
    gap: '6',
  },
});
