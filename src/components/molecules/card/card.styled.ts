import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    border: '1px solid token(colors.gray3)',
    maxW: 'full',
  },
});

export const Wrap = styled('div', {
    base: {
        px: 6,
    }
})
