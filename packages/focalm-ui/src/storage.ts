import { ExMap, ExSet, notNull, Nullish, reverse } from '@freyja/kit/src';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import { sortBy } from 'lodash';
import { computed, reaction } from 'mobx';
import { Model, model, modelAction, prop } from 'mobx-keystone';
import { computedFn } from 'mobx-utils';
import {
  AnyVariables,
  Client,
  DocumentInput,
  OperationContext,
  OperationResult,
  OperationResultSource,
} from 'urql';

import { TaskState } from './graphql.generated/_types';
import {
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  UpdateTasksMutation,
  useGetTasksQuery,
} from './graphql.generated/tasks';
import { getUrqlClient, urqlClientCtx } from './mobx-util';
import { PromiseWithCancel, Requester } from './requester';

type Task = Exclude<ReturnType<typeof useGetTasksQuery>[0]['data'], Nullish>[`tasks`][number];

type TaskUpdate = { field: keyof Task; value: unknown };

type TaskChangeGroup = { createdAt: Date; localCreatedAt: Date; values: TaskUpdate[] };

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
    ),
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

const disposable = (f: () => () => void): { init(): void; destroy(): void } => ({
  init() {
    this.destroy = f();
  },
  destroy: () => {
    throw new Error(`init didn't called`);
  },
});

// when uploading change of the task, it's createdAt must be clamped to [maxUpdatedAt, server.now()] (lower bound on the front, upper - on the server)
// when adding changes to history, need to apply values which's createdAt greater than the last existing change of the same key in history

@model(`focalm/Synchronizer`)
export class Synchronizer extends Model({
  stored: prop<Record<string, Task>>(() => ({})),
  saving: prop<Record<string, TaskChangeGroup[]>>(() => ({})),
  pending: prop<Record<string, TaskChangeGroup[]>>(() => ({})),
}) {
  readonly loadRequest = new Requester<{
    tasks: GetTasksQuery[`tasks`];
    changedIds: ExMap<string, string> | undefined;
  }>().setRequest(() =>
    executeQuery<GetTasksQuery, GetTasksQueryVariables>(getUrqlClient(this), GetTasksDocument, {
      updatedAfter: this.maxUpdatedAt?.toISOString(),
    }).update(p => p.then(result => ({ ...result, changedIds: undefined })))
  );
  readonly saveRequest = new Requester<UpdateTasksMutation>();

  @computed
  get maxUpdatedAt() {
    const l = Object.values(this.stored);
    return l.length ? new Date(Math.max(...l.map(t => t.updatedAt.getTime()))) : undefined;
  }

  readonly sortedTaskChanges = computedFn(function (this: Synchronizer, id: string) {
    return reverse(
      sortBy([...(this.saving[id] || []), ...(this.pending[id] || [])], group => group.createdAt.getTime())
    );
  });

  readonly taskUpdates = computedFn(function (this: Synchronizer, id: string) {
    const groups = this.sortedTaskChanges(id);
    let u: Partial<Task> | undefined = undefined;
    for (const group of groups) {
      for (const value of group.values) {
        (u ||= {})[value.field] = value;
      }
    }
    return u;
  });

  @computed
  get newTasksIds() {
    return new ExSet([...Object.keys(this.saving), ...Object.keys(this.pending)]).subtract(
      Object.keys(this.stored)
    );
  }

  @computed
  get actualTasks() {
    const result = new ExMap<string, Omit<Task, `createdAt` | `updatedAt` | `author`>>();
    for (const id of new Set([
      ...Object.keys(this.saving),
      ...Object.keys(this.pending),
      ...Object.keys(this.stored),
    ])) {
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
  private onGotTasks(tasks: Task[]) {
    for (const task of tasks) {
      const obj = this.stored[task.id];
      if (obj) {
        Object.assign(obj, task);
      } else {
        this.stored[task.id] = task;
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
    ] as const;
    s.forEach(f => f.init());

    return () => {
      s.forEach(f => f.destroy());
    };
  }

  @modelAction
  pushUpdates(id: string, updates: readonly TaskUpdate[]) {
    // (notNull(this.pending[id]).updates ||= []).push(...updates);
  }

  @modelAction
  private prepareSave() {
    if (Object.keys(this.saving).length > 0) {
      throw new Error(`saving array must be empty at save time`);
    }

    const saving = { ...this.saving };

    // {
    //   // move pending to saving
    //   for (const [id, change] of Object.entries(this.pending)) {
    //     if (change.create) {
    //       if (saving[id]) {
    //         throw new Error(`duplicate creating id ${id}`);
    //       }
    //       saving[id] = change;
    //     } else {
    //       const old = saving[id];
    //       saving[id] = old
    //         ? { ...old, updates: [...old.updates, ...change.updates] }
    //         : { updates: change.updates };
    //     }
    //   }
    //
    //   this.saving = saving;
    //   this.pending = {};
    // }
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

    this.prepareSave();

    // try {
    //   const result = await this.saveRequest.setRequest(() =>
    //     executeMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(
    //       getUrqlClient(this),
    //       UpdateTasksDocument,
    //       {
    //         changes: Object.entries(this.saving).map(([id, change]) => ({
    //           id,
    //           create: change.create,
    //           updates: change.updates.map(u => ({
    //             field: u.field,
    //             stringValue: JSON.stringify(u.value),
    //             createdAt: u.createdAt.toISOString(),
    //           })),
    //         })),
    //         fetchOptions: { updatedAfter: this.maxUpdatedAt },
    //       },
    //       {}
    //     )
    //   ).wait;
    //   // rewrite result.data.updateTasks.changedIds in pending;
    //   // clear saving;
    // } catch {
    //   // move saving to pending;
    // }
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
