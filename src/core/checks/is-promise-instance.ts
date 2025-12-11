import { tagChecker } from './util';

export const isPromiseInstance = tagChecker(
  (value: unknown): value is Promise<unknown> => value instanceof Promise,
  `Promise`
);
