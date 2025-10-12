import { buildEslintConfig, commonRules, serverConfig } from '@gurban/kit/helpers/eslint-parts.mjs';

export default buildEslintConfig(
  ['node_modules/**', 'dist/**', 'src/generated/db-client/**'],
  [serverConfig, commonRules]
);
