import { autorun, observable } from 'mobx';

import { ObservableExSet } from './observable-ex-set';

describe('ObservableExSet', () => {
  it('should initialize with elements from the provided iterable', () => {
    const set = new ObservableExSet([1, 2, 3]);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    expect(set.has(3)).toBe(true);
    expect(set.size).toBe(3);
  });

  it('should reflect changes when elements are added', () => {
    const set = new ObservableExSet<number>();
    set.add(1);
    expect(set.has(1)).toBe(true);
    expect(set.size).toBe(1);
  });

  it('should reflect changes when elements are removed', () => {
    const set = new ObservableExSet([1, 2, 3]);
    set.delete(2);
    expect(set.has(2)).toBe(false);
    expect(set.size).toBe(2);
  });

  it('should react to changes when observed with MobX', () => {
    const set = new ObservableExSet<number>();
    const mockFn = jest.fn();

    autorun(() => {
      mockFn(set.size);
    });

    set.add(1);
    set.add(2);
    set.delete(1);

    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(mockFn.mock.calls[0][0]).toBe(0); // Initial state
    expect(mockFn.mock.calls[1][0]).toBe(1); // After adding 1
    expect(mockFn.mock.calls[2][0]).toBe(2); // After adding 2
    expect(mockFn.mock.calls[3][0]).toBe(1); // After deleting 1
  });

  it('should work with observable properties', () => {
    const obj = observable({ value: 1 });
    const set = new ObservableExSet<typeof obj>();

    set.add(obj);
    expect(set.has(obj)).toBe(true);

    obj.value = 2; // Updating observable property
    expect(set.has(obj)).toBe(true);
  });

  it('should behave the same as a regular Set for iteration', () => {
    const set = new ObservableExSet([1, 2, 3]);
    const values = Array.from(set);
    expect(values).toEqual([1, 2, 3]);
  });
});
