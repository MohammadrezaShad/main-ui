import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    border: '1px solid token(colors.gray3)',
    maxW: '1/3',
  },
});

export const Wrap = styled('div', {
    base: {
        px: 6,
    }
})
