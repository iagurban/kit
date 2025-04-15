import 'ts-jest';

import { samples } from '../utils/array-utils';
import { sleep } from '../utils/async-utils';
import { CancellableRequest } from './cancellable-request';

const measureMsRough = async <T>(fn: () => Promise<T>) => {
  const start = Date.now();
  const result = await fn();
  const ms = Date.now() - start;
  return { result, ms };
};

describe(`CancellableRequest`, () => {
  test(`basic`, async () => {
    const r = new CancellableRequest();

    const maxStages = 2;
    const stageLength = 100;

    const make = (shared: { stage: number }) =>
      r
        .request(async ctx => {
          for (const i of samples(maxStages)) {
            await ctx.stage(sleep.cancellable(stageLength));
            shared.stage++;
          }
          return 123;
        })
        .catch(error => ({ $error: error }));

    const check = async (cancelAfter: number, expectedStage: number) => {
      const canceler = sleep(cancelAfter).then(() => r.cancel());

      const shared = { stage: 0 };
      const res = await make(shared);
      expect(res).toHaveProperty(`$error`);
      expect(shared.stage).toBe(expectedStage);

      await canceler;

      expect(r.context?.cancelled).toBe(true);
      expect(r.context?.done).toBe(true);
    };

    const checkRes = async (cancelAfter: number) => {
      const canceler = sleep(cancelAfter).then(() => r.cancel());

      const shared = { stage: 0 };
      const res = await make(shared);
      expect(res).toBe(123);
      expect(shared.stage).toBe(maxStages);

      await canceler;

      expect(r.context?.cancelled).toBe(false);
      expect(r.context?.done).toBe(true);
    };

    const shiftMs = stageLength / 2;

    await check(0, 0);
    await check(shiftMs, 0);
    await check(stageLength + shiftMs, 1);
    await checkRes(maxStages * stageLength + shiftMs);
  });
});
