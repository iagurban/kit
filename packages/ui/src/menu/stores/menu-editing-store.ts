import { createUsableContext, ExMap, isDefined, notNull, Nullish, uidGenerator } from '@freyja/kit';
import { Client, createRequest } from '@urql/core';
import { sortBy } from 'lodash';
import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
  ObservableSet,
  runInAction,
} from 'mobx';
import { computedFn } from 'mobx-utils';

import { ExTree } from '../../ex-tree';
import {
  GetMenuDocument,
  GetMenuQuery,
  GetMenuQueryVariables,
  SaveMenuDocument,
  SaveMenuMutation,
  SaveMenuMutationVariables,
} from '../../graphql.generated/menu';
import { manualSort } from '../../manual-sort';
import { assertLength } from '../../util';
import { MemoizedRequestState } from './memoized-request-state';

export type InputMenuItem = Exclude<Exclude<GetMenuQuery[`menu`], Nullish>[`items`], Nullish>[number];

class MenuItemEditing {
  constructor(
    readonly parent: { menu: MenuData },
    readonly original: InputMenuItem | null,
    readonly getOrderKey?: () => string
  ) {
    makeObservable(this);
  }

  @observable
  readonly changes: Omit<InputMenuItem, `id` | `orderKey`> & Partial<Pick<InputMenuItem, `orderKey`>> = {};

  @action
  update(changes: Partial<Omit<InputMenuItem, `id`>>) {
    Object.assign(this.changes, changes);
    return this;
  }

  @observable
  fileToUpload: { id: string; file: File } | null = null;

  @action
  setFileToUpload(file: File | null) {
    this.fileToUpload = file ? { id: `__temp:${uidGenerator()}`, file } : null;
  }

  @action
  save() {
    if (this.original) {
      this.parent.menu.updateItem(this.original.id, this.changes);
    } else {
      this.parent.menu.createItem({
        ...this.changes,
        orderKey: notNull(this.changes.orderKey ?? this.getOrderKey?.()),
      });
    }
    if (this.fileToUpload) {
      /// TODO check if it's used in result item
      this.parent.menu.filesToUpload.set(this.fileToUpload.id, this.fileToUpload);
    }
  }
}

export class UITreeState {
  constructor(readonly parent: MenuEditingStore) {
    makeObservable(this);
  }

  @observable
  draggingId: string | null = null;

  @action
  setDraggingId(id: string | null) {
    this.draggingId = id;
  }

  @observable dropPoint: DropPoint | null = null;

  @action
  setDropPoint(point: DropPoint | null) {
    console.log(`point`, point);
    this.dropPoint = point;
  }

  private readonly expandedIds = new ObservableSet<string>();

  isExpanded(id: string) {
    return this.expandedIds.has(id);
  }

  @action
  setExpanded(id: string, opened: boolean) {
    if (opened) {
      this.expandedIds.add(id);
    } else {
      this.expandedIds.delete(id);
    }
  }

  @action
  resetExpanded(ids: Set<string>) {
    this.expandedIds.clear();
    for (const id of ids) {
      this.expandedIds.add(id);
    }
  }

  @observable.ref
  editing: MenuItemEditing | null = null;

  @action
  setEditing(item: InputMenuItem | null) {
    this.editing = item ? new MenuItemEditing(this.parent, item) : null;
  }

  @action
  setEditingNew(
    changes: Omit<InputMenuItem, `id` | `orderKey`> & Partial<Pick<InputMenuItem, `orderKey`>>,
    getOrderKey: () => string
  ) {
    this.editing = new MenuItemEditing(this.parent, null, getOrderKey).update(changes);
  }

  @action
  setEditingNewFirstInParent(parentId: InputMenuItem[`id`]) {
    this.setEditingNew({ title: ``, description: ``, parentId }, () => {
      const children = sortBy(this.parent.menu?.actualUnsortedChildrenOf(parentId) || [], i => i.orderKey);
      const childrenByOrderKey = ExMap.mappedBy(children, i => i.orderKey);
      const keys = children.map(i => i.orderKey);

      if (!keys.length) {
        return manualSort.getFirstKey();
      }

      const { newKeys, updated } = manualSort.insertBefore(keys, keys[0], 1);
      for (const [from, to] of updated.entries()) {
        this.parent.menu.updateItem(notNull(childrenByOrderKey.get(from)).id, { orderKey: to });
      }

      return assertLength(newKeys, 1)[0];
    });
  }

  @action
  setEditingNewInParentAfterKey(parentId: Exclude<InputMenuItem[`parentId`], undefined>, key: string) {
    this.setEditingNew({ title: ``, description: ``, parentId: parentId }, () => {
      const children = sortBy(this.parent.menu?.actualUnsortedChildrenOf(parentId) || [], i => i.orderKey);
      const childrenByOrderKey = ExMap.mappedBy(children, i => i.orderKey);
      const keys = children.map(i => i.orderKey);

      const { newKeys, updated } = manualSort.insertAfter(keys, key, 1);
      for (const [from, to] of updated.entries()) {
        this.parent.menu.updateItem(notNull(childrenByOrderKey.get(from)).id, { orderKey: to });
      }

      return assertLength(newKeys, 1)[0];
    });
  }
}

class ItemsExTree extends ExTree<InputMenuItem, InputMenuItem[`id`]> {
  constructor(
    readonly editingStore: MenuEditingStore,
    items: InputMenuItem[]
  ) {
    super(
      items,
      i => i.id,
      i => i.parentId || null
    );
  }

  readonly byParentIDSorted = computedFn(function (this: ItemsExTree, id: InputMenuItem[`id`] | null) {
    return sortBy(this.childrenOf(id) ?? [], i => i.orderKey);
  });
}

export type DropPoint = { levelDelta: number; inside: string | null; after: string | null };

class MenuData {
  constructor(readonly parent: MenuEditingStore) {
    makeObservable(this);
  }

  @observable requestedID?: string | null = null;

  @action
  setRequestedID(id: string | null) {
    if (this.requestedID === id && this.menuRequest.loading) {
      return;
    }
    this.requestedID = id;
  }

  readonly menuRequest = new MemoizedRequestState<GetMenuQuery, GetMenuQueryVariables>(
    { autorun: true, cancellable: true },
    () => createRequest(GetMenuDocument, this.requestedID ? { where: { id: this.requestedID } } : {}),
    r => {
      runInAction(() => (this.parent.treeState = new UITreeState(this.parent)));

      const controller = new AbortController();
      return {
        promise: this.parent.client
          .executeQuery<GetMenuQuery, GetMenuQueryVariables>(r, {
            fetchOptions: { signal: controller.signal },
          })
          .toPromise(),
        cancel: () => controller.abort(),
      };
    }
  );

  readonly saveRequest = new MemoizedRequestState<SaveMenuMutation, SaveMenuMutationVariables>(
    {
      autorun: false,
      cancellable: false,
    },
    () =>
      createRequest<SaveMenuMutation, SaveMenuMutationVariables>(SaveMenuDocument, {
        menu: {
          id: notNull(this.parent.selectedMenuID),
          fields: {},
          creates: [...this.create.entries()].map(([id, { __typename, ...o }]) => ({
            id,
            orderKey: o.orderKey,
            title: o.title,
            description: o.description,
            parentId: o.parentId,
          })),
          updates: [...this.update.entries()].map(
            ([id, { __typename, ...o }]) =>
              ({
                id,
                orderKey: o.orderKey,
                title: o.title !== undefined ? { value: o.title } : undefined,
                description: o.description !== undefined ? { value: o.description } : undefined,
                parentId: o.parentId !== undefined ? { value: o.parentId } : undefined,
              }) as const
          ),
        },
      }),
    r => this.parent.client.executeMutation(r, {}).toPromise()
  );

  init() {
    // this.setRequestedID(null);
    this.menuRequest.init();
    this.saveRequest.init();
  }

  readonly destroy = () => {
    this.saveRequest.destroy();
    this.menuRequest.destroy();
  };

  create = new ObservableMap<InputMenuItem[`id`], Omit<InputMenuItem, `id`>>();
  update = new ObservableMap<InputMenuItem[`id`], Partial<Omit<InputMenuItem, `id`>>>();
  filesToUpload = new ObservableMap<string, { id: string; file: File }>();

  @computed
  get changesCount() {
    return this.create.size + this.update.size;
  }

  @action
  createItem(item: Omit<InputMenuItem, `id`>) {
    let id = uidGenerator();
    while (this.create.has(id)) {
      id = uidGenerator();
    }
    this.create.set(id, item);
    return id;
  }

  @action
  updateItem(id: InputMenuItem[`id`], changes: Partial<Omit<InputMenuItem, `id`>>) {
    const old = this.update.get(id);
    this.update.set(id, old ? { ...old, ...changes } : changes);
  }

  @computed
  /*private*/
  get currentOriginal() {
    return sortBy(
      [this.menuRequest.result, this.saveRequest.result].filter(isDefined),
      i => i.completedAt
    ).at(-1);
  }

  @computed
  private get actual() {
    const o = ExMap.mappedBy(this.currentOriginal?.data?.menu?.items || [], i => i.id);
    for (const [id, changes] of this.create) {
      o.set(id, { ...changes, id });
    }
    return o.mapEntries((i, id) => {
      const u = this.update.get(id);
      return u ? { ...i, ...u } : i;
    });
  }

  actualItem(id: InputMenuItem[`id`]) {
    return notNull(this.maybeActualItem(id), () => `Item with id ${id} not found`);
  }

  maybeActualItem(id: InputMenuItem[`id`]) {
    return this.actual.get(id);
  }

  @computed
  get actualTree() {
    return this.actual ? new ItemsExTree(this.parent, [...this.actual.values()]) : undefined;
  }

  actualSortedChildrenOf(id: InputMenuItem[`id`] | null) {
    return this.actualTree?.byParentIDSorted(id);
  }

  actualUnsortedChildrenOf(id: InputMenuItem[`id`] | null) {
    return this.actualTree?.childrenOf(id);
  }

  @action
  save() {
    if (!this.saveRequest.loading) {
      this.saveRequest.run().then(r => {
        runInAction(() => {
          this.create.clear();
          this.update.clear();
        });
      });
    }
  }

  @computed
  get saving() {
    return this.saveRequest.loading;
  }

  @computed
  get origImagesById() {
    return ExMap.mappedBy(this.currentOriginal?.data?.menu?.images || [], i => i.id);
  }

  origImageById(id: string) {
    return notNull(this.origImagesById.get(id), () => `Image with id ${id} not found`);
  }

  findParentOfActualItem(item: InputMenuItem, pred: (i: InputMenuItem) => boolean): InputMenuItem | null {
    let node: InputMenuItem | undefined =
      item.parentId != null ? notNull(this.actual.get(item.parentId)) : undefined;
    while (node) {
      if (pred(node)) {
        return node;
      }
      node = node.parentId != null ? notNull(this.actual.get(node.parentId)) : undefined;
    }
    return null;
  }
}

export class MenuEditingStore {
  constructor(readonly client: Client) {
    makeObservable(this);
  }

  readonly menu = new MenuData(this);

  @observable treeState = new UITreeState(this);

  init() {
    this.menu.init();
  }

  readonly destroy = () => {
    this.menu.destroy();
  };

  @observable chosenMenuID: string | null = null;

  @computed
  get selectedMenuID(): string | undefined {
    return this.chosenMenuID || this.menu?.currentOriginal?.data?.menu?.id;
  }

  @action
  setSelectedMenuID(id: string | null) {
    this.chosenMenuID = id;
    this.menu.setRequestedID(id);
  }
}

export const { provider: MenuEditingContextProvider, use: useEditingTreeContext } =
  createUsableContext<MenuEditingStore>(`MenuEditingContext`);
