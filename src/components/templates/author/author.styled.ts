import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    gap: '6',
    rounded: '8px',
  },
});

export const Wrapper = styled('div', {
  base: {
    border: '1px solid token(colors.gray3)',
    borderRadius: '18px',
    bg: 'white',
    alignSelf: 'center',
    w: 'full',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    mt: {
      base: '8',
      lgDown: '12px',
    },
    rounded: '8px',

    p: {
      base: '8',
      lgDown: '5',
    },
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    rounded: '8px',

    gridTemplateColumns: {
      base: '3',
      mdDown: '1',
    },
    gap: '6',
  },
});

/**
 * A consistent "panel card" for tab content
 * (Articles / ISI / CV)
 */
export const ContentBox = styled('div', {
  base: {
    alignSelf: 'center',
    w: 'full',
    bg: 'white',
    border: '1px solid token(colors.gray3)',
    borderRadius: '18px',
    boxShadow: '0 8px 22px rgba(0,0,0,0.04)',
    rounded: '8px',

    p: {
      base: '8',
      lgDown: '5',
    },
  },
});

/**
 * Tabs become a premium segmented control.
 * This will look MUCH better than underline tabs.
 */
export const Tabs = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '1',
    mt: '6',
    p: '1',
    borderRadius: '14px',
    border: '1px solid token(colors.gray3)',
    backgroundColor: '#F7F7F7',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
    justifyContent: 'space-between',
    rounded: '8px',

    mdDown: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2',
    },
  },
});

export const Tab = styled('button', {
  base: {
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    minW: 'fit-content',

    px: {base: '5', mdDown: '2'},
    py: '3',
    borderRadius: '12px',

    transition:
      'background-color .2s ease, color .2s ease, box-shadow .2s ease, transform .15s ease',

    '& > span': {
      textStyle: 'body2',
      whiteSpace: 'nowrap',
      transition: 'color .2s ease, opacity .2s ease',
      fontWeight: 500,
    },

    _hover: {
      transform: 'translateY(-1px)',
    },

    _focusVisible: {
      outline: '2px solid token(colors.primary)',
      outlineOffset: '2px',
    },
  },
  variants: {
    _isActive: {
      true: {
        backgroundColor: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
        '& > span': {
          color: 'primary',
          fontWeight: 700,
        },
      },
      false: {
        '& > span': {
          color: 'token(colors.gray4)',
          opacity: 0.9,
        },
        _hover: {
          backgroundColor: 'rgba(255,255,255,0.75)',
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
    rounded: '8px',

    mdDown: {
      w: 'full',
      justifyContent: 'center',
    },
  },
});

export const Chips = styled('div', {
  base: {
    display: 'flex',
    gap: '3',
    mt: '3',
    flexWrap: 'wrap',
    rounded: '8px',
  },
});
