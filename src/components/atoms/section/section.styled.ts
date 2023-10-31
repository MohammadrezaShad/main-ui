import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const Title = styled('span', {
  base: {
    display: 'block',
    mb: 6,
    textAlign: 'center',
    pos: 'relative',
    zIndex: '1',
    _after: {
      content: '""',
      pos: 'absolute',
      height: '1px',
      bg: 'linear-gradient(90deg, token(colors.strokeSecondary) 0%, token(colors.stroke) 100%)',
      width: '50%',
      right: '0',
      top: '50%',
      transform: 'translateY(-1px)',
      zIndex: '-1',
    },
    _before: {
      content: '""',
      pos: 'absolute',
      height: '1px',
      bg: 'linear-gradient(90deg, token(colors.stroke) 0%, token(colors.strokeSecondary) 100%)',
      width: '50%',
      left: '0',
      top: '50%',
      transform: 'translateY(-1px)',
      zIndex: '-1',
    },
  },
});

export const Text = styled('span', {
  base: {
    display: 'inline-block',
    color: 'text.primary',
    textStyle: 'h3',
    bg: 'background',
    pr: 4,
    pl: 4,
  },
});
