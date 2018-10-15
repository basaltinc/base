const prettierConfig = require('./prettierrc');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'jest', 'jsdoc'],
  env: {
    'jest/globals': true,
  },
  globals: {
    document: true,
    window: true,
  },
  rules: {
    'consistent-return': [0],
    'import/no-extraneous-dependencies': [0],
    'import/prefer-default-export': [0],
    'jsdoc/check-types': 'error',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'jsx-a11y/href-no-hash': 'off',
    'no-console': [0],
    'no-param-reassign': [1, { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-useless-constructor': 'off',
    'prettier/prettier': ['error', prettierConfig],
    'react/boolean-prop-naming': [2],
    'react/destructuring-assignment': [0],
    'react/forbid-prop-types': [2, { forbid: ['any', 'array'] }],
    'react/jsx-key': [2],
    'react/no-array-index-key': [2],
    'react/no-danger': [0],
    'react/require-extension': [0],
    strict: [0],
    'valid-jsdoc': 'error',
  },
};
