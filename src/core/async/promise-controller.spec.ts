import { PromiseController } from './promise-controller';

describe('PromiseController', () => {
  it('should not be aborted initially', () => {
    const controller = new PromiseController();
    expect(controller.aborted).toBe(false);
  });

  it('should set aborted to true when abort is called', () => {
    const controller = new PromiseController();
    controller.abort('Test reason');
    expect(controller.aborted).toBe(true);
  });

  it('should call all registered handlers on abort', () => {
    const controller = new PromiseController();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    controller.on(handler1);
    controller.on(handler2);

    controller.abort('Test reason');

    expect(handler1).toHaveBeenCalledWith('Test reason');
    expect(handler2).toHaveBeenCalledWith('Test reason');
  });

  it('should clear all handlers after abort', () => {
    const controller = new PromiseController();
    const handler = jest.fn();

    controller.on(handler);
    controller.abort('Test reason');
    controller.abort('Another reason');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should remove a handler with off when not aborted', () => {
    const controller = new PromiseController();
    const handler = jest.fn();

    controller.on(handler);
    controller.off(handler);

    controller.abort('Test reason');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple registrations of the same handler and decrement correctly', () => {
    const controller = new PromiseController();
    const handler = jest.fn();

    controller.on(handler);
    controller.on(handler);

    controller.off(handler);

    controller.abort('Test reason');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should remove all instances of a handler when off is called with "all" set to true', () => {
    const controller = new PromiseController();
    const handler = jest.fn();

    controller.on(handler);
    controller.on(handler);

    controller.off(handler, true);

    controller.abort('Test reason');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should aggregate errors from handlers on abort', () => {
    const controller = new PromiseController();
    const errorHandler = jest.fn(() => {
      throw new Error('Handler error');
    });

    controller.on(errorHandler);

    expect(() => controller.abort('Test reason')).toThrow();
    expect(errorHandler).toHaveBeenCalledWith('Test reason');
  });

  it('should do nothing when abort is called multiple times', () => {
    const controller = new PromiseController();
    const handler = jest.fn();

    controller.on(handler);
    controller.abort('First reason');
    controller.abort('Second reason');

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
