import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const List = styled('div', {
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
    flexBasis: {base: '20%', '2xlDown': '25%', xlDown: '33.33%', mdDown: '50%', smDown: '100%'},
    flexGrow: '0',
    maxW: {base: '20%', '2xlDown': '25%', xlDown: '33.33%', mdDown: '50%', smDown: '100%'},
  },
});
