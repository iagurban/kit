import { isIterable } from './is-iterable';
import { isIterator } from './is-iterator';
import { tagChecker } from './util';

export const isIterableIterator = tagChecker(
  (value: unknown): value is IterableIterator<unknown> => isIterator(value) && isIterable(value),
  `iterableIterator`
);
