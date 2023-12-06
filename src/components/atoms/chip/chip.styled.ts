import {styled} from '@styled/jsx';

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    rounded: '4px',
    p: '1',
    fontSize: 'xs',
    textTransform: 'uppercase',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  variants: {
    type: {
      success: {
        backgroundColor: 'success',
        color: 'white',
      },
      simple: {
        backgroundColor: 'gray2',
        color: 'gray4',
      },
    },
  },
});
