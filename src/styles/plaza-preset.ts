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
    extend: {
      tokens: {
        colors,
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
