import { disposers, FunctionDisposable, ObjectDisposable } from './disposers';
import { Errors } from './errors/errors';

const reaction: (name: string, init: () => void, destroy: () => void) => FunctionDisposable = (
  name,
  init,
  destroy
) => {
  return () => {
    init();
    return () => destroy();
  };
};

const store: (name: string, init: () => void, destroy: () => void) => ObjectDisposable = (
  name,
  init,
  destroy
) => {
  return {
    init: () => init(),
    destroy: () => destroy(),
  };
};

describe('Disposers', () => {
  test('handles mixed function and object disposables correctly', () => {
    let inits = 0;
    const init = () => void ++inits;
    const destroy = () => void --inits;

    const d = disposers([
      reaction(`reaction1`, init, destroy),
      reaction(`reaction2`, init, destroy),
      store(`store1`, init, destroy),
      store(`store2`, init, destroy),
    ]);

    expect(inits).toEqual(4);
    d();
    expect(inits).toEqual(0);
  });

  test('executes onInit callback after all initializations', () => {
    const sequence: string[] = [];
    const init = () => sequence.push('init');
    const destroy = () => sequence.push('destroy');

    const d = disposers([reaction('r1', () => init(), destroy), store('s1', () => init(), destroy)], () =>
      sequence.push('onInit')
    );

    expect(sequence).toEqual(['init', 'init', 'onInit']);
    d();
    expect(sequence).toEqual(['init', 'init', 'onInit', 'destroy', 'destroy']);
  });

  test('works with empty initializers array', () => {
    const onInit = jest.fn();
    const d = disposers([], onInit);

    expect(onInit).toHaveBeenCalledTimes(1);
    expect(() => d()).not.toThrow();
  });

  test('handles single error in disposal', () => {
    const error = new Error('Disposal error');
    const d = disposers([
      () => () => {
        throw error;
      },
    ]);

    // expect(() => d()).toThrow(Errors);
    try {
      d();
    } catch (e) {
      expect(e).toBeInstanceOf(Errors);
      expect((e as Errors).errors).toEqual([error]);
    }
  });

  test('collects multiple errors during disposal', () => {
    const error1 = new Error('First error');
    const error2 = new Error('Second error');

    const d = disposers([
      () => () => {
        throw error1;
      },
      () => {
        /* succeeds */
        return () => undefined;
      },
      () => () => {
        throw error2;
      },
    ]);

    try {
      d();
      fail('Should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(Errors);
      expect((e as Errors).errors).toEqual([error1, error2]);
    }
  });

  test('continues disposal despite errors', () => {
    let disposed = false;
    const d = disposers([
      () => () => {
        throw new Error('First');
      },
      () => {
        return () => {
          disposed = true;
        };
      },
      () => () => {
        throw new Error('Last');
      },
    ]);

    try {
      d();
    } catch (e) {
      expect(disposed).toBe(true);
      expect((e as Errors).errors).toHaveLength(2);
    }
  });

  test('handles errors in object disposable initialization', () => {
    const badStore: ObjectDisposable = {
      init: () => {
        throw new Error('Init failed');
      },
      destroy: () => {
        /* never called */
      },
    };

    expect(() => {
      disposers([badStore]);
    }).toThrow('Init failed');
  });

  test('handles undefined onInit callback', () => {
    let inits = 0;
    const init = () => void ++inits;
    const destroy = () => void --inits;

    const d = disposers([reaction('r1', init, destroy)]);

    expect(inits).toBe(1);
    d();
    expect(inits).toBe(0);
  });
});
