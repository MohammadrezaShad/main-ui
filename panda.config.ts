import {defineConfig} from '@pandacss/dev';

import plazaPreset from './src/styles/plaza-preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/components/**/*.{ts,tsx,js,jsx}', './src/app/**/*.{ts,tsx,js,jsx}'],

  // Files to exclude
  exclude: [],
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda', plazaPreset],
  // Useful for theme customization
  theme: {
    extend: {},
  },
  jsxFramework: 'react',
  // The output directory for your css system
  outdir: 'styled-system',
});
