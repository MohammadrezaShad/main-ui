import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    gap: '8',
    pt: '[78px]',
  },
});

export const BackgroundShade = styled('div', {
  base: {
    w: 'full',
    backgroundColor: 'rgb(255,255,255)',
    background:
      '[linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 49%, rgba(247,247,247,1) 49%, rgba(247,247,247,1) 100%)]',
  },
});

export const Wrapper = styled('div', {
  base: {
    w: 'full',
    display: 'grid',
    maxWidth: '960px',
    mx: 'auto',
    pb: '[60px]',
    gridTemplateColumns: {
      base: 3,
      mdDown: 1,
    },
    gap: {
      base: '6',
      mdDown: '4',
    },
  },
});

export const SliderWrapper = styled('div', {
  base: {
    maxW: '320px',
    mx: 'auto',
    hideFrom: 'md',
    position: 'relative',
  },
});
