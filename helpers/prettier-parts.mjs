export const commonPrettierConfig = {
  trailingComma: 'es5',
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',

  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss',
      },
    },
    {
      files: '*.prisma',
      options: {
        parser: 'prisma',
      },
    },
  ],
};
