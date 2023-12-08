import { styled } from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    gap: '8',
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: {
      base: 3,
      mdDown: 1,
    },
    gap:{
      base:  '6',
      mdDown: '4'
    },
  },
});

export const SliderWrapper = styled('div', {
  base: {
    maxW: '320px', mx: 'auto', hideFrom: 'md'
  },
});
