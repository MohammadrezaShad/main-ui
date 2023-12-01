import {styled} from '@styled/jsx';

export const Container = styled('ul', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});

export const Item = styled('li', {
  base: {textStyle: 'body', color: 'text.primary'},
  variants: {
    _isActive: {
      true: {
        color: 'primary',
        position: 'relative',
        _after: {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: '50%',
          bottom: '-3',
          transform: 'translate(-50%)',
          w: 1,
          h: 1,
          rounded: 'full',
          bg: 'primary',
        },
      },
      false: {color: 'text.primary'},
    },
  },
});
