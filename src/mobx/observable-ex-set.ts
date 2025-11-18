import { makeObservable, observable } from 'mobx';

import { ExSet } from '../core/collections/ex-set';

export class ObservableExSet<Value> extends ExSet<Value> {
  constructor(pairs?: Iterable<Value>) {
    super(pairs);
    makeObservable<this, '_s'>(this, { _s: observable });
  }
}
