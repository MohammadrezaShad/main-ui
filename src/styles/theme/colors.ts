import Color from 'color';

const LIGHT_COLORS = {
  primary: '#F58A0E',
  secondary: '#2ECB95',
  surface: '#F5F5F5',
  success: '#4CAF50',
  danger: '#DC3545',
  info: '#2196F3',
  warning: '#FFC107',
  background: '#FFFFFF',
  backgroundSecondary: '#F7F7F7',
  backgroundVariant: '#EEEEEE',
  stroke: '#F1F0F2',
  strokeVariant: '#DDDDDF',
  strokeSecondary: '#C7C7C8',
  hover: '#EFF0F2',
  text: {
    primary: '#272727',
    secondary: '#5E5A6D',
    variant: '#B4B2BC',
    invert: '#FFFFFF',
  },
};

const DARK_COLORS = {
  primary: '#FC575E',
  secondary: '#607D8B',
  surface: '#ffffff',
  success: '#4CAF50',
  danger: '#DC3545',
  info: '#2196F3',
  warning: '#FFC107',
  background: '#F7F7F7',
  backgroundSecondary: '#F7F7F7',
  backgroundVariant: '#EEEEEE',
  stroke: '#D6D6D6',
  strokeVariant: '#E7E7E7',
  strokeSecondary: '#C7C7C8',
  hover: '#EFF0F2',
  text: {
    primary: '#2B2B2B',
    secondary: '#555555',
    variant: '#B4B2BC',
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

export const colors = {
  primary: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.primary, _dark: DARK_COLORS.primary},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.primary),
        _dark: createLightVariant(DARK_COLORS.primary),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.primary),
        _dark: createDarkVariant(DARK_COLORS.primary),
      },
    },
  },
  secondary: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.secondary, _dark: DARK_COLORS.secondary},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.secondary),
        _dark: createLightVariant(DARK_COLORS.secondary),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.secondary),
        _dark: createDarkVariant(DARK_COLORS.secondary),
      },
    },
  },
  surface: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.surface, _dark: DARK_COLORS.surface},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.surface),
        _dark: createLightVariant(DARK_COLORS.surface),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.surface),
        _dark: createDarkVariant(DARK_COLORS.surface),
      },
    },
  },
  success: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.success, _dark: DARK_COLORS.success},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.success),
        _dark: createLightVariant(DARK_COLORS.success),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.success),
        _dark: createDarkVariant(DARK_COLORS.success),
      },
    },
  },
  danger: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.danger, _dark: DARK_COLORS.danger},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.danger),
        _dark: createLightVariant(DARK_COLORS.danger),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.danger),
        _dark: createDarkVariant(DARK_COLORS.danger),
      },
    },
  },
  info: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.info, _dark: DARK_COLORS.info},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.info),
        _dark: createLightVariant(DARK_COLORS.info),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.info),
        _dark: createDarkVariant(DARK_COLORS.info),
      },
    },
  },
  warning: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.warning, _dark: DARK_COLORS.warning},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.warning),
        _dark: createLightVariant(DARK_COLORS.warning),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.warning),
        _dark: createDarkVariant(DARK_COLORS.warning),
      },
    },
  },
  background: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.background, _dark: DARK_COLORS.background},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.background),
        _dark: createLightVariant(DARK_COLORS.background),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.background),
        _dark: createDarkVariant(DARK_COLORS.background),
      },
    },
  },
  backgroundSecondary: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.backgroundSecondary, _dark: DARK_COLORS.backgroundSecondary},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.backgroundSecondary),
        _dark: createLightVariant(DARK_COLORS.backgroundSecondary),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.backgroundSecondary),
        _dark: createDarkVariant(DARK_COLORS.backgroundSecondary),
      },
    },
  },
  backgroundVariant: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.backgroundVariant, _dark: DARK_COLORS.backgroundVariant},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.backgroundVariant),
        _dark: createLightVariant(DARK_COLORS.backgroundVariant),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.backgroundVariant),
        _dark: createDarkVariant(DARK_COLORS.backgroundVariant),
      },
    },
  },
  stroke: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.stroke, _dark: DARK_COLORS.stroke},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.stroke),
        _dark: createLightVariant(DARK_COLORS.stroke),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.stroke),
        _dark: createDarkVariant(DARK_COLORS.stroke),
      },
    },
  },
  strokeSecondary: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.strokeSecondary, _dark: DARK_COLORS.strokeSecondary},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.strokeSecondary),
        _dark: createLightVariant(DARK_COLORS.strokeSecondary),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.strokeSecondary),
        _dark: createDarkVariant(DARK_COLORS.strokeSecondary),
      },
    },
  },
  strokeVariant: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.strokeVariant, _dark: DARK_COLORS.strokeVariant},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.strokeVariant),
        _dark: createLightVariant(DARK_COLORS.strokeVariant),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.strokeVariant),
        _dark: createDarkVariant(DARK_COLORS.strokeVariant),
      },
    },
  },
  hover: {
    DEFAULT: {
      value: {base: LIGHT_COLORS.hover, _dark: DARK_COLORS.hover},
    },
    light: {
      value: {
        base: createLightVariant(LIGHT_COLORS.hover),
        _dark: createLightVariant(DARK_COLORS.hover),
      },
    },
    dark: {
      value: {
        base: createDarkVariant(LIGHT_COLORS.hover),
        _dark: createDarkVariant(DARK_COLORS.hover),
      },
    },
  },
  text: {
    primary: {
      value: {base: LIGHT_COLORS.text.primary, _dark: DARK_COLORS.text.primary},
    },

    secondary: {
      value: {base: LIGHT_COLORS.text.secondary, _dark: DARK_COLORS.text.secondary},
    },
    variant: {
      value: {base: LIGHT_COLORS.text.variant, _dark: DARK_COLORS.text.variant},
    },
    invert: {
      value: {base: LIGHT_COLORS.text.invert, _dark: DARK_COLORS.text.invert},
    },
  },
};
