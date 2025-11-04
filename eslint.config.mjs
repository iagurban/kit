
import { buildEslintConfig } from './src/helpers/eslint-parts.mjs';
import { frontConfig, frontRules } from './src/helpers/eslint-parts-front.mjs';


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
