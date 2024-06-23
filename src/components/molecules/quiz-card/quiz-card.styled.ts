import {styled} from '@styled/jsx';
import Image from 'next/image';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    w: '100%',
    mdDown: {ml: '0', w: 'full'},
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    flexGrow: '1',
    pb: '6',
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
    mt: '7',
    ml: '6',
    mdDown: {ml: '2.5', mt: '0'},
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
    mt: '2',
    fontSize: 'base',
    lineHeight: 'base',
    fontWeight: 'medium',
    color: 'text.primary',
  },
});

export const Button = styled('button', {
  base: {
    cursor: 'pointer',
    mt: '9',
    textAlign: 'left',
    fontSize: 'sm',
    lineHeight: 'sm',
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
