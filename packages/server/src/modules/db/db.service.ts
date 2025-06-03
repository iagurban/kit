import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { Prisma, PrismaClient } from '../../generated/db-client';

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
  constructor() {}

  private readonly currentTransactionStore = new AsyncLocalStorage<Prisma.TransactionClient>();

  readonly client = new PrismaClient();

  async inAnyTransaction(fn: () => Promise<void>) {
    return this.currentTransactionStore.getStore() ? fn() : this.inOwnTransaction(fn);
  }

  async inOwnTransaction(fn: () => Promise<void>) {
    if (this.currentTransactionStore.getStore()) {
      throw new Error(`Nested transactions are not supported`);
    }
    return this.client.$transaction(tx => this.currentTransactionStore.run(tx, fn));
  }

  get transaction() {
    return this.currentTransactionStore.getStore() || this.client;
  }
}
