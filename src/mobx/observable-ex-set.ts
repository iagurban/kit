import { action, makeObservable, observable } from 'mobx';

import { ExSet } from '../core';

/**
 * A specialized Set-like collection class that extends `ExSet` and integrates observability
 * using a reactive programming model. This class is designed to track and react to changes
 * in the collection, enabling it to be used in environments where state reactivity is required.
 *
 * @template Value The type of elements stored in the set.
 * @extends ExSet<Value>
 */
export class ObservableExSet<Value> extends ExSet<Value> {
  constructor(pairs?: Iterable<Value>) {
    super(pairs);
    makeObservable<this, '_s'>(this, { _s: observable, add: action, delete: action, clear: action });
  }
}
