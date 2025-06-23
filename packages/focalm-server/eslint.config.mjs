import { buildEslintConfig, commonRules, serverConfig } from '../kit/helpers/eslint-parts.mjs';

export default buildEslintConfig(
  ['node_modules/**', 'dist/**', 'src/generated/db-client/**'],
  [serverConfig, commonRules]
);
