import {styled} from '@styled/jsx';
import Image from 'next/image';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    w: 'full',
    // h: '[362px]',
    mdDown: {ml: '0', w: 'full', h: 'max'},
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    flexGrow: '1',
    w: 'full',
    bgColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray3',
    mdDown: {mt: '6', flexDir: 'row', borderWidth: '0'},
  },
});

export const ContentWrapper = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    alignSelf: 'flex-start',
    p: '6',
    mdDown: {p: '2.5'},
    w: 'full',
    h: 'full',
  },
});

export const QuestionCount = styled('div', {
  base: {
    fontSize: 'xs',
    lineHeight: 'xs',
    fontWeight: 'light',
    color: 'gray4',
  },
});

export const Title = styled('div', {
  base: {
    mt: '1',
    fontSize: 'base',
    lineHeight: 'base',
    fontWeight: 'medium',
    color: 'text.primary',
  },
});

export const Button = styled('button', {
  base: {
    cursor: 'pointer',
    mt: '[34px]',
    textAlign: 'left',
    fontSize: 'sm',
    lineHeight: '[16.09px]',
    color: 'primary',
    mdDown: {mt: '8'},
  },
});

export const QuizThumbnail = styled(Image, {
  base: {
    aspectRatio: '1.33',
    objectFit: 'cover',
    w: 'full',
    mdDown: {
      aspectRatio: 'square',
      w: '[112px]',
      h: '[112px]',
    },
  },
});

export const QuizImage = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: '11',
    mt: {
      base: '10',
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
