import {styled} from '@styled/jsx';

export const Container = styled('span', {
  base: {
    display: 'block',
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
});

export const Label = styled('label', {
  base: {
    display: 'block',
    textStyle: 'body',
    color: 'text.primary',
    mb: 1,
  },
});

export const Input = styled('input', {
  base: {
    h: '100%',
    w: '100%',
    textStyle: 'body2',
    color: 'text.secondary',
    rounded: 'md',
    border: '1px solid token(colors.stroke)',
    minH: '8',
    px: 3,
    _focus: {
      outline: 'none',
    },
  },
});
