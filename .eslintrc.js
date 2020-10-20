module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/errors',
    'plugin:fsd/all',
    'airbnb-base/legacy'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'fsd'
  ],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^[A-Za-z]{1,20}Mock$', varsIgnorePattern: '^I[A-Za-z]{1,40}$' }],
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'no-unused-expressions': 'off',
    'no-new': 'off',
    'no-undef': 'off',
    indent: ['error', 2]
  }
};
