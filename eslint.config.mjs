import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
    overrides: {
      'style/comma-dangle': ['error', 'always-multiline'],
    },
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'regexp/no-obscure-range': ['error', {
      allowed: 'all',
    }],
  },
  vue: true,
  typescript: true,
});
