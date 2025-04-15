import { autorun, observable } from 'mobx';

import { syncArray } from '../utils/array-utils';
import { Nullish } from '../utils/types';

export const mappedObservable = <Derived, Input, ID>(
  watch: () => readonly Input[],
  getInputId: (v: Input) => ID,
  create: (v: Input) => Derived,
  update: (o: Derived, v: Input) => void,
  deleted: ((v: Derived) => void) | Nullish,
  getId: (v: Derived) => ID
) => {
  const array = observable.array<Derived>();

  let destructor: (() => void) | undefined;

  const sync = (input: readonly Input[]) =>
    syncArray(input, getInputId, array, create, update, deleted, getId);

  return {
    array: array as readonly Derived[],
    init() {
      destructor ||= autorun(() => sync(watch()));
    },
    destroy() {
      if (destructor) {
        destructor();
        destructor = undefined;
      }
      sync([]);
    },
  } as const;
};

export class MappedArray<Derived, Input, ID> {
  constructor(
    readonly input: Readonly<{ watch: () => readonly Input[]; id: (v: Input) => ID }>,
    readonly actions: Readonly<{
      create: (v: Input) => Derived;
      update: (o: Derived, v: Input) => void;
      deleted?: ((v: Derived) => void) | Nullish;
      id: (v: Derived) => ID;
    }>
  ) {}
  readonly array = observable.array<Derived>();

  private destructor: (() => void) | undefined;

  sync = (input: readonly Input[]) =>
    syncArray(
      input,
      this.input.id,
      this.array,
      this.actions.create,
      this.actions.update,
      this.actions.deleted,
      this.actions.id
    );

  init = () => {
    this.destructor ||= autorun(() => this.sync(this.input.watch()));
  };

  destroy = () => {
    if (this.destructor) {
      this.destructor();
      this.destructor = undefined;
    }
    this.sync([]);
  };
}
