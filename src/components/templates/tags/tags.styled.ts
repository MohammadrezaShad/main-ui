import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
  },
});

export const Wrapper = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62C2CE',
    pt: '57px',
    pb: '46px',
    gap: '2',
    mx: '-16 px',
  },
});

export const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: {
      base: '3',
      mdDown: '1',
    },
    gap: '6',
    mt: '6',
  },
});
