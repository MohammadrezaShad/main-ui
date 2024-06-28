import {styled} from '@styled/jsx';
import Link from 'next/link';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'stretch',
    w: 'full',
  },
});

export const Card = styled(Link, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid token(colors.gray3)',
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'stretch',
    w: 'full',
    px: {
      base: '0.5',
      mdDown: '6',
    },
    pb: {
      base: '14',
      mdDown: '6',
    },
  },
  variants: {
    _small: {
      true: {
        py: '4',
        pb: '4',
        display: 'block',
        bgColor: 'gray1',
      },
    },
  },
});

export const CategoryImage = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: '11',
    mt: {
      base: '14',
      mdDown: '4',
    },
    rounded: 'full',
    px: {
      mdDown: '5',
    },
    backgroundColor: 'gray1',
    position: 'relative',
    aspectRatio: 1,
    w: {
      base: '160px',
      mdDown: '200px',
    },
    mx: 'auto',
  },
  variants: {
    _hidden: {
      true: {
        display: 'none',
      },
    },
  },
});
