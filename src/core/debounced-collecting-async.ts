import { Emitter } from './emitter';

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
