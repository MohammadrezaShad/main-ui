import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
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
    backgroundImage:
      'url(https://images.unsplash.com/photo-1617291976942-157907753e2e?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
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
    backdropFilter: 'blur(2px)'
  },
});

export const Content = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    width: '800px',
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
  },
});

export const Underline = styled('div', {
  base: {
    backgroundColor: 'primary',
    alignSelf: 'start',
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
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '3',
    gap: '8',
  },
});
