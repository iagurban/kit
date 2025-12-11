import { AnyAnyFunction } from '../types';
import { canHaveProperties, tagChecker } from './util';

export const isAwaitable = tagChecker(
  (value: unknown): value is { then: AnyAnyFunction } =>
    canHaveProperties(value) && typeof value.then === 'function',
  `awaitable`
);
