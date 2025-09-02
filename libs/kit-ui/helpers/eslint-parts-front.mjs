import react from 'eslint-plugin-react';
import globals from 'globals/index.js';

import { commonLanguageOptions, commonPlugins, commonRules } from '../../kit/helpers/eslint-parts.mjs';

export const frontConfig = {
  languageOptions: {
    ...commonLanguageOptions,
    parserOptions: {
      ...commonLanguageOptions.parserOptions,
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.es2025,
      ...globals.browser,
      ...globals.jest,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: {
    ...commonPlugins,
    react,
  },
};

export const frontRules = {
  ...commonRules,
  rules: {
    ...commonRules.rules,
    'react/react-in-jsx-scope': 'off',
  },
};
