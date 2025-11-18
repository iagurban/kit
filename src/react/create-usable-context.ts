import { Context, createContext, Provider, useContext } from 'react';

import { notNull } from '../core';

const makeUseNotNullContext = <T>(
  ctx: Context<T | undefined>,
  name: string
): readonly [() => T, () => T | undefined, Provider<T | undefined>] => {
  const message = `${name} not provided`;
  return [() => notNull(useContext(ctx), message), () => useContext(ctx), ctx.Provider] as const;
};

export const createUsableContext = <T>(
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
