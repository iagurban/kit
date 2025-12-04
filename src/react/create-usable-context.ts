import { Context, createContext, Provider, useContext } from 'react';

import { notNull } from '../core';

/**
 * @template T - The type of the value that the context will hold.
 * @property {Context<T | undefined>} ctx - The React context object created.
 * @property {() => T} use - A hook for accessing the context value that throws an error if the value is `undefined`.
 * @property {() => T | undefined} useIfProvided - A hook for accessing the context value that safely returns `undefined` if no value is provided.
 * @property {Provider<T | undefined>} provider - The React context provider component for wrapping components with the context.
 */
export type UsableContext<T> = {
  ctx: Context<T | undefined>;
  use: () => T;
  useIfProvided: () => T | undefined;
  provider: Provider<T | undefined>;
};

/**
 * A utility function to create a reusable React context with strict type safety.
 *
 * This function generates a context that enforces access to values through
 * custom hooks, ensuring that a value is always provided within the React
 * component tree or explicitly handled otherwise.
 *
 * @template T - The type of the value that the context will hold.
 * @param {string} name - The display name of the context, used for debugging and error messages.
 * @returns {UsableContext<T>}
 */
export const createUsableContext = <T>(name: string): UsableContext<T> => {
  const ctx = createContext<T | undefined>(undefined);
  const useIfProvided = () => useContext(ctx);

  return {
    ctx,
    use: () => notNull(useIfProvided(), () => `"${name}" is not provided`),
    useIfProvided,
    provider: ctx.Provider,
  };
};
