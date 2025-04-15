import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { PrismaClient } from '../db-client.generated';

export const DbClient = PrismaClient;
export type DbClient = PrismaClient;
// Object.defineProperty(DbClient as { name: string }, `name`, { value: 'DbClient' });

const makeMethods =
  <K>() =>
  <T extends Record<string, (o: K) => (...args: any[]) => any>>(o: T) =>
    o;

// const wrapPrismaClientWithHello = (client: PrismaClient): PrismaClient & { logHello?: () => void } => {
//   // Return a Proxy that wraps the client
//   return new Proxy(client, {
//     get(target, prop, receiver) {
//       if (prop === 'logHello') {
//         // Add a custom method to log "hello"
//         return () => {
//           console.log('hello');
//         };
//       }
//       // Delegate all other property/method calls to the original PrismaClient instance
//       return Reflect.get(target, prop, receiver);
//     },
//   });
// };
//
// const qqq = makeMethods<PrismaClient>()({
//   test1: c => (a: number) => 123,
//   test2: c => (a: string) => `edsf`,
// });

@Injectable()
export class DbService {
  constructor(readonly mainClient: DbClient) {}

  readonly currentTransactionStore = new AsyncLocalStorage();

  async withNewTransaction(fn: () => Promise<void>) {
    const c = new PrismaClient();
    /// TODO execute raw transaction, commit or rollback
    try {
      return await this.currentTransactionStore.run(c, fn);
    } finally {
      await c.$disconnect();
    }
  }

  async withExistingOrNewTransaction(fn: () => Promise<void>) {
    return this.currentTransactionStore.getStore() ? fn() : this.withNewTransaction(fn);
  }

  get client() {
    return this.currentTransactionStore.getStore() || this.mainClient;
  }
}
