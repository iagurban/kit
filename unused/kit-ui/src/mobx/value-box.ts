import { action, makeObservable, observable } from 'mobx';

export type ValueBox<T> = { value: T; set(value: T): void };

export function valueBox<T>(value: T, type?: typeof observable.shallow): ValueBox<T>;
export function valueBox<T>(): ValueBox<T | undefined>;

export function valueBox<T>(value?: T, type: typeof observable.shallow = observable) {
  return makeObservable<ValueBox<T | undefined>>(
    {
      value,
      set(value) {
        this.value = value;
      },
    },
    { value: type, set: action.bound }
  );
}
