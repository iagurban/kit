import { Emitter } from '../emitter';
import { debugAssert } from '../flow/assertions';
import { sleep } from '../sleep';
import { PromiseController } from './promise-controller';

/**
 * Creates a debounced function that collects arguments from multiple calls and executes an async function with the collected arguments.
 *
 * Here's how it works:
 * 1. The first call to the created function starts a "window" of `delay` milliseconds.
 * 2. Any subsequent calls during this window will have their arguments collected by the `collect` function.
 *    These calls do not reset the delay.
 * 3. After the `delay` has passed, the `fn` function is called with the final collected arguments.
 * 4. Each call to the debounced function returns a promise. This promise resolves with the result of the `fn` call
 *    that consumes the arguments from that call. All calls within the same window will be resolved with the same result.
 *
 * @template Args The type of arguments that the debounced function accepts.
 * @template T The type of the value returned by the provided asynchronous function.
 * @template R The type used to collect and accumulate arguments within the delay period.
 *
 * @param {number} delay The debounce delay in milliseconds. This is the "window" during which calls are collected.
 * @param {function(o: R | null, ...args: Args): R} collect A function to process and accumulate arguments over multiple calls. It receives the current accumulation and the new arguments, and returns the updated value.
 * @param {function(o: R): Promise<T>} fn The asynchronous function to execute once the debounce delay elapses, using the accumulated arguments.
 *
 * @returns {((...args: Args) => Promise<T>) & { cancel: () => void }} A debounced function. Each call returns a promise that resolves with the result from `fn`. Includes a `cancel` method to abort pending executions.
 */
export const debouncedCollectingAsync = <Args extends readonly unknown[], T, R>(
  delay: number,
  collect: (o: R | null, ...args: Args) => R,
  fn: (o: R) => Promise<T>
): ((...args: Args) => Promise<T>) & { cancel: (reason: string) => void } => {
  type LaneBase = { stamp: unknown; o: R; canceled?: boolean; ready?: boolean };

  type PreCreatedLane = LaneBase & { p?: Promise<T> };
  type Lane = LaneBase & { p: Promise<T> };

  const lanes: { executingLane?: Lane; pendingLane?: Lane } = {};

  const emitter = new Emitter<{ cancel: [string] }>();

  const cancelable = <T>(p: Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      emitter.once('cancel', () => reject(new Error('canceled')));
      p.then(resolve).catch(reject);
    });

  const executeLane = (l: Lane) => {
    debugAssert(!l.canceled);
    // There must be no executing lane at this point because we waited for it.
    debugAssert(!lanes.executingLane);

    lanes.executingLane = l;
    // If the lane we promote is still referenced as pending, clear it;
    // otherwise leave the current pending lane intact (it belongs to the next batch).
    if (lanes.pendingLane === l) {
      lanes.pendingLane = undefined;
    }
    // When this lane finishes, clear executing reference.
    lanes.executingLane.p = lanes.executingLane.p.finally(() => {
      // Another lane slipped into executing, which should be impossible here.
      debugAssert(!lanes.executingLane || lanes.executingLane === l);
      lanes.executingLane = undefined;
    });
    return l;
  };

  const waitLaneStarting = async (l: PreCreatedLane): Promise<void> => {
    const ac = new PromiseController();
    emitter.once(`cancel`, ac.abort);
    return sleep(delay, ac).then(() => {
      // Mark THIS lane as ready: after delay elapses, it should stop collecting
      // additional arguments; subsequent calls start a new lane.
      l.ready = true;
    });
  };

  const waitForExecFree = async (): Promise<void> => {
    await lanes.executingLane?.p.catch(error => {
      console.error(error);
      return null;
    });
    return undefined;
  };

  const executeFullLane = async (preLane: PreCreatedLane) => {
    await cancelable(Promise.all([waitForExecFree(), waitLaneStarting(preLane)]));

    const lane = preLane as Lane; // after await, l.p already assigned

    // After both the delay and any currently executing lane complete,
    // promote this specific lane to executing and run it.
    const { o, canceled } = executeLane(lane);
    // Do not treat falsy "o" as an inconsistency: valid collected values may be 0, '', false, etc.

    debugAssert(!canceled);

    return cancelable(fn(o));
  };

  const createPendingLane = (...args: Args): Promise<T> => {
    debugAssert(!lanes.pendingLane || lanes.pendingLane.ready);

    const l: PreCreatedLane = {
      stamp: Object.create(null),
      o: collect(null, ...args),
    };
    l.p = executeFullLane(l);
    lanes.pendingLane = l as Lane;
    return l.p;
  };

  const createOrUpdatePendingLane = (...args: Args): Promise<T> => {
    if (!lanes.pendingLane || lanes.pendingLane.ready) {
      return createPendingLane(...args);
    }
    lanes.pendingLane.o = collect(lanes.pendingLane.o, ...args);
    return lanes.pendingLane.p;
  };

  return Object.assign(createOrUpdatePendingLane, {
    cancel: (reason: string) => {
      emitter.emit('cancel', reason);
      for (const k of [`pendingLane`, `executingLane`] as const) {
        const c = lanes[k];
        if (c) {
          c.canceled = true;
          lanes[k] = undefined;
        }
      }
    },
  });
};
