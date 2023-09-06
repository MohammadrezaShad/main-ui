import {Recursive, Token} from '@styled/types/composition';
import Color from 'color';

const DEFAULT_COLORS = {
  primary: '#FC575E',
  secondary: '#607D8B',
  surface: '#ffffff',
  success: '#4CAF50',
  danger: '#DC3545',
  info: '#2196F3',
  warning: '#FFC107',
  background: '#F7F7F7',
  backgroundVariant: '#EEEEEE',
  stroke: '#D6D6D6',
  strokeVariant: '#E7E7E7',
  text: {
    primary: '#2B2B2B',
    secondary: '#555555',
    invert: '#FFFFFF',
  },
};

export const createLightVariant = (originColor: string | Color) => tint(originColor, 0.2);

export const createDarkVariant = (originColor: string | Color) => shade(originColor, 0.2);

export function tint(color: string | Color, amount: number) {
  const baseLight = Color('#ffffff');
  const tintColor = Color(color).mix(baseLight, amount).rgb().toString();
  return tintColor;
}

export function shade(color: string | Color, amount: number) {
  const baseDark = Color('#000000');
  const shadeColor = Color(color).mix(baseDark, amount).rgb().toString();
  return shadeColor;
}

export const colors: Recursive<Token<string>> = {
  primary: {
    DEFAULT: {value: DEFAULT_COLORS.primary},
    light: {value: createLightVariant(DEFAULT_COLORS.primary)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.primary)},
  },
  secondary: {
    DEFAULT: {value: DEFAULT_COLORS.secondary},
    light: {value: createLightVariant(DEFAULT_COLORS.secondary)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.secondary)},
  },
  surface: {
    DEFAULT: {value: DEFAULT_COLORS.surface},
    light: {value: createLightVariant(DEFAULT_COLORS.surface)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.surface)},
  },
  success: {
    DEFAULT: {value: DEFAULT_COLORS.success},
    light: {value: createLightVariant(DEFAULT_COLORS.success)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.success)},
  },
  danger: {
    DEFAULT: {value: DEFAULT_COLORS.danger},
    light: {value: createLightVariant(DEFAULT_COLORS.danger)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.danger)},
  },
  info: {
    DEFAULT: {value: DEFAULT_COLORS.info},
    light: {value: createLightVariant(DEFAULT_COLORS.info)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.info)},
  },
  warning: {
    DEFAULT: {value: DEFAULT_COLORS.warning},
    light: {value: createLightVariant(DEFAULT_COLORS.warning)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.warning)},
  },
  background: {
    DEFAULT: {value: DEFAULT_COLORS.background},
    light: {value: createLightVariant(DEFAULT_COLORS.background)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.background)},
  },
  backgroundVariant: {
    DEFAULT: {value: DEFAULT_COLORS.backgroundVariant},
    light: {value: createLightVariant(DEFAULT_COLORS.backgroundVariant)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.backgroundVariant)},
  },
  stroke: {
    DEFAULT: {value: DEFAULT_COLORS.stroke},
    light: {value: createLightVariant(DEFAULT_COLORS.stroke)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.stroke)},
  },
  strokeVariant: {
    DEFAULT: {value: DEFAULT_COLORS.strokeVariant},
    light: {value: createLightVariant(DEFAULT_COLORS.strokeVariant)},
    dark: {value: createDarkVariant(DEFAULT_COLORS.strokeVariant)},
  },
  text: {
    primary: {
      DEFAULT: {value: DEFAULT_COLORS.text.primary},
      light: {value: createLightVariant(DEFAULT_COLORS.text.primary)},
      dark: {value: createDarkVariant(DEFAULT_COLORS.text.primary)},
    },

    secondary: {
      DEFAULT: {value: DEFAULT_COLORS.text.secondary},
      light: {value: createLightVariant(DEFAULT_COLORS.text.secondary)},
      dark: {value: createDarkVariant(DEFAULT_COLORS.text.secondary)},
    },
    invert: {
      DEFAULT: {value: DEFAULT_COLORS.text.invert},
      light: {value: createLightVariant(DEFAULT_COLORS.text.invert)},
      dark: {value: createDarkVariant(DEFAULT_COLORS.text.invert)},
    },
  },
};
