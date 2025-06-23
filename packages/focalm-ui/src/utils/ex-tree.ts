import { ExMap } from '@gurban/kit/index';
import { computed, makeObservable } from 'mobx';

export class ExTree<Item, ID> {
  constructor(
    readonly items: readonly Item[],
    readonly id: (i: Item) => ID,
    readonly parent: (i: Item) => ID | null
  ) {
    makeObservable(this);
  }

  @computed
  private get byParentID() {
    return ExMap.groupedBy(this.items, this.parent);
  }

  childrenOf(id: ID | null) {
    return this.byParentID.get(id) || [];
  }

  @computed
  get roots() {
    return this.byParentID.get(null);
  }

  @computed
  get parentsKeys() {
    return this.byParentID.keys();
  }
}
