import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    gap: '5',
    display: 'flex',
    w: 'full',
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'stretch',
    mt: '7',
    w: 'full',
  },
});

export const PageTitle = styled('h3', {
  base: {
    textStyle: 'h3',
    color: 'text.primary',
  },
});

export const Companies = styled('ul', {
  base: {
    display: 'flex',
    mt: '10',
    flexDir: 'column',
    gap: '4',
  },
});
