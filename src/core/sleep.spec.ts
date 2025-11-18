import { PromiseController } from './async/promise-controller';
import { sleep } from './sleep';

describe('sleep', () => {
  it('should resolve after the specified duration', async () => {
    const start = Date.now();
    const duration = 100;

    await sleep(duration);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(duration);
  });

  it('should resolve immediately if duration is 0', async () => {
    const start = Date.now();

    await sleep(0);

    const end = Date.now();
    expect(end - start).toBeLessThanOrEqual(10);
  });

  it('should be cancellable using PromiseController', async () => {
    const duration = 200;
    const controller = new PromiseController();
    const abortReason = 'Operation cancelled';

    const sleepPromise = sleep(duration, controller);

    setTimeout(() => controller.abort(abortReason), 100);

    await expect(sleepPromise).rejects.toThrow(abortReason);
  });

  it('should call external abort handlers even after sleep resolves (attachable controller model)', async () => {
    const duration = 100;
    const controller = new PromiseController();

    const sleepPromise = sleep(duration, controller);

    const handler = jest.fn();
    controller.on(handler);

    await sleepPromise; // sleep unsubscribes its own internal handler only

    const reason = 'Abort after completion';
    controller.abort(reason);
    expect(handler).toHaveBeenCalledWith(reason);
  });

  it('should not call external handler after sleep resolves if it was unsubscribed by the client', async () => {
    const duration = 100;
    const controller = new PromiseController();

    const sleepPromise = sleep(duration, controller);

    const handler = jest.fn();
    controller.on(handler);

    await sleepPromise;
    // client is responsible for cleaning up its handlers when done
    controller.off(handler);

    controller.abort('Abort after completion');
    expect(handler).not.toHaveBeenCalled();
  });

  it('should allow multiple abort handlers to be notified when aborted', async () => {
    const duration = 300;
    const controller = new PromiseController();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    controller.on(handler1);
    controller.on(handler2);

    const sleepPromise = sleep(duration, controller);

    setTimeout(() => controller.abort('Cancelled'), 100);

    await expect(sleepPromise).rejects.toThrow('Cancelled');
    expect(handler1).toHaveBeenCalledWith('Cancelled');
    expect(handler2).toHaveBeenCalledWith('Cancelled');
  });
});
