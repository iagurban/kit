import { action, makeObservable, observable } from 'mobx';

import { ExMap } from '../core';

/**
 * The `ObservableExMap` class extends the functionality of the `ExMap` class
 * by incorporating MobX observability. This makes it possible to use reactive
 * programming techniques with the map structure, allowing the state to be
 * observed and its changes to trigger reactions.
 *
 * @template Key - The type of keys maintained by this map.
 * @template Value - The type of mapped values.
 *
 * @extends {ExMap<Key, Value>}
 *
 * @remarks
 * This class makes its internal map observable using MobX's `makeObservable`.
 * This allows consumers to listen for changes (addition, removal, updates)
 * in the map and react to those changes automatically.
 *
 * @param {Iterable<[Key, Value]>} [pairs] - An optional set of key-value pairs
 * to initialize the map.
 */
export class ObservableExMap<Key, Value> extends ExMap<Key, Value> {
  constructor(pairs?: Iterable<[Key, Value]>) {
    super(pairs);
    makeObservable<this, '_m'>(this, { _m: observable, set: action, delete: action, clear: action });
  }
}
