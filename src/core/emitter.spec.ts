import { Emitter } from './emitter';

describe('Emitter', () => {
  type Events = {
    eventA: [number];
    eventB: [string, boolean];
  };

  let emitter: Emitter<Events>;

  beforeEach(() => {
    emitter = new Emitter<Events>();
  });

  describe('on method', () => {
    it('should add a listener for a specific event', () => {
      const mockListener = jest.fn();
      emitter.on('eventA', mockListener);

      emitter.emit('eventA', 42);
      expect(mockListener).toHaveBeenCalledWith(42);
    });

    it('should allow removing the listener using the returned function', () => {
      const mockListener = jest.fn();
      const removeListener = emitter.on('eventA', mockListener);

      removeListener();
      emitter.emit('eventA', 42);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe('once method', () => {
    it('should add a listener that gets called only once', () => {
      const mockListener = jest.fn();
      emitter.once('eventB', mockListener);

      emitter.emit('eventB', 'hello', true);
      emitter.emit('eventB', 'world', false);

      expect(mockListener).toHaveBeenCalledTimes(1);
      expect(mockListener).toHaveBeenCalledWith('hello', true);
    });

    it('should allow removing the listener before it is called', () => {
      const mockListener = jest.fn();
      const removeListener = emitter.once('eventB', mockListener);

      removeListener();
      emitter.emit('eventB', 'hello', true);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe('off method', () => {
    it('should remove a specific listener for an event', () => {
      const mockListener = jest.fn();
      emitter.on('eventA', mockListener);

      emitter.off('eventA', mockListener);
      emitter.emit('eventA', 42);
      expect(mockListener).not.toHaveBeenCalled();
    });

    it('should remove listeners from both persistent and once collections', () => {
      const mockListener = jest.fn();
      emitter.on('eventA', mockListener);
      emitter.once('eventA', mockListener);

      emitter.off('eventA', mockListener);
      emitter.emit('eventA', 42);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe('emit method', () => {
    it('should invoke listeners with the correct arguments', () => {
      const mockListener = jest.fn();
      emitter.on('eventB', mockListener);

      emitter.emit('eventB', 'test', false);
      expect(mockListener).toHaveBeenCalledWith('test', false);
    });

    it('should collect and throw errors from listeners', () => {
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      emitter.on('eventA', errorListener);

      expect(() => emitter.emit('eventA', 42)).toThrow('Listener error');
    });
  });

  describe('ro property', () => {
    it('should return a read-only interface without the emit method', () => {
      const readOnlyEmitter = emitter.ro;
      //// @ts-expect-error Emit should not exist on read-only interface
      // TODO expect(() => readOnlyEmitter.emit('eventA', 42)).toThrow();
      expect(readOnlyEmitter.on).toBeDefined();
      expect(readOnlyEmitter.off).toBeDefined();
      expect(readOnlyEmitter.once).toBeDefined();
    });
  });
});
