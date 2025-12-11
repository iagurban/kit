import { AnyFunction } from '../types';
import { canHaveProperties, tagChecker } from './util';

export const isAsyncFunction = tagChecker(
  (value: unknown): value is AnyFunction<Promise<unknown>> =>
    canHaveProperties(value) && value[Symbol.toStringTag] === 'AsyncFunction',
  `asyncFunction`
);
