import {styled} from '@styled/jsx';

export const Container = styled('header', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bg: 'background',
    pt: 5,
    pb: 5,
    px: {
      base: 11,
      mdDown: 4,
    },
    h: 20,
  },
});

export const Wrap = styled('div', {
  base: {display: 'flex', alignItems: 'center'},
});
