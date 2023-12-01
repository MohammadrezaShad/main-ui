import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Wrapper = styled('div', {
  base: {
    border: '1px solid token(colors.gray3)',
    alignSelf: 'center',
    display: 'flex',
    w: 'full',
    flexDir: 'column',
    alignItems: 'stretch',
    mt: '8',
    p: {
      base: '8',
      lgDown: '5',
    },
    pb: '0.5!important',
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '3',
    gap: '6',
    mt: '6',
  },
});

export const Tabs = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: {
      base: 'space-between',
      lgDown: 'center',
    },
    gap: '5',
    mt: '3.5',
  },
});

export const Tab = styled('button', {
  base: {
    display: 'flex',
    flexBasis: '0%',
    flexDir: 'column',
    cursor: 'pointer',
    alignItems: 'stretch',
    '& > span': {
      textStyle: 'body2',
      whiteSpace: 'nowrap',
      pb: '3',
    },
  },
  variants: {
    _isActive: {
      true: {
        '& > span': {
          color: 'primary',
          borderBottom: '2px solid token(colors.primary)',
        },
      },
      false: {
        '& > span': {
          color: 'text.primary',
          borderBottom: 'none',
        },
      },
    },
  },
});

export const Actions = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
  },
});

export const Chips = styled('div', {
  base: {
    display: 'flex',
    gap: '4',
    mt: '3',
    alignSelf: 'start',
  },
});
