import {styled} from '@styled/jsx';

export const Container = styled('header', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bg: 'background',
    pt: 5,
    pb: 5,
    pr: 11,
    pl: 11,
    h: 20,
  },
});

export const Wrap = styled('header', {
  base: {display: 'flex', alignItems: 'center'},
});
