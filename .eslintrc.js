module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': 0,
    'indent': ['error', 2],

  },
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true,
      'experimentalObjectRestSpread': true
    },
  },
};
