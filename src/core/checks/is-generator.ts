import { isIterableIterator } from './is-iterable-iterator';
import { tagChecker } from './util';

export const isGenerator = tagChecker(
  (value: unknown): value is Generator<unknown> =>
    isIterableIterator(value) && typeof value.return === 'function' && typeof value.throw === 'function',
  `generator`
);
