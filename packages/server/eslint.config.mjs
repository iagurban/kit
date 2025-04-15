import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals/index.js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'src/db-client.generated/**'],
  },

  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.prisma'],
      },
      globals: {
        ...globals.nodeBuiltin,
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
    },

    plugins: {
      prettier: prettier,
      unicorn: unicorn,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

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
  },

  {
    files: ['*.js'],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },

  {
    files: ['*.prisma'],
    languageOptions: {
      parser: 'any-eslint-parser',
    },
  },

  prettierConfig,
];
