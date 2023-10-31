import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    '& svg': {
      transform: 'scale(0.7)',
      '& PATH': {
        fill: 'primary',
      },
    },
  },
});

export const ButtonText = styled('span', {
  base: {
    textStyle: 'body2',
    color: 'primary',
  },
});
