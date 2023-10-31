import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    mb: 6,
  },
});

export const Box = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      mr: 9,
    },
  },
});

export const Label = styled('label', {
  base: {
    display: 'flex',
    cursor: 'pointer',
    mr: 3,
  },
});

export const List = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    mt: -6,
    ml: -6,
    width: 'calc(100% + token(spacing.6))',
  },
});

export const Item = styled('div', {
  base: {
    pt: 6,
    pl: 6,
    flexBasis: {base: '50%'},
    flexGrow: '0',
    maxW: {base: '50%'},
  },
});
