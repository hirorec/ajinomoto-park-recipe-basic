module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-irregular-whitespace': ['off'],
    camelcase: ['off'],
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
}
