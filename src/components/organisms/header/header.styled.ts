import {styled} from '@styled/jsx';

export const Container = styled('header', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    bg: 'background',
    pt: 4,
    pb: 4,
    pr: 8,
    pl: 8,
  },
});

export const Wrap = styled('header', {
  base: {display: 'flex', flex: 1, alignItems: 'center'},
});
