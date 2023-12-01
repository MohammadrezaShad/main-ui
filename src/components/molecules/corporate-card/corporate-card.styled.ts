import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Wrap = styled('div', {
  base: {
    border: '1px solid token(colors.gray3)',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    margin: '0 auto',
    w: 'full',
    padding: {
      base: '40px 18px 24px',
      xlTo2xl: '40px 24px 24px',
    },
  },
});

export const HeaderImage = styled('img', {
  base: {
    aspectRatio: 1,
    objectFit: 'cover',
    objectPosition: 'center',
    width: 128,
    overflow: 'hidden',
    rounded: 'full',
  },
});

export const CardTitle = styled('h4', {
  base: {
    textStyle: 'headline4',
    color: 'text.primary',
    mt: '5',
    textAlign: 'center',
  },
});

export const CardSubtitle = styled('span', {
  base: {
    textStyle: 'caption',
    color: 'text.primary',
    mt: '1.5',
  },
});

export const Ratings = styled('div', {
  base: {
    display: 'flex',
    columnGap: 1,
  },
});

export const Star = styled('div', {
  base: {
    w: 6,
    aspectRatio: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const CardDivider = styled('div', {
  base: {
    alignSelf: 'stretch',
    backgroundColor: 'gray3',
    display: 'flex',
    height: '1px',
    mt: '6',
  },
});

export const Details = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2',
    alignSelf: 'stretch',
  },
});

export const CardInfo = styled('p', {
  base: {
    textStyle: 'body',
    color: 'text.primary',
    flexGrow: 1,
    mx: 'auto',
  },
});

export const CardFooter = styled('div', {
  base: {
    alignSelf: 'stretch',
    display: 'flex',
    mt: '11',
    justifyContent: 'space-between',
    gap: '4',
  },
});

export const CardFooterButton = styled('button', {
  base: {
    color: 'gray4',
    border: '1px solid token(colors.gray3)',
    w: 'full',
    padding: '11px 26px',
    cursor: 'pointer',
  },
});
