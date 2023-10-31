import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    mt: -4,
    ml: -4,
    width: 'calc(100% + token(spacing.4))',
  },
});

export const Item = styled('div', {
  base: {
    pt: 4,
    pl: 4,
    flexBasis: {base: '33.333333%', lgDown: '50%', mdDown: '100%'},
    flexGrow: '0',
    maxW: {base: '33.333333%', lgDown: '50%', mdDown: '100%'},
  },
});
