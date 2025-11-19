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
  type Lane = { stamp: unknown; p: Promise<T>; o: R; canceled?: boolean; ready?: boolean };
  const lanes: { executingLane?: Lane; pendingLane?: Lane } = {};

  const emitter = new Emitter<{ cancel: [] }>();

  const cancelable = <T>(p: Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      emitter.once('cancel', () => reject(new Error('canceled')));
      p.then(resolve).catch(reject);
    });

  const goToExecution = (l: Lane) => {
    // There must be no executing lane at this point because we waited for it.
    if (lanes.executingLane) {
      throw new Error('inconsistency');
    }
    if (l.canceled) {
      throw new Error('canceled');
    }
    lanes.executingLane = l;
    // If the lane we promote is still referenced as pending, clear it;
    // otherwise leave the current pending lane intact (it belongs to the next batch).
    if (lanes.pendingLane === l) {
      lanes.pendingLane = undefined;
    }
    // When this lane finishes, clear executing reference.
    lanes.executingLane.p = lanes.executingLane.p.finally(() => {
      if (lanes.executingLane && lanes.executingLane !== l) {
        // Another lane slipped into executing, which should be impossible here.
        throw new Error('inconsistency');
      }
      lanes.executingLane = undefined;
    });
    return l;
  };

  const waitForNeedExec = (l: Lane): Promise<void> =>
    Promise.all([
      lanes.executingLane?.p.catch(error => {
        console.error(error);
        return null;
      }),
      new Promise<void>(resolve => {
        const onCancel = () => {
          clearTimeout(h);
          resolve();
        };
        emitter.on('cancel', onCancel);
        const h = setTimeout(() => {
          // Mark THIS lane as ready: after delay elapses, it should stop collecting
          // additional arguments; subsequent calls start a new lane.
          l.ready = true;
          emitter.off('cancel', onCancel);
          resolve();
        }, delay);
      }),
    ]).then(() => undefined);

  const executeFullLane = async (l: Lane) => {
    await cancelable(waitForNeedExec(l));

    // After both the delay and any currently executing lane complete,
    // promote this specific lane to executing and run it.
    const { o, canceled } = goToExecution(l);
    // Do not treat falsy "o" as an inconsistency: valid collected values may be 0, '', false, etc.
    if (canceled) {
      throw new Error('inconsistency');
    }

    return cancelable(fn(o));
  };

  const lane = (...args: Args) => {
    if (lanes.pendingLane && !lanes.pendingLane.ready) {
      throw new Error('inconsistency');
    }
    const l: Lane = {
      stamp: Object.create(null),
      // p will be assigned just below to capture this lane
      // so that later promotion doesn't depend on global pending reference.
      p: undefined as unknown as Promise<T>,
      o: collect(null, ...args),
    };
    l.p = executeFullLane(l);
    lanes.pendingLane = l;
    return l.p;
  };

  return Object.assign(
    (...args: Args): Promise<T> => {
      if (lanes.pendingLane) {
        if (lanes.pendingLane.ready) {
          // The previous pending lane is already scheduled; start a new one.
          return lane(...args);
        }
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
