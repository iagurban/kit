// Описываем тип для функции shouldRetry

import { sleep } from '../sleep';

type ShouldRetryFn = (
  error: unknown,
  attempt: number
) => boolean | number | undefined | Promise<boolean | number | undefined>;

/**
 * Выполняет асинхронную функцию fn, повторяя ее в случае сбоя
 * в соответствии с логикой, определенной в shouldRetry.
 * @param shouldRetry Функция, определяющая, нужно ли повторять попытку.
 * @param fn Асинхронная функция для выполнения.
 */
export async function retrying<T>(
  shouldRetry: ShouldRetryFn,
  fn: (attempt: number) => Promise<T>
): Promise<T> {
  for (let attempt = 1; ; ++attempt) {
    try {
      return await fn(attempt);
    } catch (error) {
      const retryAction = await shouldRetry(error, attempt);

      if (retryAction === true) {
        continue;
      }

      if (typeof retryAction === 'number' && retryAction > 0) {
        await sleep(retryAction);
        continue;
      }

      throw error;
    }
  }
}
