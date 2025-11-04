import { makeObservable, observable } from 'mobx';

import { ExMap } from '../../collections/ex-map';

export class ObservableExMap<Key, Value> extends ExMap<Key, Value> {
  constructor(pairs?: Iterable<[Key, Value]>) {
    super(pairs);
    makeObservable<this, '_m'>(this, { _m: observable });
  }
}
