module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // plugins: ['prettier'],
  rules: {},
};
