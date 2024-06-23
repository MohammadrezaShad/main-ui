import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    bgColor: 'white',
    mx: '-8',
  },
});

export const Header = styled('header', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    w: 'full',
    whiteSpace: 'nowrap',
    mdDown: {pl: '5', pr: '5', maxW: 'full'},
    minH: '[160px]',
    pos: 'relative',
  },
});

export const Banner = styled('div', {
  base: {
    w: 'full',
    maxW: '[640px]',
    mdDown: {pl: '5', pr: '5'},
    bgRepeat: 'no-repeat',
    bgSize: 'cover',
  },
});

export const BannerShade = styled('div', {
  base: {
    bg: 'linear-gradient(90deg, rgba(4,25,14,1) 0%, rgba(4,25,14,1) 25%, rgba(4,25,14,0) 33%, rgba(4,25,14,0) 66%, rgba(4,25,14,1) 75%, rgba(4,25,14,1) 100%)',
    position: 'absolute',
    inset: '0',
  },
});

export const Title = styled('span', {
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'text.invert',
    textStyle: 'h1',
  },
});

export const Wrapper = styled('div', {
  base: {
    px: '16',
    mt: '6',
    w: 'full',
    maxW: '960px',
    mdDown: {maxW: 'full'},
  },
});

export const CardList = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 3,
    gap: '5',
    mdDown: {gridTemplateColumns: 1, gap: '0'},
  },
});

export const HeadTitle = styled('h2', {
  base: {textStyle: 'headline3', color: '#333', textAlign: 'center'},
});

export const Button = styled('button', {
  base: {
    backgroundColor: 'primary',
    px: '4',
    py: '3',
    mx: 'auto',
    display: 'block',
    cursor: 'pointer',
    '& > span': {
      textStyle: 'body',
      color: 'text.invert',
    },
  },
});
