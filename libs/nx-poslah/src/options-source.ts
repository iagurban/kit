import { checked, isString } from '@gurban/kit/core/checks';
import { JsonObject, JsonValue } from '@gurban/kit/core/json-type';
import { get } from 'lodash';

const throwOnUndefined = (path: string): string => {
  throw new ExecutionError(`${path} value is undefined`, {});
};

const processValue = (template: string, getByPath: (path: string) => JsonValue) =>
  template.replace(/\{([\w.]+)}/g, (m, path) => String(getByPath(path)));

export const optionsSource = <E extends JsonObject>(input: E) => {
  const cache: Record<string, JsonValue> = {};
  const building = new Set<string>();

  const retrieveValue = (path: string): JsonValue => {
    const old = cache[path];
    if (old) {
      return old;
    }
    if (building.has(path)) {
      throw new Error(`Circular reference detected for key: ${path}`);
    }
    building.add(path);
    const value = get(input, path);
    const res = typeof value === 'string' ? processValue(value, retrieveValue) : value;
    cache[path] = res;
    building.delete(path);
    return res;
  };

  const getString = <O>(path: string, dflt: (path: string) => O): string | O => {
    const value = retrieveValue(path);
    if (value === undefined) {
      return dflt(path);
    }
    return checked(value, isString, () => `${path} value is not string`);
  }

  return {
    get: getString,
    getOrThrow: (path: string) => getString(path, throwOnUndefined),
  } as const;
};

export class ExecutionError extends Error {
  constructor(name: string, error: unknown) {
    super(name, { cause: error });
  }
}
