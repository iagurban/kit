import { AsyncLocalStorage } from 'node:async_hooks';

import { CurrentUser } from '../decorators/current-user';

export const currentUserCtx = {
  __storage: new AsyncLocalStorage<CurrentUser>(),

  get() {
    const store = this.__storage.getStore();
    if (!store) {
      throw new Error('User context not set!');
    }
    return store;
  },

  run<T>(user: CurrentUser, fn: () => Promise<T>): Promise<T> {
    return this.__storage.run(user, fn);
  },
} as const;
