import { notNull } from '@freyja/kit/utils/flow-utils';
import { Nullish } from '@freyja/kit/utils/types';
import { JSONContent } from '@tiptap/react';
import { computed, reaction, toJS } from 'mobx';
import { createContext, idProp, Model, model, modelAction, prop } from 'mobx-keystone';

import { ParticipantRole } from '../graphql.generated/_types';
import { GetTasksQuery } from '../graphql.generated/tasks';
import { disposable } from '../utils/mobx-util';
import { TasksStore } from './storage';

export type Task = Omit<GetTasksQuery[`tasks`][`tasks`][number], `__typename`>;

export type UserBrief = GetTasksQuery[`tasks`][`relatedUsers`][number];

export type TaskUpdate = {
  taskId: string;
  invTaskId?: string;
  field: Exclude<keyof Task, `id` | `relationsDst` | `relationsSrc`> | `relations`;
  value: unknown;
};

export type TaskChangeGroup = { createdAt: string; localCreatedAt: string; values: TaskUpdate[] };

export const tasksStoreCtx = createContext<TasksStore>();

export type PRole = Omit<ParticipantRole, `_count` | `__typename`>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyParameters = any[];

export const negatedFn =
  <Fn extends (...a: AnyParameters) => boolean>(fn: Fn) =>
  (...a: Parameters<Fn>) =>
    !fn(...a);

const srcPredicate = (dstId: string, typeId: string) => (r: { dstId: string; typeId: string }) =>
  r.typeId === typeId && r.dstId === dstId;

const dstPredicate = (srcId: string, typeId: string) => (r: { srcId: string; typeId: string }) =>
  r.typeId === typeId && r.srcId === srcId;

@model(`focalm/TaskCardStore`)
export class TaskCardStore extends Model({
  id: idProp,
  originalRef: prop<ReturnType<typeof TasksStore.actualTaskRef>>(),
  editMode: prop<`single` | `multiple`>(`single`),
  editValues: prop<
    Partial<Exclude<ReturnType<ReturnType<typeof TasksStore.actualTaskRef>[`resolve`]>, Nullish>>
  >(() => ({})),
  editResponsibleChanges: prop<{
    users: { action: `+` | `-`; userId: string }[];
    tags: { action: `+` | `-`; userId: string; tag: PRole }[];
  }>(() => ({ users: [], tags: [] })),
  editRelationsChanges: prop<{
    forward: {
      action: `+` | `-`;
      dstId: string;
      typeId: string;
    }[];
    inverse: {
      action: `+` | `-`;
      srcId: string;
      typeId: string;
    }[];
  }>(() => ({ forward: [], inverse: [] })),
  projectId: prop<string | undefined>(() => undefined).withSetter(),
}) {
  @computed
  get storage() {
    return notNull(tasksStoreCtx.get(this));
  }

  @computed
  get realProjectId() {
    return notNull(this.originalRef.maybeCurrent?.projectId ?? this.projectId);
  }

  @computed
  get actual() {
    let draft = { ...this.originalRef.maybeCurrent };
    for (const [key, value] of Object.entries(this.editValues)) {
      draft = { ...draft, [key]: value };
    }

    draft.participants = draft.participants ? [...draft.participants] : [];

    for (const { action, userId } of this.editResponsibleChanges.users) {
      if (action === `+`) {
        if (!draft.participants.find(p => p.userId === userId)) {
          draft.participants.push({ userId });
        }
      } else {
        draft.participants = draft.participants.filter(p => p.userId !== userId);
      }
    }

    for (const { action, userId, tag } of this.editResponsibleChanges.tags) {
      if (action === `+`) {
        const idx = draft.participants.findIndex(p => p.userId === userId);
        if (idx >= 0) {
          draft.participants[idx] = {
            ...draft.participants[idx],
            tags: [...(draft.participants[idx].tags ?? []), { role: tag }],
          };
        }
      } else {
        const idx = draft.participants.findIndex(p => p.userId === userId);
        if (idx >= 0) {
          draft.participants[idx] = {
            ...draft.participants[idx],
            tags: draft.participants[idx].tags?.filter(t => t.role.id !== tag.id),
          };
        }
      }
    }

    for (const relation of this.editRelationsChanges.forward) {
      if (relation.action === `+`) {
        if (!draft.relationsSrc?.find(srcPredicate(relation.dstId, relation.typeId))) {
          draft.relationsSrc = [
            ...(draft.relationsSrc ?? []),
            { dstId: relation.dstId, typeId: relation.typeId },
          ];
        }
      } else {
        draft.relationsSrc = draft.relationsSrc?.filter(
          negatedFn(srcPredicate(relation.dstId, relation.typeId))
        );
      }
    }

    for (const relation of this.editRelationsChanges.inverse) {
      if (relation.action === `+`) {
        if (!draft.relationsDst?.find(dstPredicate(relation.srcId, relation.typeId))) {
          draft.relationsDst = [
            ...(draft.relationsDst ?? []),
            { srcId: relation.srcId, typeId: relation.typeId },
          ];
        }
      } else {
        draft.relationsDst = draft.relationsDst?.filter(
          negatedFn(dstPredicate(relation.srcId, relation.typeId))
        );
      }
    }

    // console.log(`draft.relations`, draft.relationsSrc, draft.relationsDst);

    return draft;
  }

  @modelAction
  setStringValue(key: `title` | `startAfterDate` | `projectId` | `authorId`, value: string) {
    this.editValues[key] = value;
  }

  @modelAction
  setJsonValue(key: `description`, value: JSONContent) {
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

  @modelAction
  addUser(userId: string) {
    const o = this.originalRef.maybeCurrent;
    if (o && notNull(o.participants).find(p => p.userId === userId)) {
      this.editResponsibleChanges.users = this.editResponsibleChanges.users.filter(
        a => a.action !== `+` || a.userId !== userId
      );
      return;
    }
    this.editResponsibleChanges.users = this.editResponsibleChanges.users
      .filter(a => a.userId !== userId)
      .concat([{ action: `+`, userId }]);
  }

  @modelAction
  removeUser(userId: string) {
    const o = this.originalRef.maybeCurrent;
    if (!o || !notNull(o.participants).find(p => p.userId === userId)) {
      this.editResponsibleChanges.users = this.editResponsibleChanges.users.filter(a => a.userId !== userId);
      return;
    }
    this.editResponsibleChanges.users = this.editResponsibleChanges.users
      .filter(a => a.userId !== userId)
      .concat([{ action: `-`, userId }]);
  }

  @modelAction
  addUserTag(userId: string, tag: PRole) {
    const o = this.originalRef.maybeCurrent;
    if (
      o &&
      notNull(o.participants)
        .find(p => p.userId === userId)
        ?.tags?.find(t => t.role.id === tag.id)
    ) {
      this.editResponsibleChanges.tags = this.editResponsibleChanges.tags.filter(
        a => a.action !== `+` || a.userId !== userId || a.tag.id !== tag.id
      );
      return;
    }
    this.editResponsibleChanges.tags = this.editResponsibleChanges.tags
      .filter(a => a.userId !== userId || a.tag.id !== tag.id)
      .concat([{ action: `+`, userId, tag }]);
  }

  @modelAction
  removeUserTag(userId: string, tag: PRole) {
    const o = this.originalRef.maybeCurrent;
    if (
      !o ||
      !notNull(o.participants)
        .find(p => p.userId === userId)
        ?.tags?.find(t => t.role.id === tag.id)
    ) {
      this.editResponsibleChanges.tags = this.editResponsibleChanges.tags.filter(
        a => a.userId !== userId || a.tag !== tag
      );
      return;
    }
    this.editResponsibleChanges.tags = this.editResponsibleChanges.tags
      .filter(a => a.userId !== userId || a.tag.id !== tag.id)
      .concat([{ action: `-`, userId, tag }]);
  }

  @modelAction
  addRelation(srcId: string, dstId: string, typeId: string) {
    const o = this.originalRef.maybeCurrent;

    if (srcId === this.taskId) {
      const f = o?.relationsSrc?.find(srcPredicate(dstId, typeId));
      if (!f) {
        this.editRelationsChanges.forward = this.editRelationsChanges.forward
          .filter(negatedFn(srcPredicate(dstId, typeId)))
          .concat([{ action: `+`, dstId, typeId }]);
      }
    } else if (dstId === this.taskId) {
      const f = o?.relationsDst?.find(dstPredicate(srcId, typeId));
      if (!f) {
        this.editRelationsChanges.inverse = this.editRelationsChanges.inverse
          .filter(negatedFn(dstPredicate(srcId, typeId)))
          .concat([{ action: `+`, srcId, typeId }]);
      }
    } else {
      throw new Error(`unexpected relation`);
    }
  }

  @modelAction
  removeRelation(srcId: string, dstId: string, typeId: string) {
    const o = this.originalRef.maybeCurrent;

    if (srcId === this.taskId) {
      const f = o?.relationsSrc?.find(srcPredicate(dstId, typeId));
      this.editRelationsChanges.forward = this.editRelationsChanges.forward.filter(
        negatedFn(srcPredicate(dstId, typeId))
      );
      if (f) {
        this.editRelationsChanges.forward.push({ action: `-`, dstId, typeId });
      }
    } else if (dstId === this.taskId) {
      const f = o?.relationsDst?.find(dstPredicate(srcId, typeId));
      this.editRelationsChanges.inverse = this.editRelationsChanges.inverse.filter(
        negatedFn(dstPredicate(srcId, typeId))
      );
      if (f) {
        this.editRelationsChanges.inverse.push({ action: `-`, srcId, typeId });
      }
    } else {
      throw new Error(`unexpected relation`);
    }
  }

  @computed
  get changesKeys(): (keyof typeof this.editValues | `participants` | `relations`)[] {
    const r = Object.keys(this.editValues) as (keyof typeof this.editValues | `relations`)[];
    if (this.editResponsibleChanges.tags.length || this.editResponsibleChanges.users.length) {
      r.push(`participants`);
    }
    if (this.editRelationsChanges.forward.length || this.editRelationsChanges.inverse.length) {
      r.push(`relations`);
    }
    return r;
  }

  @computed
  get hasChanges() {
    return (
      this.changesKeys.length > 0 ||
      this.editResponsibleChanges.users.length > 0 ||
      this.editResponsibleChanges.tags.length > 0 ||
      this.editRelationsChanges.forward.length > 0 ||
      this.editRelationsChanges.inverse.length > 0
    );
  }

  @modelAction
  reset() {
    this.editValues = {};
    this.editResponsibleChanges = { users: [], tags: [] };
    this.editRelationsChanges = { forward: [], inverse: [] };
  }

  @modelAction
  resetChange(key: keyof typeof this.editValues | `participants` | `relations`) {
    if (key === `participants`) {
      this.editResponsibleChanges = { users: [], tags: [] };
    } else if (key === `relations`) {
      this.editRelationsChanges = { forward: [], inverse: [] };
    } else {
      delete this.editValues[key];
    }
  }

  @computed
  get taskId() {
    return this.originalRef.id;
  }

  @modelAction
  submit() {
    const original = this.originalRef.maybeCurrent;
    const taskId = this.taskId;
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
        case 'description':
        case 'projectId':
        case 'authorId':
        case `title`: {
          if (original?.title !== value) {
            changes.push({
              taskId,
              field: key,
              value: toJS(value),
            });
          }
          break;
        }
        default:
          throw new Error(`unexpected key ${key}`);
      }
    }

    for (const value of this.editResponsibleChanges.users) {
      changes.push({ taskId, field: `participants`, value: { ...value } });
    }

    for (const value of this.editResponsibleChanges.tags) {
      changes.push({ taskId, field: `participants`, value: { ...value } });
    }

    for (const value of this.editRelationsChanges.forward) {
      changes.push({ taskId, field: `relations`, value: { ...value, srcId: taskId } });
    }

    for (const value of this.editRelationsChanges.inverse) {
      changes.push({ taskId, field: `relations`, value: { ...value, dstId: taskId } });
    }

    this.storage.pushUpdates(changes);
    this.reset();
  }

  @modelAction
  close() {
    const opened = this.storage.opened;
    const idx = opened.findIndex(card => card.id === this.id);
    if (idx >= 0) {
      opened.splice(idx, 1);
    }
  }

  protected override onAttachedToRootStore(): () => void {
    const s = [
      disposable(() =>
        reaction(
          () => this.originalRef.maybeCurrent,
          o => {
            if (o) {
              this.setProjectId(o.projectId);
            }
          },
          { fireImmediately: true }
        )
      ),
    ];

    s.forEach(f => f.init());
    return () => s.forEach(f => f.destroy());
  }
}
