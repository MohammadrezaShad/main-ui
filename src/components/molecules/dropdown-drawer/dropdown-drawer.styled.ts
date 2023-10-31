import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const Select = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    rounded: 'xl',
    py: `token(spacing.2)`,
    pr: `token(spacing.3)`,
    pl: `token(spacing.2)`,
    border: `1px solid  token(colors.strokeSecondary)`,
    height: '38px',
  },
});

export const SelectText = styled('span', {
  base: {
    textStyle: 'body2',
    truncate: true,
    ml: 2,
  },
});

export const SelectIcon = styled('span', {
  base: {
    flexShrink: '0',
  },
});

export const DrawerContainer = styled('div', {
  base: {
    p: 4,
    display: 'flex',
    flexDir: 'column',
    bg: 'background',
    direction: 'rtl',
    w: '100vw',
    roundedTop: '2xl',
  },
});

export const Title = styled('span', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 4,
    pb: 4,
    borderBottom: '1px solid token(colors.strokeSecondary)',
  },
});

export const TitleText = styled('span', {
  base: {
    textStyle: 'subtitle2',
  },
});

export const List = styled('div', {
  base: {
    pt: 3,
    maxH: 'calc(100vh - 72px)',
    overflow: 'auto',
  },
});

export const Item = styled('div', {
  base: {
    rounded: '2xl',
    py: 2,
    px: 4,
    transition: 'all 0.3s',
    height: '38px',
    _hover: {
      bg: '#EFF0F2',
    },
  },

  variants: {
    active: {
      true: {
        bg: '#EFF0F2',
      },
    },
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    '&:not(:last-child)': {
      borderBottom: '1px solid token(colors.stroke)',
      pb: 4,
      mb: 4,
    },
  },
});
