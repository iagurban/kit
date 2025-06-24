// import js from '@eslint/js';
// import tsParser from '@typescript-eslint/parser';
// import prettierConfig from 'eslint-config-prettier/flat';
// import importPlugin from 'eslint-plugin-import';
// import prettier from 'eslint-plugin-prettier';
// import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import unicorn from 'eslint-plugin-unicorn';
// import unusedImports from 'eslint-plugin-unused-imports';
// import globals from 'globals/index.js';
// import tseslint from 'typescript-eslint';
//
// import { commonRules, fixAfterPrettier } from './packages/kit/helpers/eslint-parts.mjs';

/// TODO replace with Parts

// export default [
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     ignores: ['node_modules/**', 'packages/*/dist/**', 'packages/*/dist-split/**', 'packages/*/.parcel-cache/**', 'packages/*/src/db-client.generated/**', 'packages/kit-ui/*'],
//   },
//
//   {
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         projectService: true,// ['./tsconfig.json'],
//         extraFileExtensions: ['.prisma'],
//       },
//       globals: {
//         ...globals.nodeBuiltin,
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//     },
//
//     plugins: {
//       prettier: prettier,
//       unicorn: unicorn,
//       import: importPlugin,
//       'simple-import-sort': simpleImportSort,
//       'unused-imports': unusedImports,
//     },
//   },
//
//   commonRules,
//
//   {
//     files: ['*.js'],
//     rules: {
//       'unicorn/prefer-module': 'off',
//     },
//   },
//
//   {
//     files: ['*.prisma'],
//     languageOptions: {
//       parser: 'any-eslint-parser',
//     },
//   },
//
//   prettierConfig,
//
//   fixAfterPrettier,
// ];

import { buildEslintConfig } from './packages/kit/helpers/eslint-parts.mjs';
import { frontConfig, frontRules } from './packages/kit-ui/helpers/eslint-parts-front.mjs';


export default buildEslintConfig([
  'node_modules/**',
  'dist/**',
  'src/db-client.generated/**',
  '.vite-cache',
  'src/i18n/*'
], [
  frontConfig,
  frontRules,
]);
