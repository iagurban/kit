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

export type TransactionOptions = Parameters<PrismaClient['$transaction']>[1];

@Injectable()
export class DbService {
  constructor() {}

  private readonly currentTransactionStore = new AsyncLocalStorage<{
    client: Prisma.TransactionClient;
    options: TransactionOptions;
  }>();

  readonly client = new PrismaClient();

  inAnyTransaction<T>(fn: () => Promise<T>): Promise<T>;
  inAnyTransaction<T>(options: TransactionOptions, fn: () => Promise<T>): Promise<T>;
  async inAnyTransaction<T>(fnOrOptions: (() => Promise<T>) | TransactionOptions, fn2?: () => Promise<T>) {
    const [options, fn] =
      typeof fnOrOptions === `function` ? ([{}, fnOrOptions] as const) : ([fnOrOptions, fn2!] as const);

    const current = this.currentTransactionStore.getStore();
    if (current) {
      if (current.options?.isolationLevel !== options?.isolationLevel) {
        /// TODO check current transaction isolation level to be enough for same in options
        console.warn(
          `Transaction isolation level not matching: ${current.options?.isolationLevel} !== ${options?.isolationLevel}`
        );
      }
      return fn();
    }
    return this.inOwnTransaction(options, fn);
  }

  inOwnTransaction<T>(fn: () => Promise<T>): Promise<T>;
  inOwnTransaction<T>(options: TransactionOptions, fn: () => Promise<T>): Promise<T>;
  async inOwnTransaction<T>(fnOrOptions: (() => Promise<T>) | TransactionOptions, fn2?: () => Promise<T>) {
    if (this.currentTransactionStore.getStore()) {
      throw new Error(`Nested transactions are not supported`);
    }
    const [options, fn] =
      typeof fnOrOptions === `function` ? ([{}, fnOrOptions] as const) : ([fnOrOptions, fn2!] as const);
    return this.client.$transaction(
      tx => this.currentTransactionStore.run({ client: tx, options }, fn),
      options
    );
  }

  get transaction() {
    return this.currentTransactionStore.getStore()?.client || this.client;
  }
}
