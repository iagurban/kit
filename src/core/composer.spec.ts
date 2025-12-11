import { compose, composeArgv, composer, composerArgv } from './composer';

describe('compose', () => {
  it('should return true if both functions return true', () => {
    const fn1 = (v: number) => v > 0;
    const fn2 = (v: number) => v < 10;
    const composed = compose(fn1, fn2);
    expect(composed(5)).toBe(true);
  });

  it('should return false if the first function returns false', () => {
    const fn1 = (v: number) => v < 0;
    const fn2 = (v: number) => v < 10;
    const composed = compose(fn1, fn2);
    expect(composed(5)).toBe(false);
  });

  it('should return false if the second function returns false', () => {
    const fn1 = (v: number) => v > 0;
    const fn2 = (v: number) => v > 10;
    const composed = compose(fn1, fn2);
    expect(composed(5)).toBe(false);
  });

  it('should return false if both functions return false', () => {
    const fn1 = (v: number) => v < 0;
    const fn2 = (v: number) => v > 10;
    const composed = compose(fn1, fn2);
    expect(composed(5)).toBe(false);
  });
});

describe('composeArgv', () => {
  it('should return true if both functions return true', () => {
    const fn1 = (a: number, b: string) => a > 0 && b.length > 0;
    const fn2 = (a: number, b: string) => a < 10 && b !== 'hello';
    const composed = composeArgv(fn1, fn2);
    expect(composed(5, 'world')).toBe(true);
  });

  it('should return false if the first function returns false', () => {
    const fn1 = (a: number, b: string) => a < 0;
    const fn2 = (a: number, b: string) => b.length > 0;
    const composed = composeArgv(fn1, fn2);
    expect(composed(5, 'world')).toBe(false);
  });

  it('should return false if the second function returns false', () => {
    const fn1 = (a: number, b: string) => a > 0;
    const fn2 = (a: number, b: string) => b.length < 3;
    const composed = composeArgv(fn1, fn2);
    expect(composed(5, 'world')).toBe(false);
  });

  it('should return false if both functions return false', () => {
    const fn1 = (a: number, b: string) => a < 0;
    const fn2 = (a: number, b: string) => b.length < 3;
    const composed = composeArgv(fn1, fn2);
    expect(composed(5, 'world')).toBe(false);
  });
});

describe('composer', () => {
  it('should run the initial function', () => {
    const initial = jest.fn().mockReturnValue(true);
    const comp = composer(initial);
    comp.run(10);
    expect(initial).toHaveBeenCalledWith(10);
  });

  it('should push a new function and compose', () => {
    const initial = (v: number) => v > 0;
    const next = (v: number) => v < 10;
    const comp = composer(initial);
    comp.push(next);
    expect(comp.run(5)).toBe(true);
    expect(comp.run(15)).toBe(false);
  });

  it('should ensure initial is executed first', () => {
    const executionOrder: string[] = [];
    const initial = (v: number) => {
      executionOrder.push('initial');
      return v > 0;
    };
    const next = (v: number) => {
      executionOrder.push('next');
      return v < 10;
    };
    const comp = composer(initial);
    comp.push(next);
    comp.run(5);
    expect(executionOrder).toEqual(['initial', 'next']);
  });

  it('should not execute subsequent functions if a prior one returns false', () => {
    const initial = jest.fn().mockReturnValue(false);
    const next = jest.fn().mockReturnValue(true);
    const comp = composer(initial);
    comp.push(next);
    comp.run(5);
    expect(initial).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle multiple pushes correctly', () => {
    const comp = composer((v: number) => v > 0);
    comp.push((v: number) => v < 10);
    comp.push((v: number) => v % 2 === 1);
    expect(comp.run(5)).toBe(true);
    expect(comp.run(6)).toBe(false); // Fails third function
    expect(comp.run(11)).toBe(false); // Fails second function
    expect(comp.run(-1)).toBe(false); // Fails first function
  });
});

describe('composerArgv', () => {
  it('should run the initial function with multiple arguments', () => {
    const initial = jest.fn().mockReturnValue(true);
    const comp = composerArgv(initial);
    comp.run(10, 'hello', true);
    expect(initial).toHaveBeenCalledWith(10, 'hello', true);
  });

  it('should push a new function and compose', () => {
    const initial = (a: number, b: string) => a > 0;
    const next = (a: number, b: string) => b.length > 3;
    const comp = composerArgv(initial);
    comp.push(next);
    expect(comp.run(5, 'test')).toBe(true);
    expect(comp.run(5, 'ts')).toBe(false);
  });

  it('should ensure initial is executed first', () => {
    const executionOrder: string[] = [];
    const initial = (a: number, b: string) => {
      executionOrder.push('initial');
      return a > 0;
    };
    const next = (a: number, b: string) => {
      executionOrder.push('next');
      return b.length > 3;
    };
    const comp = composerArgv(initial);
    comp.push(next);
    comp.run(5, 'test');
    expect(executionOrder).toEqual(['initial', 'next']);
  });

  it('should not execute subsequent functions if a prior one returns false', () => {
    const initial = jest.fn().mockReturnValue(false);
    const next = jest.fn().mockReturnValue(true);
    const comp = composerArgv(initial);
    comp.push(next);
    comp.run(5, 'test');
    expect(initial).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle multiple pushes correctly', () => {
    const comp = composerArgv((a: number, b: string) => a > 0);
    comp.push((a: number, b: string) => b.length > 3);
    comp.push((a: number, b: string) => a % 2 === 1);
    expect(comp.run(5, 'test')).toBe(true);
    expect(comp.run(6, 'test')).toBe(false); // Fails third function
    expect(comp.run(5, 'ts')).toBe(false); // Fails second function
    expect(comp.run(-1, 'test')).toBe(false); // Fails first function
  });
});
