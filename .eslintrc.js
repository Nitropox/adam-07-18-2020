module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'react-native/no-inline-styles': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: false,
            allowTypedFunctionExpressions: false,
            allowHigherOrderFunctions: false,
          },
        ],
      },
    },
  ],
};
