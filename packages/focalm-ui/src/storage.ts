import { ExMap, ExSet, notNull, Nullish, sleep, uidGenerator } from '@freyja/kit/src';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import dayjs from 'dayjs';
import { sortBy } from 'lodash';
import { computed, reaction } from 'mobx';
import { createContext, customRef, idProp, Model, model, modelAction, prop } from 'mobx-keystone';
import { computedFn } from 'mobx-utils';
import {
  AnyVariables,
  Client,
  DocumentInput,
  OperationContext,
  OperationResult,
  OperationResultSource,
} from 'urql';

import { TaskHistoryKey, TaskState } from './graphql.generated/_types';
import {
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  UpdateTasksDocument,
  UpdateTasksMutation,
  UpdateTasksMutationVariables,
} from './graphql.generated/tasks';
import { getUrqlClient, urqlClientCtx } from './utils/mobx-util';
import { ImperativeRequester, PromiseWithCancel } from './utils/requester';

type NonNullish<T> = Exclude<T, Nullish>;

type Task = Omit<GetTasksQuery[`tasks`][`tasks`][number], `__typename`>;

type UserBrief = GetTasksQuery[`tasks`][`relatedUsers`][number];

export type TaskUpdate = { taskId: string; field: Exclude<keyof Task, `id`>; value: unknown };

type TaskChangeGroup = { createdAt: string; localCreatedAt: string; values: TaskUpdate[] };

const prepareOperationResultSource = <Data, Variables extends AnyVariables>(
  source: OperationResultSource<OperationResult<Data, Variables>>
) =>
  source.toPromise().then(result => {
    if (result.error) {
      throw result.error;
    }
    if (!result.data) {
      throw new Error(`no data`);
    }
    return result.data;
  });

const executeMutation = <Data, Variables extends AnyVariables>(
  client: Client,
  query: DocumentInput<Data, Variables>,
  variables: Variables,
  context?: Partial<OperationContext>
): PromiseWithCancel<Data> => ({
  promise: prepareOperationResultSource(client.mutation<Data, Variables>(query, variables, context)),
  cancel: () => {
    throw new Error(`can not cancel mutation`);
  },
});

const executeQuery = <Data, Variables extends AnyVariables>(
  client: Client,
  query: DocumentInput<Data, Variables>,
  variables: Variables,
  context?: Partial<OperationContext>
): PromiseWithCancel<Data> & {
  update<T>(fn: (p: Promise<Data>) => Promise<T>): { promise: Promise<T>; cancel: (() => void) | undefined };
} => {
  const ac = new AbortController();
  return {
    promise: prepareOperationResultSource(
      client.query<Data, Variables>(query, variables, {
        ...context,
        fetchOptions: { ...context?.fetchOptions, signal: ac.signal },
      })
    ).catch(async e => {
      await sleep(1000);
      throw e;
    }),
    cancel: () => {
      ac.abort(`canceled by user`);
    },
    update<T>(fn: (p: Promise<Data>) => Promise<T>) {
      return {
        promise: fn(this.promise),
        cancel: this.cancel,
      };
    },
  };
};

export const disposable = (f: () => () => void): { init(): void; destroy(): void } => ({
  init() {
    this.destroy = f();
  },
  destroy: () => {
    throw new Error(`init didn't called`);
  },
});

// when uploading change of the task, it's createdAt must be clamped to [maxUpdatedAt, server.now()] (lower bound on the front, upper - on the server)
// when adding changes to history, need to apply values which's createdAt greater than the last existing change of the same key in history

const tasksStoreCtx = createContext<Synchronizer>();

@model(`focalm/TaskCardStore`)
export class TaskCardStore extends Model({
  id: idProp,
  originalRef: prop<ReturnType<typeof Synchronizer.actualTaskRef>>(),
  editMode: prop<`single` | `multiple`>(`single`),
  editValues: prop<
    Partial<Exclude<ReturnType<ReturnType<typeof Synchronizer.actualTaskRef>[`resolve`]>, Nullish>>
  >(() => ({})),
}) {
  @computed
  get actual() {
    let draft = { ...this.originalRef.maybeCurrent };
    for (const [key, value] of Object.entries(this.editValues)) {
      draft = { ...draft, [key]: value };
    }
    return draft;
  }

  @modelAction
  setStringValue(key: `title` | `startAfterDate`, value: string) {
    this.editValues[key] = value;
  }

  @modelAction
  setStringOrNullValue(key: `startAfterDate` | `plannedStartDate` | `dueToDate`, value: string | null) {
    this.editValues[key] = value;
  }

  @modelAction
  setNumberValue(key: `ease` | `impact` | `startAfterOffset`, value: number) {
    this.editValues[key] = value;
  }

  @modelAction
  setNumberOrNullValue(key: `startAfterOffset` | `plannedStartOffset` | `dueToOffset`, value: number | null) {
    this.editValues[key] = value;
  }

  @computed
  get changesKeys(): (keyof typeof this.editValues)[] {
    return Object.keys(this.editValues) as (keyof typeof this.editValues)[];
  }

  @computed
  get hasChanges() {
    return this.changesKeys.length > 0;
  }

  @modelAction
  reset() {
    this.editValues = {};
  }

  @modelAction
  resetChange(key: keyof typeof this.editValues) {
    delete this.editValues[key];
  }

  @modelAction
  submit() {
    const original = this.originalRef.maybeCurrent;
    const changes: TaskUpdate[] = [];
    for (const [key, value] of Object.entries(this.editValues) as [keyof typeof this.editValues, unknown][]) {
      switch (key) {
        case 'startAfterDate':
        case 'startAfterOffset':
        case 'plannedStartDate':
        case 'plannedStartOffset':
        case 'dueToDate':
        case 'dueToOffset':
        case 'ease':
        case 'impact':
        case `title`: {
          if (original?.title !== value) {
            changes.push({
              taskId: original ? original.id : `!!NEW:${uidGenerator()}`,
              field: key,
              value,
            });
          }
          break;
        }
        default:
          throw new Error(`unexpected key ${key}`);
      }
    }
    notNull(tasksStoreCtx.get(this)).pushUpdates(changes);
    this.reset();
  }

  @modelAction
  close() {
    const opened = notNull(tasksStoreCtx.get(this)).opened;
    const idx = opened.findIndex(card => card.id === this.id);
    if (idx >= 0) {
      opened.splice(idx, 1);
    }
  }
}

@model(`focalm/Synchronizer`)
export class Synchronizer extends Model({
  stored: prop<Record<string, Task>>(() => ({})),
  saving: prop<TaskChangeGroup[]>(() => []),
  pending: prop<TaskChangeGroup[]>(() => []),
  opened: prop<TaskCardStore[]>(() => []),
  users: prop<Record<string, UserBrief>>(() => ({})),
}) {
  private readonly _dummy = ((() => tasksStoreCtx.set(this, this))(), 0);

  static readonly actualTaskRef = customRef<Exclude<ReturnType<Synchronizer[`actualTasks`][`get`]>, Nullish>>(
    `focalm/ActualTaskRef`,
    {
      getId: o => (o as Record<string, string>).id || undefined,
      resolve: ref => tasksStoreCtx.get(ref)?.actualTasks.get(ref.id),
    }
  );

  readonly loadRequest = new ImperativeRequester<{
    tasks: GetTasksQuery[`tasks`];
    changedIds: ExMap<string, string> | undefined;
  }>(() =>
    executeQuery<GetTasksQuery, GetTasksQueryVariables>(getUrqlClient(this), GetTasksDocument, {
      updatedAfter: this.maxUpdatedAt?.toISOString(),
    }).update(p => p.then(result => ({ ...result, changedIds: undefined })))
  );
  readonly saveRequest = new ImperativeRequester<UpdateTasksMutation>(() =>
    executeMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(
      getUrqlClient(this),
      UpdateTasksDocument,
      {
        changes: this.saving.map(group => ({
          createdAt: group.createdAt,
          localCreatedAt: group.localCreatedAt,
          updates: group.values.map(v => ({
            taskId: v.taskId,
            field: v.field as TaskHistoryKey,
            stringValue: JSON.stringify(v.value),
          })),
        })),
        updatedAfter: this.maxUpdatedAt,
      },
      {}
    )
  );

  @computed
  get maxUpdatedAt() {
    const l = [
      ...Object.values(this.stored).map(t => t.updatedAt),
      ...this.pending.map(g => g.createdAt),
      ...this.saving.map(g => g.createdAt),
    ];
    return l.length ? new Date(Math.max(...l.map(t => new Date(t).getTime()))) : undefined;
  }

  readonly pendingForTaskId = computedFn(function (this: Synchronizer, id: string) {
    return this.pending.flatMap(group =>
      group.values.filter(v => v.taskId === id).map(v => ({ ...v, createdAt: group.createdAt }))
    );
  });

  readonly sortedTaskChanges = computedFn(function (this: Synchronizer, id: string) {
    const pft = this.pendingForTaskId(id);
    return sortBy(
      [
        ...this.saving.flatMap(group => group.values.map(v => ({ ...v, createdAt: group.createdAt }))),
        ...pft,
      ],
      value => new Date(value.createdAt).getTime()
    );
  });

  readonly taskUpdates = computedFn(function (this: Synchronizer, id: string) {
    const values = this.sortedTaskChanges(id);
    let u: Partial<Task> | undefined = undefined;
    for (const { value, field } of values) {
      (u ||= {})[field] = value;
    }

    return u;
  });

  @computed
  get newTasksIds() {
    return new ExSet([...this.savingTaskIds, ...this.pendingTaskIds]).subtract(Object.keys(this.stored));
  }

  @computed
  get pendingTaskIds() {
    return this.pending.flatMap(group => group.values.map(v => v.taskId));
  }

  @computed
  get savingTaskIds() {
    return this.saving.flatMap(group => group.values.map(v => v.taskId));
  }

  @computed
  get actualTasks() {
    const result = new ExMap<
      string,
      Omit<Task, `createdAt` | `updatedAt` | `authorId`> & { authorId?: string }
    >();
    for (const id of new Set([...this.savingTaskIds, ...this.pendingTaskIds, ...Object.keys(this.stored)])) {
      const stored = this.stored[id];
      if (stored) {
        const update = this.taskUpdates(id);
        result.set(id, update ? { ...stored, ...update } : stored);
      } else {
        const update = notNull(this.taskUpdates(id));
        result.set(id, {
          id,
          ...update,
          title: update.title ?? ``,
          archived: update.archived ?? false,
          state: update.state ?? TaskState.Pending,
          ease: update.ease ?? 5,
          impact: update.impact ?? 5,
          orderKey: update.orderKey ?? ``,
        });
      }
    }

    return result;
  }

  @modelAction
  private onGotTasks({ tasks, relatedUsers }: { tasks: Task[]; relatedUsers: UserBrief[] }) {
    for (const task of tasks) {
      const obj = this.stored[task.id];
      if (obj) {
        Object.assign(obj, task);
      } else {
        this.stored[task.id] = task;
      }
    }

    for (const user of relatedUsers) {
      const obj = this.users[user.id];
      if (obj) {
        Object.assign(obj, user);
      } else {
        this.users[user.id] = user;
      }
    }
  }

  protected override onAttachedToRootStore() {
    const s = [
      this.saveRequest,
      this.loadRequest,
      disposable(() =>
        reaction(
          () => this.loadRequest.result,
          result => {
            if (result?.tasks) {
              this.onGotTasks(result.tasks);
            }
            /// TODO remove disappeared
          }
        )
      ),
      disposable(() =>
        reaction(
          () => this.saveRequest.result,
          result => {
            if (result?.result.tasks) {
              this.onGotTasks(result.result.tasks);
            }
            /// TODO remove disappeared
          }
        )
      ),
      disposable(() =>
        reaction(
          () => [...this.pending, ...this.saving, this.saveRequest.loading, this.loadRequest.loading],
          () => {
            if (!this.saveRequest.loading && !this.loadRequest.loading) {
              void this.save();
            }
          }
        )
      ),
    ] as const;
    s.forEach(f => f.init());

    void this.loadRequest.execute();

    return () => {
      s.forEach(f => f.destroy());
    };
  }

  @modelAction
  pushUpdates(updates: TaskUpdate[]) {
    this.pending.push({
      values: updates,
      createdAt: dayjs.max(dayjs(), dayjs(this.maxUpdatedAt).add(1, `ms`)).toISOString(),
      localCreatedAt: new Date().toISOString(),
    });
  }

  @modelAction
  private prepareSave() {
    const { pending } = this;
    this.pending = [];
    this.saving.push(...pending);
  }

  @modelAction
  private postSave(success: boolean) {
    const { saving } = this;
    this.saving = [];
    if (!success) {
      this.pending.splice(0, 0, ...saving);
    }
  }

  @modelAction
  async save(noRetry = false) {
    if (this.saveRequest.loading) {
      if (!noRetry) {
        await this.saveRequest.wait;
        await this.save(true);
      }
      return;
    }

    if (!this.pending.length) {
      return;
    }

    this.prepareSave();

    try {
      const result = await this.saveRequest.execute().wait;
      console.log(result);
      /// TODO rewrite result.data.updateTasks.changedIds in pending;
    } catch (e) {
      this.postSave(false);
      throw e;
    }
    this.postSave(true);
  }

  @modelAction
  openTask(id: string) {
    const oldIdx = this.opened.findIndex(card => card.originalRef.id === id);
    if (oldIdx >= 0) {
      this.opened.push(this.opened.splice(oldIdx, 1)[0]);
    } else {
      this.opened.push(new TaskCardStore({ originalRef: Synchronizer.actualTaskRef(id) }));
    }
  }

  @modelAction
  revealCard(id: string) {
    const oldIdx = this.opened.findIndex(card => card.id === id);
    if (oldIdx >= 0) {
      this.opened.push(this.opened.splice(oldIdx, 1)[0]);
      return true;
    }
    return false;
  }

  getUser(id: string) {
    const user: UserBrief | undefined = this.users[id];
    /// TODO schedule loading `id` if !user
    return user ? user : (`loading` as const);
  }
}

@model(`focalm/RootStorage`)
export class Storage extends Model({
  tasks: prop(() => new Synchronizer({})),
}) {
  @modelAction
  setUrqlClient(client: Client) {
    urqlClientCtx.set(this, client);
    return this;
  }
}

export const { use: useStorage, provider: StorageProvider } = createUsableContext<Storage>(`RootStorage`);
