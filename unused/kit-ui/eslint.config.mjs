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

import { commonRules, fixAfterPrettier } from '@gurban/kit/helpers/eslint-parts.mjs';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'dist-split/**', '.parcel-cache/**', 'src/db-client.generated/**'],
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
  },

  commonRules,

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

  fixAfterPrettier,
];
