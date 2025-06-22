import { Context, createContext, Provider, useContext } from 'react';

import { notNull } from '../../../kit/src/utils/flow-utils';
import { Nullish } from '../../../kit/src/utils/types';

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
  ctx: Context<T | Nullish>,
  name: string
): readonly [() => T, () => T | Nullish, Provider<T | Nullish>] => {
  const message = `${name} not provided`;
  return [() => notNull(useContext(ctx), message), () => useContext(ctx), ctx.Provider] as const;
};

export const createUseContext = <T,>(
  name: string
): readonly [() => T, () => T | Nullish, Provider<T | Nullish>, Context<T | Nullish>] => {
  const ctx = createContext<T | Nullish>(undefined);
  return [...makeUseNotNullContext(ctx, name), ctx];
};

export const createUsableContext = <T,>(
  name: string
): {
  ctx: Context<T | Nullish>;
  use: () => T;
  useIfProvided: () => T | Nullish;
  provider: Provider<T | Nullish>;
} => {
  const ctx = createContext<T | Nullish>(undefined);
  const [use, useIfProvided, provider] = makeUseNotNullContext(ctx, name);
  return { ctx, use, useIfProvided, provider };
};
