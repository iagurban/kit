import { ClassConstructor } from '../types';
import { isGeneratorFunction } from './is-generator-function';
import { canHaveProperties, tagChecker } from './util';

export const isConstructor = tagChecker(
  (value: unknown): value is ClassConstructor<unknown> =>
    canHaveProperties(value) && !!value.prototype && !isGeneratorFunction(value),
  `constructor`
);
