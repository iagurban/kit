import { ExSet } from '@gurban/kit/collections/ex-set.ts';
import { makeObservable, observable } from 'mobx';

export class ObservableExSet<Value> extends ExSet<Value> {
  constructor(pairs?: Iterable<Value>) {
    super(pairs);
    makeObservable<this, '_m'>(this, { _m: observable });
  }
}
