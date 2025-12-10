module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage/html-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
  testMatch: ['**/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/unsorted/'],
  moduleNameMapper: {
    // Handle specific file imports (if you use import foo from 'lodash-es/foo')
    '^lodash-es/(.*)$': 'lodash/$1',
    // Handle the main entry point
    '^lodash-es$': 'lodash',
  },
};
