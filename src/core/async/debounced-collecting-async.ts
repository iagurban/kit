import { Emitter } from '../emitter';

/**
 * Creates a function that combines debouncing logic with asynchronous callback execution.
 * The function allows for multiple calls within a specified delay to be grouped and processed together,
 * ensuring that the provided asynchronous function is executed only after the delay has elapsed.
 *
 * @template Args The type of arguments that the debounced function accepts.
 * @template T The type of the value returned by the provided asynchronous function.
 * @template R The type used to collect and accumulate arguments within the delay period.
 *
 * @param {number} delay The debounce delay in milliseconds; during this time, additional calls are collected.
 * @param {function(o: R | null, ...args: Args): R} collect A function to process and accumulate arguments over multiple calls. It receives the current accumulation and the new arguments, and returns the updated value.
 * @param {function(o: R): Promise<T>} fn The asynchronous function to execute once the debounce delay elapses, using the accumulated arguments.
 *
 * @returns {((...args: Args) => Promise<T>) & { cancel: () => void }} A debounced function that processes arguments with the provided collect method and executes the asynchronous function after the delay.
 * Includes a `cancel` method to cancel pending executions.
 */
export const debouncedCollectingAsync = <Args extends readonly unknown[], T, R>(
  delay: number,
  collect: (o: R | null, ...args: Args) => R,
  fn: (o: R) => Promise<T>
): ((...args: Args) => Promise<T>) & { cancel: () => void } => {
  type Lane = { stamp: unknown; p: Promise<T>; o: R; canceled?: boolean };
  const lanes: { executingLane?: Lane; pendingLane?: Lane } = {};

  const emitter = new Emitter<{ cancel: void }>();

  const cancelable = <T>(p: Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      emitter.once('cancel', () => reject(new Error('canceled')));
      p.then(resolve).catch(reject);
    });

  const goToExecution = (stamp: unknown) => {
    const { pendingLane } = lanes;
    if (!pendingLane || pendingLane.stamp !== stamp || lanes.executingLane) {
      throw new Error('inconsistency');
    }
    if (pendingLane.canceled) {
      throw new Error('canceled');
    }
    lanes.executingLane = pendingLane;
    lanes.pendingLane = undefined;
    lanes.executingLane.p = lanes.executingLane.p.finally(() => {
      if (lanes.executingLane?.stamp !== stamp) {
        throw new Error('inconsistency');
      }
      lanes.executingLane = undefined;
    });
    return pendingLane;
  };

  const waitForNeedExec = (): Promise<void> =>
    Promise.all([
      lanes.executingLane?.p.catch(error => {
        console.error(error);
        return null;
      }),
      new Promise<void>(resolve => {
        emitter.on('cancel', () => {
          clearTimeout(h);
          resolve();
        });
        const h = setTimeout(resolve, delay);
      }),
    ]).then(() => undefined);

  const executeFullLane = async (stamp: unknown) => {
    await cancelable(waitForNeedExec());

    const { o, canceled } = goToExecution(stamp);
    if (!o || canceled) {
      throw new Error('inconsistency');
    }

    return cancelable(fn(o));
  };

  const lane = (...args: Args) => {
    if (lanes.pendingLane) {
      throw new Error('inconsistency');
    }
    const stamp = Object.create(null);
    return (lanes.pendingLane = {
      stamp,
      p: executeFullLane(stamp),
      o: collect(null, ...args),
    }).p;
  };

  return Object.assign(
    (...args: Args): Promise<T> => {
      if (lanes.pendingLane) {
        lanes.pendingLane.o = collect(lanes.pendingLane.o, ...args);
        return lanes.pendingLane.p;
      }
      return lane(...args);
    },
    {
      cancel: () => {
        emitter.emit('cancel');
        for (const k of Object.keys(lanes) as (keyof typeof lanes)[]) {
          const c = lanes[k];
          if (c) {
            c.canceled = true;
            lanes[k] = undefined;
          }
        }
      },
    }
  );
};
