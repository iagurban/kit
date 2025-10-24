import { notNull } from '@gurban/kit/utils/flow-utils.ts';
import { Context, createContext, Provider, useContext } from 'react';

export const interleaveWithObject = <T,>(a: T[], o: (prev: T, i: number) => T) => {
  if (a.length < 2) {
    return a;
  }
  const r: T[] = [];
  let i = 0;
  for (; i < a.length - 1; ++i) {
    const prev = a[i];
    r.push(prev, o(prev, i));
  }
  r.push(a[i]);
  return r;
};

export const joinNodesWithText = (o: JSX.Element[], text: string, key = text) =>
  interleaveWithObject(o, (p, i) => (
    <span key={`${i}${key}`} style={{ whiteSpace: 'pre' }}>
      {text}
    </span>
  ));

export const makeUseNotNullContext = <T,>(
  ctx: Context<T | undefined>,
  name: string
): readonly [() => T, () => T | undefined, Provider<T | undefined>] => {
  const message = `${name} not provided`;
  return [() => notNull(useContext(ctx), message), () => useContext(ctx), ctx.Provider] as const;
};

export const createUseContext = <T,>(
  name: string
): readonly [() => T, () => T | undefined, Provider<T | undefined>, Context<T | undefined>] => {
  const ctx = createContext<T | undefined>(undefined);
  return [...makeUseNotNullContext(ctx, name), ctx];
};

export const createUsableContext = <T,>(
  name: string
): {
  ctx: Context<T | undefined>;
  use: () => T;
  useIfProvided: () => T | undefined;
  provider: Provider<T | undefined>;
} => {
  const ctx = createContext<T | undefined>(undefined);
  const [use, useIfProvided, provider] = makeUseNotNullContext(ctx, name);
  return { ctx, use, useIfProvided, provider };
};
