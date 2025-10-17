import { buildEslintConfig, clientConfig, commonRules } from '../../libs/kit/helpers/eslint-parts.mjs';

export default buildEslintConfig(
  ['node_modules/**', 'dist/**', 'src/generated/db-client/**'],
  [clientConfig, commonRules]
);
