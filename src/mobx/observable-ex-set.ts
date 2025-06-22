import { makeObservable, observable } from 'mobx';

import { ExSet } from '../../../kit/src/collections/ex-set';

export class ObservableExSet<Value> extends ExSet<Value> {
  constructor(pairs?: Iterable<Value>) {
    super(pairs);
    makeObservable<this, '_m'>(this, { _m: observable });
  }
}
