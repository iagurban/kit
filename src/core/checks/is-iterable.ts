import { canHaveProperties, tagChecker } from './util';

export const isIterable = tagChecker(
  (value: unknown): value is Iterable<unknown> =>
    canHaveProperties(value) && typeof value[Symbol.iterator] === 'function',
  `iterable`
);
