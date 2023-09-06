import {defineRecipe} from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'The styles for the Button component',
  base: {
    color: 'inherit',
    border: 'none',
    cursor: 'pointer',
    margin: '0',
    display: 'inline-flex',
    outline: '0',
    padding: '0',
    position: 'relative',
    alignItems: 'center',
    userSelect: 'none',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    webkitTapHighlightColor: 'transparent',
    whiteSpace: 'nowrap',
    borderRadius: 'md',
    transition: 'all 0.3s',
  },
  variants: {
    visual: {
      contained: {color: 'text.invert'},
      outlined: {
        color: 'text.primary',
        _hover: {
          color: 'text.invert',
        },
      },
      text: {},
    },
    size: {
      sm: {height: '6', textStyle: 'body2', minWidth: '16', padding: 1},
      md: {height: '10', textStyle: 'body1', minWidth: '16', padding: 2},
      lg: {height: '12', textStyle: 'body1', minWidth: '16', padding: 2},
    },
    color: {
      primary: {},
      secondary: {},
      surface: {},
      success: {},
      danger: {},
      info: {},
      warning: {},
      background: {},
      backgroundVariant: {},
      stroke: {},
      strokeVariant: {},
      textPrimary: {},
      textSecondary: {},
      textInverted: {},
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    visual: 'contained',
    size: 'md',
    color: 'primary',
  },
  compoundVariants: [
    {
      visual: 'contained',
      color: 'primary',
      css: {
        bg: 'primary',
        _hover: {bg: 'primary.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'primary',
      css: {
        border: '1px solid',
        borderColor: 'primary',
        _hover: {bg: 'primary'},
      },
    },
    {
      visual: 'text',
      color: 'primary',
      css: {
        color: 'primary',
      },
    },
    {
      visual: 'contained',
      color: 'secondary',
      css: {
        bg: 'secondary',
        _hover: {bg: 'secondary.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'secondary',
      css: {
        border: '1px solid',
        borderColor: 'secondary',
        _hover: {bg: 'secondary'},
      },
    },
    {
      visual: 'text',
      color: 'secondary',
      css: {
        color: 'secondary',
      },
    },
    {
      visual: 'contained',
      color: 'surface',
      css: {
        bg: 'surface',
        _hover: {bg: 'surface.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'surface',
      css: {
        border: '1px solid',
        borderColor: 'surface',
        _hover: {bg: 'surface'},
      },
    },
    {
      visual: 'text',
      color: 'surface',
      css: {
        color: 'surface',
      },
    },
    {
      visual: 'contained',
      color: 'success',
      css: {
        bg: 'success',
        _hover: {bg: 'success.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'success',
      css: {
        border: '1px solid',
        borderColor: 'success',
        _hover: {bg: 'success'},
      },
    },
    {
      visual: 'text',
      color: 'success',
      css: {
        color: 'success',
      },
    },
    {
      visual: 'contained',
      color: 'danger',
      css: {
        bg: 'danger',
        _hover: {bg: 'danger.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'danger',
      css: {
        border: '1px solid',
        borderColor: 'danger',
        _hover: {bg: 'danger'},
      },
    },
    {
      visual: 'text',
      color: 'danger',
      css: {
        color: 'danger',
      },
    },
    {
      visual: 'contained',
      color: 'info',
      css: {
        bg: 'info',
        _hover: {bg: 'info.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'info',
      css: {
        border: '1px solid',
        borderColor: 'info',
        _hover: {bg: 'info'},
      },
    },
    {
      visual: 'text',
      color: 'info',
      css: {
        color: 'info',
      },
    },
    {
      visual: 'contained',
      color: 'warning',
      css: {
        bg: 'warning',
        _hover: {bg: 'warning.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'warning',
      css: {
        border: '1px solid',
        borderColor: 'warning',
        _hover: {bg: 'warning'},
      },
    },
    {
      visual: 'text',
      color: 'warning',
      css: {
        color: 'warning',
      },
    },
    {
      visual: 'contained',
      color: 'background',
      css: {
        bg: 'background',
        _hover: {bg: 'background.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'background',
      css: {
        border: '1px solid',
        borderColor: 'background',
        _hover: {bg: 'background'},
      },
    },
    {
      visual: 'text',
      color: 'background',
      css: {
        color: 'background',
      },
    },
    {
      visual: 'contained',
      color: 'backgroundVariant',
      css: {
        bg: 'backgroundVariant',
        _hover: {bg: 'backgroundVariant.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'backgroundVariant',
      css: {
        border: '1px solid',
        borderColor: 'backgroundVariant',
        _hover: {bg: 'backgroundVariant'},
      },
    },
    {
      visual: 'text',
      color: 'backgroundVariant',
      css: {
        color: 'backgroundVariant',
      },
    },
    {
      visual: 'contained',
      color: 'stroke',
      css: {
        bg: 'stroke',
        _hover: {bg: 'stroke.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'stroke',
      css: {
        border: '1px solid',
        borderColor: 'stroke',
        _hover: {bg: 'stroke'},
      },
    },
    {
      visual: 'text',
      color: 'stroke',
      css: {
        color: 'stroke',
      },
    },
    {
      visual: 'contained',
      color: 'strokeVariant',
      css: {
        bg: 'strokeVariant',
        _hover: {bg: 'strokeVariant.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'strokeVariant',
      css: {
        border: '1px solid',
        borderColor: 'strokeVariant',
        _hover: {bg: 'strokeVariant'},
      },
    },
    {
      visual: 'text',
      color: 'strokeVariant',
      css: {
        color: 'strokeVariant',
      },
    },
    {
      visual: 'contained',
      color: 'textPrimary',
      css: {
        bg: 'text.primary',
        _hover: {bg: 'text.primary.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'textPrimary',
      css: {
        border: '1px solid',
        borderColor: 'text.primary',
        _hover: {bg: 'text.primary'},
      },
    },
    {
      visual: 'text',
      color: 'textPrimary',
      css: {
        color: 'text.primary',
      },
    },
    {
      visual: 'contained',
      color: 'textSecondary',
      css: {
        bg: 'text.secondary',
        _hover: {bg: 'text.secondary.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'textSecondary',
      css: {
        border: '1px solid',
        borderColor: 'text.secondary',
        _hover: {bg: 'text.secondary'},
      },
    },
    {
      visual: 'text',
      color: 'textSecondary',
      css: {
        color: 'text.secondary',
      },
    },
    {
      visual: 'contained',
      color: 'textInverted',
      css: {
        bg: 'primary',
        _hover: {bg: 'text.inverted.light'},
      },
    },
    {
      visual: 'outlined',
      color: 'textInverted',
      css: {
        border: '1px solid',
        borderColor: 'text.inverted',
        _hover: {bg: 'text.inverted'},
      },
    },
    {
      visual: 'text',
      color: 'textInverted',
      css: {
        color: 'text.inverted',
      },
    },
  ],
});
