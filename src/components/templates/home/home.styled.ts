import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    mx: 'auto',
    maxWidth: '960px',
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
    overflow: 'hidden',
    position: 'relative',
    height: '688px',
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
    backgroundColor: '#00000032',
    zIndex: 10,
  },
});

export const Content = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
    margin: '62px 0 190px',
    zIndex: 20,
  },
});

export const TitleWrapper = styled('div', {
  base: {
    color: 'text.invert',
    alignSelf: 'stretch',
    marginTop: '7px',
    textStyle: 'title2',
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
    boxShadow: 'px 8px 24px 0px rgba(0, 0, 0, 0.25)',
    bg: 'white',
    display: 'flex',
    mt: 12,
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
      py: '2',
    },
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '3',
    gap: '8',
  },
});
