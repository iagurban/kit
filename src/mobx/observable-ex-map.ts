import { ExMap } from '@gurban/kit/collections/ex-map';
import { makeObservable, observable } from 'mobx';

export class ObservableExMap<Key, Value> extends ExMap<Key, Value> {
  constructor(pairs?: Iterable<[Key, Value]>) {
    super(pairs);
    makeObservable<this, '_m'>(this, { _m: observable });
  }
}
