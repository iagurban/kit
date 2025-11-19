import { observable, reaction } from 'mobx';

import { ObservableExMap } from './observable-ex-map';

describe('ObservableExMap', () => {
  test('should initialize with provided key-value pairs', () => {
    const pairs = [
      ['key1', 'value1'],
      ['key2', 'value2'],
    ] as [string, string][];
    const map = new ObservableExMap<string, string>(pairs);

    expect(map.get('key1')).toBe('value1');
    expect(map.get('key2')).toBe('value2');
    expect(map.size).toBe(2);
  });

  test('should observe additions to the map', () => {
    const map = new ObservableExMap<string, string>();
    const changes: string[] = [];

    reaction(
      () => map.size,
      size => changes.push(`Map size changed to ${size}`)
    );

    map.set('key1', 'value1');

    expect(changes).toEqual(['Map size changed to 1']);
    expect(map.get('key1')).toBe('value1');
  });

  test('should observe deletions from the map', () => {
    const map = new ObservableExMap<string, string>([['key1', 'value1']]);
    const changes: string[] = [];

    reaction(
      () => map.size,
      size => changes.push(`Map size changed to ${size}`)
    );

    map.delete('key1');

    expect(changes).toEqual(['Map size changed to 0']);
    expect(map.has('key1')).toBe(false);
  });

  test('should observe updates to the map', () => {
    const map = new ObservableExMap<string, string>([['key1', 'value1']]);
    const observedValue = observable.box<string | undefined>();

    reaction(
      () => map.get('key1'),
      value => observedValue.set(value)
    );

    map.set('key1', 'value2');

    expect(observedValue.get()).toBe('value2');
  });

  test('should allow observing indirectly via forEach', () => {
    const map = new ObservableExMap<string, number>([
      ['key1', 1],
      ['key2', 2],
    ]);
    const observedValues: string[] = [];

    reaction(
      () => map.toArray((value, key) => `${key}: ${value}`),
      values => {
        observedValues.push(...values);
      }
    );

    map.set('key3', 3);

    expect(observedValues).toEqual(['key1: 1', 'key2: 2', 'key3: 3']);
  });
});
