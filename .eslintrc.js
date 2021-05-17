module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      { allowDirectConstAssertionInArrowFunctions: true }
    ]
  }
};
