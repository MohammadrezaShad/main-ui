import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    w: 'full',
  },
});

/**
 * Keeps floating label math correct.
 * Label positioning should be relative to this wrapper,
 * not to a container that also includes helper/error text.
 */
export const FieldWrapper = styled('div', {
  base: {
    position: 'relative',
    bgColor: 'white',
    w: 'full',
  },
});

export const Input = styled('input', {
  base: {
    display: 'block',
    color: 'text.primary',
    textStyle: 'body2',
    p: '4',
    w: 'full',
    outline: `1px solid token(colors.gray3)`,
    borderRadius: '4px',
    _focusVisible: {
      outlineStyle: 'auto',
      outlineColor: 'token(colors.primary)',
      outlineWidth: '2px',
    },
    _hover: {
      outlineStyle: 'auto',
      outlineColor: 'token(colors.primary)',
      outlineWidth: '1px',
    },
  },
  variants: {
    hasError: {
      true: {
        outline: `1px solid token(colors.danger)`,

        _focusVisible: {
          outlineStyle: 'auto',
          outlineColor: 'token(colors.danger)',
          outlineWidth: '2px',
        },
        _hover: {
          outlineStyle: 'auto',
          outlineColor: 'token(colors.danger)',
          outlineWidth: '1px',
        },
      },
    },
  },
});

export const Label = styled('label', {
  base: {
    color: 'token(colors.gray4)',
    textStyle: 'body2',
    pos: 'absolute',
    left: '4',
    pointerEvents: 'none',
    transformOrigin: 'top left',
    display: 'inline-block',
    bgColor: 'token(colors.white)',
    px: '1',
    transition: '200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    _peerFocusWithin: {
      top: '0',
      transform: 'translateY(-50%) scale(0.9)',
      color: 'token(colors.primary)',
    },
  },
});

export const HelperText = styled('span', {
  base: {
    mt: '1.5',
    px: '1',
    fontSize: '12px',
    lineHeight: '1.4',
    color: 'token(colors.gray4)',
  },
  variants: {
    hasError: {
      true: {
        color: 'token(colors.danger)',
      },
    },
  },
});
