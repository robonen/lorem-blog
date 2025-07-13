import antfu from '@antfu/eslint-config';

export default antfu(
  {
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
      overrides: {
        'style/comma-dangle': ['error', 'always-multiline'],
      },
    },
    vue: true,
    typescript: true,
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'regexp/no-obscure-range': ['error', {
        allowed: 'all',
      }],
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'import/first': 'off',
    },
  },
);
