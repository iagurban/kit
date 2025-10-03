import { buildEslintConfig, commonRules, serverConfig } from '../../libs/kit/helpers/eslint-parts.mjs';

export default buildEslintConfig(
  ["dist"],
  [serverConfig, commonRules]
);
