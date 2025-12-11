import { isAsyncIterable } from './is-async-iterable';
import { tagChecker } from './util';

export const isAsyncGenerator = tagChecker(
  (value: unknown): value is AsyncGenerator<unknown> =>
    isAsyncIterable(value) &&
    typeof (value as unknown as { next: unknown }).next === 'function' && // Async generators must still have .next()
    typeof (value as unknown as { return: unknown }).return === 'function' &&
    typeof (value as unknown as { throw: unknown }).throw === 'function',
  `asyncGenerator`
);
