import {styled} from '@styled/jsx';
import Link from 'next/link';

export const Container = styled('li', {
  base: {
    display: 'flex',
    flexDir: 'column',
    flex: 1,
    alignItems: 'stretch',
    border: '1px solid token(colors.gray3)',
    pr: '4',
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: '4',
  },
});

export const Content = styled('div', {
  base: {
    display: 'flex',
    flex: 1,
    flexDir: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    py: '6',
    mdDown: {
      py: '3',
    },
  },
});

export const Date = styled('span', {
  base: {
    textStyle: 'caption',
    color: 'gray4',
  },
});

export const TitleLink = styled(Link, {
  base: {
    textStyle: 'h4',
    mt: '1',
    color: 'text.primary',
  },
});

export const Button = styled('button', {
  base: {
    color: 'primary',
    mt: 'auto',
    textStyle: 'body2',
    w: 'max-content',
    px: '3',
    py: '1.5',
    ml: '-3',
    cursor: 'pointer',
  },
});
