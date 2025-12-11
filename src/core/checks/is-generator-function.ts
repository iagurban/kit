import { canHaveProperties, tagChecker } from './util';

export const isGeneratorFunction = tagChecker(
  (value: unknown): value is GeneratorFunction =>
    canHaveProperties(value) && value[Symbol.toStringTag] === 'GeneratorFunction',
  `generatorFunction`
);
