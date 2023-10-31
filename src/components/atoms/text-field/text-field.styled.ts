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
    rounded: 'xl',
    border: '2px solid token(colors.strokeVariant)',
    minH: '40px',
    px: 3,
    _placeholder: {
      color: 'text.variant',
    },
    _focus: {
      outline: 'none',
    },
  },
});
