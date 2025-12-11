import { canHaveProperties, tagChecker } from './util';

export const isAsyncIterable = tagChecker(
  (value: unknown): value is AsyncIterable<unknown> =>
    canHaveProperties(value) && typeof value[Symbol.asyncIterator] === 'function',
  `asyncIterable`
);
