module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-a11y', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict', 'plugin:jsx-a11y/strict'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
  },
}
