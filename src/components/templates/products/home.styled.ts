import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    mx: 'auto',
    maxWidth: '1140px',
  },
});

export const Hero = styled('div', {
  base: {
    display: 'flex',
    w: 'full',
    flexDir: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
});

export const HeroWrapper = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'hidden',
    position: 'relative',
    height: '275px',
    w: 'full',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const HeroShade = styled('div', {
  base: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'gray1',
    zIndex: 10,
  },
});

export const Content = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    width: '800px',
    maxWidth: '100%',
    flexDirection: 'column',
    zIndex: 20,
    pt: '[56px]',
    pb: '[70px]',
  },
});

export const TitleWrapper = styled('div', {
  base: {
    color: '#333333',
    alignSelf: 'stretch',
    textStyle: 'title2',
    textAlign: 'center',
    pb: '6',
    mdDown: {
      textStyle: 'h1',
      textAlign: 'center',
      mt: '16',
      lineHeight: 1.14,
    },
  },
});

export const Underline = styled('div', {
  base: {
    backgroundColor: 'primary',
    alignSelf: {
      base: 'start',
      mdDown: 'center',
    },
    display: 'flex',
    mt: '3',
    h: '1',
    w: '24',
  },
});

export const SearchContainer = styled('div', {
  base: {
    shadow: 'lg',
    bg: 'white',
    display: 'flex',
    mdDown: {
      flexDirection: 'column',
      mx: '8',
      gap: '2',
      bg: 'transparent',
    },
  },
});

export const SearchButton = styled('button', {
  base: {
    bg: 'secondary',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h: 'full',
    aspectRatio: 'square',
    cursor: 'pointer',
    gap: '2',
    mdDown: {
      aspectRatio: 'auto',
      py: '5',
    },
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '4',
    gap: '8',
    px: '6',
  },
});
