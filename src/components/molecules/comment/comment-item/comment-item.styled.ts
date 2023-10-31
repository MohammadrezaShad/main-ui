import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {},
});

export const Text = styled('div', {
  base: {textStyle: 'body', pr: 14},
});

export const Head = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
  },
});

export const Foot = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    mt: 4,
    mr: 14,
  },
});

export const Title = styled('span', {
  base: {
    display: 'block',
    textStyle: 'body1',
    color: 'text.primary',
    mr: 4,
  },
});

export const SubTitle = styled('span', {
  base: {
    display: 'block',
    textStyle: 'caption',
    color: 'text.secondary',
    mr: 6,
  },
});

export const IconWrap = styled('span', {
  base: {
    ml: 4,
    display: 'flex',
    alignItems: 'center',
  },
});

export const IconText = styled('span', {
  base: {display: 'block', textStyle: 'body1', color: 'text.primary', ml: 2},
});

export const Childs = styled('div', {
  base: {
    pr: 14,
    mt: 6,
  },
});
