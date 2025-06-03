import { buildEslintConfig } from '../kit/src/eslint-parts.mjs';
import { frontConfig, frontRules } from '../kit/src/eslint-parts-front.mjs';


export default buildEslintConfig([
  'node_modules/**',
  'dist/**',
  'src/db-client.generated/**',
  '.vite-cache'
], [
  frontConfig,
  frontRules,
]);
