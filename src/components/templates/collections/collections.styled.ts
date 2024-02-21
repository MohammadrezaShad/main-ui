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

export const Tabs = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '8',
    mt: '10',
    borderBottom: '1px solid token(colors.gray3)',
  },
});

export const Tab = styled('button', {
  base: {
    pb: '4',
    textStyle: 'h4',
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        borderBottom: '2px solid',
        borderColor: 'primary',
        color: 'text.primary',
      },
      false: {
        color: 'gray4',
      },
    },
  },
});

export const Bookmarks = styled('ul', {
  base: {
    display: 'flex',
    mt: '10',
    flexDir: 'column',
    gap: '4',
  },
});
