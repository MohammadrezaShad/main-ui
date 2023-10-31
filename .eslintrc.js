module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier', // Make sure this is always the last element in the array.
  ],
  plugins: [
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'eslint-plugin-prettier',
    'unused-imports',
    'simple-import-sort',
  ],
  rules: {
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    'no-param-reassign': ['error', {props: true, ignorePropertyModificationsFor: ['state']}],
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-restricted-exports': 'off',
    'no-unused-vars': ['off'],
    'no-empty-interface': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/order': 'off',
    'import/named': 'off',
    'import\no-extraneous-dependencies': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-arrow-callback': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react', '^@?\\w'], ['^(@|components)(/.*|$)'], ['^\\u0000']],
      },
    ],
    semi: ['error', 'always'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
