export function catching<T, C>(fn: () => T, onCatch: () => C): T | C;
export function catching<T>(fn: () => T, onCatch: () => T): T;

export function catching<T, C>(fn: () => T, onCatch: () => C): T | C {
  try {
    return fn();
  } catch {
    return onCatch();
  }
}

export function catchingAsync<T, C>(
  fn: () => Promise<T>,
  onCatch: (e: unknown) => C | Promise<C>
): Promise<T | C>;
export function catchingAsync<T>(fn: () => Promise<T>, onCatch: (e: unknown) => T | Promise<T>): Promise<T>;

export async function catchingAsync<T, C>(
  fn: () => Promise<T>,
  onCatch: (e: unknown) => C | Promise<C>
): Promise<T | C> {
  try {
    return await fn();
  } catch (e) {
    return onCatch(e);
  }
}

export const warnCatch = (fn: () => unknown): void => {
  try {
    fn();
  } catch (error) {
    console.warn(error);
  }
};

export const throwing = <T = undefined>(e: () => unknown): T => {
  throw e();
};

export class NullError extends Error {}

export const notNull = <T>(
  o: T | null | undefined,
  message: string | (() => Error | string) = 'arg is null'
): T => {
  if (o == null) {
    if (typeof message === 'string') {
      throw new NullError(message);
    }
    const e = message();
    if (typeof e === 'string') {
      throw new NullError(e);
    }
    throw e;
  }
  return o;
};
