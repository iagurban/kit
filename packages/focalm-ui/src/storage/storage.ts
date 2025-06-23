import { generateNewTaskId } from '@focalm/core/const';
import { CurrentUserJwtPayload } from '@focalm/server/modules/auth/auth.service';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import { ExMap, ExSet, notNull, Nullish } from '@gurban/kit/index';
import dayjs from 'dayjs';
import { sortBy } from 'lodash';
import { computed, observable, reaction } from 'mobx';
import { createContext, customRef, Model, model, modelAction, prop } from 'mobx-keystone';
import { computedFn } from 'mobx-utils';
import { Client } from 'urql';

import { TaskHistoryKey, TaskState } from '../graphql.generated/_types';
import {
  GetProjectsDocument,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  UpdateTasksDocument,
  UpdateTasksMutation,
  UpdateTasksMutationVariables,
} from '../graphql.generated/tasks';
import { manualSort } from '../shared/const';
import { executeMutation, executeQuery } from '../utils/execute-query';
import { disposable, getUrqlClient, urqlClientCtx } from '../utils/mobx-util';
import { ImperativeRequester } from '../utils/requester';
import {
  Task,
  TaskCardStore,
  TaskChangeGroup,
  tasksStoreCtx,
  TaskUpdate,
  UserBrief,
} from './task-card-store';

@model(`focalm/Tasks`)
export class TasksStore extends Model({
  stored: prop<Record<string, Task>>(() => ({})),

  saving: prop<TaskChangeGroup[]>(() => []),
  pending: prop<TaskChangeGroup[]>(() => []),

  opened: prop<TaskCardStore[]>(() => []),

  users: prop<Record<string, UserBrief>>(() => ({})),
}) {
  @observable cardsHidden = false;
  @modelAction
  setCardsHidden(hidden: boolean) {
    this.cardsHidden = hidden;
  }

  @modelAction
  closeAllCards() {
    this.opened = this.opened.filter(card => card.hasChanges);
    if (this.opened.length) {
      this.setCardsHidden(true);
    }
  }

  private readonly _dummy = ((() => tasksStoreCtx.set(this, this))(), 0);

  static readonly actualTaskRef = customRef<Exclude<ReturnType<TasksStore[`actualTasks`][`get`]>, Nullish>>(
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

  readonly pendingForTaskId = computedFn(function (this: TasksStore, id: string) {
    return this.pending.flatMap(group =>
      group.values
        .filter(v => v.taskId === id || v.invTaskId === id)
        .map(v => ({ ...v, createdAt: group.createdAt }))
    );
  });

  readonly sortedTaskChanges = computedFn(function (this: TasksStore, id: string) {
    const pft = this.pendingForTaskId(id);
    return sortBy(
      [
        ...this.saving.flatMap(group =>
          group.values.filter(v => v.taskId === id).map(v => ({ ...v, createdAt: group.createdAt }))
        ),
        ...pft,
      ],
      value => new Date(value.createdAt).getTime()
    );
  });

  readonly taskUpdates = computedFn(function (this: TasksStore, id: string) {
    const values = this.sortedTaskChanges(id);
    let u: Partial<Task> | undefined = undefined;
    for (const { value, field } of values) {
      if (field === `participants` || field === `relations`) {
        console.warn(`taskUpdates field`, field);
      } else {
        (u ||= {})[field] = value;
      }
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
          description: update.description ?? ``,
          archived: update.archived ?? false,
          state: update.state ?? TaskState.Pending,
          ease: update.ease ?? 5,
          impact: update.impact ?? 5,
          orderKey: update.orderKey ?? ``,
          projectId: notNull(update.projectId),
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

    this.onUsersUpdated(relatedUsers);
  }

  @modelAction
  onUsersUpdated(users: readonly UserBrief[]) {
    for (const user of users) {
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

  getCreatedAt() {
    return dayjs.max(dayjs(), dayjs(this.maxUpdatedAt).add(1, `ms`)).toISOString();
  }

  @modelAction
  pushUpdates(updates: TaskUpdate[]) {
    this.pending.push({
      values: updates,
      createdAt: this.getCreatedAt(),
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
      this.opened.push(new TaskCardStore({ originalRef: TasksStore.actualTaskRef(id) }));
    }
    this.setCardsHidden(false);
  }

  @modelAction
  revealCard(id: string) {
    const oldIdx = this.opened.findIndex(card => card.id === id);
    if (oldIdx >= 0) {
      this.opened.push(this.opened.splice(oldIdx, 1)[0]);
      this.setCardsHidden(false);
      return true;
    }
    return false;
  }

  getUser(id: string) {
    const user: UserBrief | undefined = this.users[id];
    /// TODO schedule loading `id` if !user
    return user ? user : (`loading` as const);
  }

  @modelAction
  createNewTask(title: string, projectId: string) {
    const createKeyPatches = ({ newKeys, updated }: { newKeys: string[]; updated: Map<string, string> }) => {
      const r = [{ taskId, value: newKeys[0] }];
      for (const [old, upd] of updated) {
        const t = notNull(Object.values(this.stored).find(t => t.orderKey === old)); /// TODO optimize byOrderKey
        r.push({ taskId: t.id, value: upd });
      }
      return r;
    };

    const taskId = generateNewTaskId();
    const last = this.manualSortedTasksList.at(-1);
    const orderKeyPatches = (
      last
        ? createKeyPatches(
            manualSort.insertAfter(
              this.manualSortedTasksList.map(t => t.orderKey),
              last.orderKey,
              1
            )
          )
        : [{ taskId, value: manualSort.getNewKeys(1)[0] }]
    ).map(v => ({ ...v, field: `orderKey` as const }));

    this.pushUpdates([
      { taskId, field: `authorId`, value: notNull(userCtx.get(this)).sub },
      { taskId, field: `projectId`, value: projectId },
      { taskId, field: `title`, value: title },
      ...orderKeyPatches,
    ]);
  }

  @modelAction
  openNewTaskCard(title: string | undefined, projectId: string) {
    const s = new TaskCardStore({ originalRef: TasksStore.actualTaskRef(generateNewTaskId()), projectId });
    if (title) {
      s.setStringValue(`title`, title);
    }
    s.setStringValue(`projectId`, projectId);
    s.setStringValue(`authorId`, notNull(userCtx.get(this)).sub);
    this.opened.push(s);
  }

  @computed
  get manualSortedTasksList() {
    /// TODO restrict by projectId
    return sortBy([...this.actualTasks.values()], t => t.orderKey);
  }
}

export const userCtx = createContext<CurrentUserJwtPayload>();

@model(`focalm/ProjectsStore`)
class ProjectsStore extends Model({
  cache: prop<
    Record<
      string,
      {
        id: string;
        name: string;
        relationTypes: Record<string, { id: string; forward: string; inverse: string }>;
      }
    >
  >(() => ({})),
  selectedProjectId: prop<string | undefined>(() => undefined).withSetter(),
}) {
  readonly loadRequest = new ImperativeRequester<GetProjectsQuery>(() =>
    executeQuery<GetProjectsQuery, GetProjectsQueryVariables>(getUrqlClient(this), GetProjectsDocument, {})
  );

  @modelAction
  setProject(project: GetProjectsQuery[`projects`][number]) {
    this.cache[project.id] = {
      ...project,
      relationTypes: Object.fromEntries(project.relationTypes.map(rt => [rt.id, rt] as const)),
    };
  }

  protected override onAttachedToRootStore(): () => void {
    const s = [
      this.loadRequest,
      disposable(() =>
        reaction(
          () => this.loadRequest.result,
          r => {
            if (r?.projects) {
              for (const p of r.projects) {
                this.setProject(p);
              }
              if (!this.selectedProjectId) {
                const own = r.projects.find(p => p.ownOf?.id === notNull(userCtx.get(this)).sub);
                if (own) {
                  this.setSelectedProjectId(own.id);
                }
              }
            }
          }
        )
      ),
    ];

    s.forEach(f => f.init());

    this.loadRequest.execute();

    return () => s.forEach(f => f.destroy());
  }
}

@model(`focalm/RootStorage`)
export class RootStorage extends Model({
  tasks: prop(() => new TasksStore({})),
  projects: prop(() => new ProjectsStore({})),
}) {
  @modelAction
  setUrqlClient(client: Client) {
    urqlClientCtx.set(this, client);
    return this;
  }

  @modelAction
  setUser(user: CurrentUserJwtPayload) {
    userCtx.set(this, user);
    return this;
  }
}

export const { use: useStorage, provider: StorageProvider } = createUsableContext<RootStorage>(`RootStorage`);
