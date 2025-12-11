import { canHaveProperties, tagChecker } from './util';

export const isIteratorResult = tagChecker(
  (value: unknown): value is IteratorResult<unknown> =>
    canHaveProperties(value) && 'value' in value && typeof value.done === 'boolean',
  `iteratorResult`
);
