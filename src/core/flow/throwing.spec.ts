import { throwing } from './throwing';

describe('throwing', () => {
  it('should throw the error returned by the function', () => {
    const error = new Error('test error');
    expect(() => throwing(() => error)).toThrow(error);
  });

  it('should throw with correct type annotation', () => {
    const throwingFn = (): number => throwing(() => new Error('test'));
    expect(() => throwingFn()).toThrow('test');
  });
});
