import {defineGlobalStyles} from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  'html, body': {
    fontSize: '16px',
    height: '100%',
  },
  body: {
    bg: 'backgroundSecondary',
    direction: 'ltr',
  },
  main: {
    direction: 'ltr',
    overflowY: 'auto',
    height: '100vh',
  },
  '.root': {
    display: 'flex',
    flexDirection: 'column',
    direction: 'rtl',
    minH: '100%',
  },
});
