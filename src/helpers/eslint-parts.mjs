import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals/index.js';
import tseslint from 'typescript-eslint';

const installCommand = `
yarn add eslint eslint-config-next eslint-config-prettier eslint-plugin-import eslint-plugin-prettier \
  eslint-plugin-simple-import-sort eslint-plugin-unicorn eslint-plugin-unused-imports \
  prettier @eslint/js typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-react
`;
void installCommand;

export const commonPlugins = {
  prettier: prettier,
  unicorn: unicorn,
  import: importPlugin,
  'simple-import-sort': simpleImportSort,
  'unused-imports': unusedImports,
};

export const commonLanguageOptions = {
  parser: tsParser,
  parserOptions: {
    projectService: true,
  },
  sourceType: 'commonjs',
};

export const serverConfig = {
  languageOptions: {
    ...commonLanguageOptions,
    parserOptions: {
      ...commonLanguageOptions.parserOptions,
      extraFileExtensions: ['.prisma'],
    },
    globals: {
      ...globals.nodeBuiltin,
      ...globals.node,
      ...globals.jest,
    },
  },

  plugins: commonPlugins,
};

export const clientConfig = {
  languageOptions: {
    ...commonLanguageOptions,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
  },

  plugins: { ...commonPlugins, react, 'react-hooks': reactHooks },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

export const commonRules = {
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'no-console': 'warn',
    'prettier/prettier': 'error',

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-top-level-await': 'off',

    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^[_$]',
      },
    ],
  },
};

export const fixAfterPrettier = {
  rules: {
    curly: 'error',
  },
};

export const jsConfig = {
  files: ['*.js'],
  rules: {
    'unicorn/prefer-module': 'off',
  },
};

export const prismaConfig = {
  files: ['*.prisma'],
  languageOptions: {
    parser: 'any-eslint-parser',
  },
};

export const coreEslintConfig = ignores => [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores,
  },
];

export const buildEslintConfig = (ignores, configs) => [
  ...coreEslintConfig(ignores),
  ...configs,
  jsConfig,
  prismaConfig,
  prettierConfig,
  fixAfterPrettier,
];
