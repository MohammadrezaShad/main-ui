import {definePreset} from '@pandacss/dev';

import {badgeRecipe, buttonRecipe} from '@/styles/reciptes';
import {colors, globalCss, textStyles} from '@/styles/theme';

export default definePreset({
  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },
  globalCss,
  theme: {
    semanticTokens: {
      colors,
    },
    extend: {
      breakpoints: {
        xs: '320px',
      },
      tokens: {
        sizes: {
          layout: {
            value: '1366px',
          },
        },
        shadows: {
          b3: {
            value: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      textStyles,
      recipes: {
        button: buttonRecipe,
        badge: badgeRecipe,
      },
    },
  },
  utilities: {
    extend: {
      truncate: {
        className: 'truncate',
        values: {type: 'boolean'},
        transform(value: boolean) {
          if (!value) return {};
          return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };
        },
      },
    },
  },
});
