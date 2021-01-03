module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base/legacy'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  pattern: ['prettier'],
  rules: {},
};
