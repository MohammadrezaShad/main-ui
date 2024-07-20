import {styled} from '@styled/jsx';

export const Container = styled('footer', {
  base: {
    px: 8,
    py: 11,
    backgroundColor: 'backgroundSecondary',
    display: 'flex',
    flexDirection: 'column',
    hideBelow: 'md',
  },
  variants: {
    _center: {
      true: {
        alignItems: 'center',
      },
      false: {
        alignItems: 'start',
      },
    },
  },
});

export const Wrap = styled('div', {
  base: {display: 'flex', alignItems: 'center'},
});
