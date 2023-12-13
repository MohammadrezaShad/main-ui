import {styled} from '@styled/jsx';

export const Container = styled('span', {
  base: {
    pos: 'relative',
    w: 'full',
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
    pos: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    _peerFocus: {
      top: '-8px',
      textStyle: 'caption',
      transform: 'none',
    },
    '.peer:is(:valid) ~ &': {
      top: '-8px',
      textStyle: 'caption',
      transform: 'none',
    },
    transition: 'all',
    left: '3',
    display: 'block',
    bgColor: 'white',
    px: '1',
    textStyle: 'body2',
    color: 'gray4',
    pointerEvents: 'none',
  },
});

export const Input = styled('input', {
  base: {
    display: 'block',
    w: 'full',
    p: '4',
    color: 'text.primary',
    border: '1px solid token(colors.gray3)',
    textStyle: 'body2',
    rounded: 'xs',
    _placeholder: {color: 'gray.400'},
    _focus: {shadow: 'xs'},
  },
});
