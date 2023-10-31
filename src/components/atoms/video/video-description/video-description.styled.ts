import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Block = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Box = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    mt: 4,
  },
});

export const Title = styled('span', {
  base: {
    display: 'block',
    textStyle: 'subtitle2',
    color: 'text.primary',
  },
});

export const SubTitle = styled('span', {
  base: {
    display: 'block',
    textStyle: 'caption',
    color: 'text.secondary',
    mt: 1,
  },
});

export const Description = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    p: 6,
    bg: 'surface',
    rounded: '2xl',
    mt: 6,
  },
});

export const Text = styled('span', {
  base: {
    display: 'block',
    textStyle: 'body1',
    color: 'text.primary',
    mb: 4,
  },
});

export const Caption = styled('span', {
  base: {
    display: 'block',
    textStyle: 'subtitle2',
    color: 'text.secondary',
    '&:not(:last-child)': {
      mb: 3,
    },
  },
});

export const CaptionText = styled('span', {
  base: {
    textStyle: 'body1',
    color: 'text.primary',
  },
});

export const Imdb = styled('span', {
  base: {
    display: 'flex',
    alignItems: 'center',
    mr: 'auto',
    bg: 'surface',
    p: 3,
    rounded: '2xl',
  },
});

export const ImdbRate = styled('span', {
  base: {
    textStyle: 'body2',
    color: 'text.variant',
  },
});

export const ImdbScore = styled('span', {
  base: {
    textStyle: 'body1',
    color: 'text.primary',
  },
});

export const Share = styled('span', {
  base: {
    display: 'flex',
    alignItems: 'center',
    bg: 'surface',
    p: 3,
    rounded: '2xl',
    mr: 4,
  },
});
