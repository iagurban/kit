import { canHaveProperties, tagChecker } from './util';

export const isIterator = tagChecker(
  (value: unknown): value is Iterator<unknown> =>
    canHaveProperties(value) && typeof value.next === 'function',
  `iterator`
);
