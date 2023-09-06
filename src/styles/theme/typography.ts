import {defineTextStyles} from '@pandacss/dev';
import {TextStyle} from '@styled/types/composition';

const fontWeight = {
  light: '300',
  regular: '400',
  bold: '600',
};

const getText = (textProperties: TextStyle) => ({
  fontStyle: 'normal',
  fontFamily: 'inherit',
  fontStretch: 'normal',
  letterSpacing: 'normal',
  lineHeight: '1.5',
  textSizeAdjust: '100%',
  textDecoration: 'None',
  textTransform: 'None',
  ...textProperties,
});

export const textStyles = defineTextStyles({
  title1: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '48',
    }),
  },
  title2: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '40px',
    }),
  },
  h1: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '32px',
    }),
  },
  h2: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '28px',
    }),
  },
  h3: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '24px',
    }),
  },
  h4: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '18px',
    }),
  },
  subtitle1: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '16px',
    }),
  },
  subtitle2: {
    description: '',
    value: getText({
      fontWeight: fontWeight.bold,
      fontSize: '14px',
    }),
  },
  body: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '16px',
    }),
  },
  body2: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '14px',
    }),
  },
  button1: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '18px',
    }),
  },
  button2: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '14px',
    }),
  },
  button3: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '12px',
    }),
  },
  caption: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '12px',
    }),
  },
  overline: {
    description: '',
    value: getText({
      fontWeight: fontWeight.regular,
      fontSize: '11px',
    }),
  },
});
