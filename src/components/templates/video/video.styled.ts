import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: {base: 'flex-start', lgDown: 'unset'},
    flexDir: {base: 'row', lgDown: 'column'},
  },
});

export const Wrap = styled('div', {
  base: {
    flex: {base: '0 0 342px', lgDown: 'unset'},
    maxW: {base: '342px', lgDown: 'unset'},
    rounded: '2xl',
    overflow: 'hidden',
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    bg: 'background',
    flex: 1,
    ml: {base: 8, lgDown: 'unset'},
    mb: {base: 'unset', lgDown: 8},
    rounded: '2xl',
    p: {base: 8, lgDown: 6},
  },
});
