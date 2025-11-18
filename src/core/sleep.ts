import { PromiseController } from './async/promise-controller';
import { CancelledError } from './errors/cancelled-error';

export const sleep = (ms: number, ac?: PromiseController) =>
  ac
    ? new Promise((resolve, reject) => {
        const to = setTimeout(() => {
          ac.off(handler);
          resolve(undefined);
        }, ms);

        const handler = (reason: string) => {
          clearTimeout(to);
          ac.off(handler);
          reject(new CancelledError(reason));
        };
        ac.on(handler);
      })
    : new Promise(resolve => setTimeout(resolve, ms));
