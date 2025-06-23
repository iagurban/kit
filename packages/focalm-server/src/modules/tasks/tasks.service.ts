import { randomUUID } from 'node:crypto';

import {
  checked,
  compileIsAny,
  ExMap,
  ExSet,
  isNull,
  isNullish,
  isNumber,
  isString,
  notNull,
  PromiseValue,
  samplesBy,
} from '@freyja/kit/src';
import { Injectable } from '@nestjs/common';
import { groupBy, sortBy, sortedIndexBy } from 'lodash';

import { $Enums, Prisma, TaskHistoryKey, TaskState } from '../../generated/db-client';
import { DbService } from '../db/db.service';

import JsonValue = Prisma.JsonValue;
import TaskUpdateArgs = Prisma.TaskUpdateArgs;
import TaskCreateArgs = Prisma.TaskCreateArgs;
import JsonNull = Prisma.JsonNull;
import TransactionIsolationLevel = Prisma.TransactionIsolationLevel;
import CreatedAtFixReason = $Enums.CreatedAtFixReason;
import { isPlainObject } from '@nestjs/common/utils/shared.utils';
import { z } from 'zod';

import { Task } from '../../generated/nestgraphql/task/task.model';
import { currentUserCtx } from '../../interceptors/current-user-context';
import { FetchAllTasksOptionsInput } from './fetch-all-tasks-options-input';
import { TasksChangesGroup } from './tasks-changes-group';

const participantsChangeSchema = z.object({
  action: z.enum([`+`, `-`]),
  userId: z.string(),
  tag: z.string().optional(),
});
type ParticipantsChange = z.infer<typeof participantsChangeSchema>;

const relationsChangeSchema = z.object({
  action: z.enum([`+`, `-`]),
  srcId: z.string(),
  dstId: z.string(),
  typeId: z.string(),
});
type RelationsChange = z.infer<typeof relationsChangeSchema>;

const trimCreatedAt = (
  createdAt: Date,
  createdAtFixReason?: CreatedAtFixReason
): { createdAt: Date; createdAtFixReason?: CreatedAtFixReason } => {
  const now = new Date();
  if (createdAt.getTime() > now.getTime()) {
    return {
      createdAt: now,
      createdAtFixReason:
        createdAtFixReason === CreatedAtFixReason.Low ? CreatedAtFixReason.Both : CreatedAtFixReason.High,
    };
  }
  return { createdAt, createdAtFixReason };
};

const isTaskHistoryKey = (key: string): key is TaskHistoryKey =>
  (TaskHistoryKey as Record<string, string>)[key] === key;

const isTaskState = (key: string): key is TaskState => (TaskState as Record<string, string>)[key] === key;
const isStringAndTaskState = (key: unknown): key is TaskState => typeof key === `string` && isTaskState(key);

const secondsIn24h = 24 * 60 * 60;

const getTypedChange = (key: TaskHistoryKey, value: JsonValue, newIdsReplacements: ExMap<string, string>) => {
  switch (key) {
    case 'title':
    case 'authorId':
    case 'responsibleId':
    case 'projectId':
    case 'orderKey':
      return { key, value: checked(value, isString, () => `Invalid ${key}: ${value}`) };
    case 'parentId': {
      const v = checked(value, compileIsAny(isString, isNull), () => `Invalid ${key}: ${value}`);
      return { key, value: v != null ? (newIdsReplacements.get(v) ?? v) : null };
    }
    case 'ease':
    case 'impact':
      return { key, value: checked(value, isNumber, () => `Invalid ${key}: ${value}`) };
    case 'state':
      return { key, value: checked(value, isStringAndTaskState, () => `Invalid ${key}: ${value}`) };
    case 'archived':
      return {
        key,
        value: checked(
          value,
          (o): o is boolean => typeof o === `boolean`,
          () => `Invalid ${key}: ${value}`
        ),
      };
    case 'startAfterDate':
    case 'plannedStartDate':
    case 'dueToDate': {
      const str = checked(
        checked(value, compileIsAny(isString, isNullish), () => `Invalid ${key}: ${value}`),
        s => s == null || /^\d{4}-\d{2}-\d{2}$/.test(s),
        () => `Invalid date format: ${value}`
      );

      return {
        key,
        value: str ? new Date(str) : null,
      };
    }
    case 'startAfterOffset':
    case 'plannedStartOffset':
    case 'dueToOffset':
      return {
        key,
        value: checked(
          checked(value, compileIsAny(isNumber, isNullish), () => `Invalid ${key}: ${value}`),
          v => v == null || (v >= 0 && v < secondsIn24h),
          () => `Invalid offset: ${value}; expected 0..${secondsIn24h - 1}`
        ),
      };
    case 'participants':
      return {
        key,
        value: participantsChangeSchema.parse(value),
      };
    case 'relations':
      return {
        key,
        value: relationsChangeSchema.parse(value),
      };
    case 'description':
      return {
        key,
        value: checked(value, isPlainObject, () => `Invalid ${key}: ${value}`),
      };
    default:
      throw new Error(`Unknown update field ${key}`);
  }
};

const taskUpdateCollector = (id: string, db: DbService) => {
  let changed = false;
  let update: Partial<{
    title: string;
    ease: number;
    impact: number;
    state: TaskState;
    archived: boolean;
    orderKey: string;
    authorId: string;
    projectId: string;
    responsibleId: string | null;
    parentId: string | null;
    startAfterDate: Date;
    startAfterOffset?: number | null;
    plannedStartDate: Date;
    plannedStartOffset?: number | null;
    dueToDate: Date;
    dueToOffset?: number | null;
  }> = {};

  const participants: {
    value: ParticipantsChange;
    createdAt: Date;
  }[] = [];
  let participantsNeedsFullRebuild = false;

  const getCurrentSortedParticipantsChanges = async () => {
    return (
      await db.transaction.taskHistoryValue.findMany({
        where: { taskId: id, key: TaskHistoryKey.participants },
        orderBy: { group: { createdAt: 'asc' } },
        select: { value: true, group: { select: { createdAt: true } } },
      })
    ).map(e => ({
      value: e.value as ParticipantsChange,
      createdAt: e.group.createdAt,
    }));
  };

  const addSortedParticipantsChanges = (
    current: PromiseValue<ReturnType<typeof getCurrentSortedParticipantsChanges>>,
    add: (typeof participants)[number][]
  ) => {
    // console.log(`current`, current);
    // console.log(`add`, add);
    current = [...current];
    for (const v of add) {
      current.splice(
        sortedIndexBy(current, v, v => v.createdAt.getTime()),
        0,
        v
      );
    }
    return current;
  };

  const changesToSnapshot = (
    changes: PromiseValue<ReturnType<typeof getCurrentSortedParticipantsChanges>>
  ) => {
    const { tags, users } = groupBy(changes, c => (c.value.tag != null ? `tags` : `users`));

    const result: Record<string /*user*/, Set<string>> = {};
    for (const c of users || []) {
      if (c.value.action === `+`) {
        result[c.value.userId] ??= new Set(); // don't overwrite
      } else {
        delete result[c.value.userId];
      }
    }

    for (const c of tags || []) {
      if (result[c.value.userId]) {
        if (c.value.action === `+`) {
          result[c.value.userId].add(c.value.tag!);
        } else {
          result[c.value.userId].delete(c.value.tag!);
        }
      }
    }
    return result;
  };

  const rewriteParticipants = async (
    changes: PromiseValue<ReturnType<typeof getCurrentSortedParticipantsChanges>>
  ) => {
    await db.transaction.userInTask.deleteMany({ where: { taskId: id } });
    const snapshot = changesToSnapshot(changes);
    // console.dir(changes, { depth: null });
    // console.dir(snapshot, { depth: null });
    for (const [userId, roles] of Object.entries(snapshot)) {
      await db.transaction.userInTask.create({
        data: {
          userId,
          taskId: id,
          tags: { createMany: { data: [...roles].map(r => ({ roleId: r })) } },
        },
      });
    }
  };

  const relations: {
    value: RelationsChange;
    createdAt: Date;
  }[] = [];
  let relationsNeedsFullRebuild = false;

  const getCurrentSortedRelationsChanges = async () => {
    return (
      await db.transaction.taskHistoryValue.findMany({
        where: { taskId: id, key: TaskHistoryKey.relations },
        orderBy: { group: { createdAt: 'asc' } },
        select: { value: true, group: { select: { createdAt: true } } },
      })
    ).map(e => ({
      value: e.value as RelationsChange,
      createdAt: e.group.createdAt,
    }));
  };

  const relationsChangesToSnapshot = (
    changes: PromiseValue<ReturnType<typeof getCurrentSortedRelationsChanges>>
  ) => {
    const result: Record<string /*user*/, Set<string>> = {};
    for (const c of changes) {
      if (c.value.action === `+`) {
        (result[c.value.dstId] ??= new Set()).add(c.value.typeId); // don't overwrite
      } else {
        const o = result[c.value.dstId];
        if (o) {
          o.delete(c.value.typeId);
          if (!o.size) {
            delete result[c.value.dstId];
          }
        }
      }
    }

    return result;
  };

  const addSortedRelationsChanges = (
    current: PromiseValue<ReturnType<typeof getCurrentSortedRelationsChanges>>,
    add: (typeof relations)[number][]
  ) => {
    // console.log(`current`, current);
    // console.log(`add`, add);
    current = [...current];
    for (const v of add) {
      current.splice(
        sortedIndexBy(current, v, v => v.createdAt.getTime()),
        0,
        v
      );
    }
    return current;
  };

  const rewriteRelations = async (
    changes: PromiseValue<ReturnType<typeof getCurrentSortedRelationsChanges>>
  ) => {
    const bySrc = ExMap.groupedBy(changes, c => c.value.srcId);

    const dstIds = changes.map(c => c.value.dstId);

    // console.log(bySrc);

    for (const [srcId, cc] of bySrc) {
      await db.transaction.taskToTaskRelation.deleteMany({ where: { srcId: id } });
      const snapshot = relationsChangesToSnapshot(cc);
      for (const [dstId, typeIds] of Object.entries(snapshot)) {
        for (const typeId of typeIds) {
          await db.transaction.taskToTaskRelation.create({ data: { srcId, typeId, dstId } });
        }
      }
    }

    return new ExSet(bySrc.keys()).join(dstIds);
  };

  return {
    addPart(typed: ReturnType<typeof getTypedChange>) {
      update = { ...update, [typed.key]: typed.value };
      changed = true;
    },
    addParticipantsChange(
      part: ParticipantsChange,
      isOlderThanLast: boolean,
      cur: { value: JsonValue; createdAt: Date } | undefined,
      createdAt: Date
    ) {
      // console.log(`addParticipantsChange`, part);
      participants.push({ value: part, createdAt });
      if (isOlderThanLast) {
        participantsNeedsFullRebuild = true;
      }
    },
    addRelationsChange(
      part: RelationsChange,
      isOlderThanLast: boolean,
      cur: { value: JsonValue; createdAt: Date } | undefined,
      createdAt: Date
    ) {
      // console.log(`addParticipantsChange`, part);
      relations.push({ value: part, createdAt });
      if (isOlderThanLast) {
        relationsNeedsFullRebuild = true;
      }
    },
    async writeParticipantsChanges() {
      if (!participants.length) {
        return;
      }
      await rewriteParticipants(
        addSortedParticipantsChanges(await getCurrentSortedParticipantsChanges(), participants)
      );
    },
    async writeRelationsChanges() {
      if (!relations.length) {
        return new ExSet<string>();
      }
      const oldChanges = await getCurrentSortedRelationsChanges();
      // console.log(`oldChanges:`);
      // console.dir(oldChanges, { depth: null });
      // console.log(`newChanges:`);
      // console.dir(relations, { depth: null });
      return await rewriteRelations(addSortedRelationsChanges(oldChanges, relations));
    },
    get hasChanges() {
      return changed;
    },
    get update() {
      return update satisfies TaskUpdateArgs[`data`];
    },
    create(nnInProject: bigint) {
      return {
        ...update,
        id,
        authorId: checked(update.authorId, isString, () => `authorId missing on create`),
        title: update.title ?? ``,
        orderKey: update.orderKey ?? ``,
        projectId: checked(update.projectId, isString, () => `projectId missing on create`),
        nnInProject,
      } satisfies TaskCreateArgs[`data`];
    },
  };
};

export type PreparedTaskChangesGroup = {
  localCreatedAt: Date;
  createdAt: Date;
  createdAtFixReason?: CreatedAtFixReason;
  valuesByTask: ExMap<
    string /* taskId */,
    readonly { key: TaskHistoryKey; stringValue: string /* JSON */ }[]
  >;
};

const prepareForSearch = (s: string, ordered: boolean) => {
  s = s.replace(/\W/g, ` `).trim();
  if (!ordered) {
    const parts = s.split(/\s+/g);
    const reg = new ExSet<string>();
    const result: string[] = [];
    for (const part of parts) {
      if (!reg.has(part)) {
        reg.add(part);
        result.push(part);
      }
    }
    return result.join(`&`);
  }

  return s.split(/\s+/g).join(`<->`);
};

@Injectable()
export class TasksService {
  constructor(
    readonly db: DbService
    // readonly usersService: UsersService
  ) {}

  async getTasks(select?: Prisma.TaskSelect, fetchOptions?: FetchAllTasksOptionsInput): Promise<Task[]> {
    return this.db.transaction.task.findMany({
      where: {
        authorId: currentUserCtx.get().id,
        updatedAt: fetchOptions?.updatedAfter != null ? { gt: fetchOptions.updatedAfter } : undefined,
      },
      select,
    });
  }

  async searchTasks(o: { titleLike?: string }, select?: Prisma.TaskSelect): Promise<Task[]> {
    // console.log(`o.titleLike`, o.titleLike && prepareForSearch(o.titleLike, false));
    return this.db.transaction.task.findMany({
      where: {
        ...(o.titleLike
          ? { title: { search: prepareForSearch(o.titleLike, false), mode: `insensitive` } }
          : {}),
      },
      select,
    });
  }

  private async tryGetFreeTaskIdsFromHistory(count: number): Promise<ExSet<string>> {
    if (count <= 0) {
      return new ExSet();
    }
    const ids = new ExSet<string>(samplesBy(count, () => randomUUID()));
    while (ids.size < count) {
      // if got duplicates somehow
      ids.add(randomUUID());
    }
    const existing = await this.db.transaction.taskHistoryValue.findMany({
      where: { taskId: { in: [...ids] } },
      select: { taskId: true },
      distinct: [`taskId`],
    });
    ids.subtract(existing.map(e => e.taskId));
    return ids;
  }

  async getFreeTaskIdsFromHistory(count: number): Promise<ExSet<string>> {
    if (count <= 0) {
      return new ExSet();
    }
    const ids = await this.tryGetFreeTaskIdsFromHistory(count);
    for (let need = count - ids.size; need > 0; need = count - ids.size) {
      ids.join(await this.tryGetFreeTaskIdsFromHistory(need));
    }
    return ids;
  }

  async getLastFieldsValuesFromHistory(ids: string[]) {
    return ExMap.groupedBy(
      await this.db.transaction.taskHistoryValue.findMany({
        where: { task: { id: { in: ids } } },
        select: { key: true, value: true, taskId: true, group: { select: { createdAt: true } } },
        orderBy: [{ taskId: `asc` }, { key: `asc` }, { group: { createdAt: 'desc' } }],
        distinct: [`taskId`, `key`],
      }),
      v => v.taskId
    ).mapEntries(e =>
      ExMap.mappedBy(e, e => e.key).mapEntries(e => ({
        value: e.value,
        createdAt: e.group.createdAt,
      }))
    );
  }

  async getNewIdsReplacements(allIds: Set<string>) {
    const split = ExMap.groupedBy([...allIds], id => id.startsWith(`!!NEW:`));
    const newSentIds = split.get(true) ?? [];
    const existingIds = split.get(false) ?? [];
    const newIds = await this.getFreeTaskIdsFromHistory(newSentIds.length);
    const newIdsArray = [...newIds];
    return {
      newIdsReplacements: new ExMap(newSentIds.map((id, i) => [id, newIdsArray[i]])),
      newIds,
      existingIds,
    };
  }

  async popNnInProject(projectId: string) {
    const u = await this.db.transaction.project.update({
      where: { id: projectId },
      data: { tasksCounter: { increment: 1 } },
      select: { tasksCounter: true },
    });

    return u.tasksCounter;
  }

  /**
   * Apply updates on existing tasks and write them to the history.
   *
   * @param changes
   */
  async applyChanges(changes: readonly PreparedTaskChangesGroup[]) {
    return this.db.inAnyTransaction({ isolationLevel: TransactionIsolationLevel.Serializable }, async () => {
      const { newIdsReplacements, existingIds, newIds } = await this.getNewIdsReplacements(
        new Set(changes.flatMap(g => [...g.valuesByTask.keys()]))
      );

      const preparedGroups = changes.map(group => ({
        localCreatedAt: group.localCreatedAt,
        ...trimCreatedAt(group.createdAt, group.createdAtFixReason),
        scalarValues: new ExMap(
          group.valuesByTask.toArray(
            (k2v, taskId) =>
              [
                newIdsReplacements.get(taskId) ?? taskId,
                k2v
                  .filter(({ key }) => key !== `participants` && key !== `relations`)
                  .map(({ stringValue, key }) =>
                    getTypedChange(key, JSON.parse(stringValue), newIdsReplacements)
                  ),
              ] as const
          )
        ),
        participantsUpdates: new ExMap(
          group.valuesByTask
            .toArray(
              (k2v, taskId) =>
                [
                  newIdsReplacements.get(taskId) ?? taskId,
                  k2v
                    .filter(({ key }) => key === `participants`)
                    .map(
                      ({ stringValue }) => (
                        console.log(JSON.parse(stringValue)),
                        participantsChangeSchema.parse(JSON.parse(stringValue))
                      )
                    ),
                ] as const
            )
            .filter(([, v]) => v.length > 0)
            .map(([taskId, v]) => [taskId, v])
        ),
        relationsUpdates: new ExMap(
          group.valuesByTask
            .toArray(
              (k2v, taskId) =>
                [
                  newIdsReplacements.get(taskId) ?? taskId,
                  k2v
                    .filter(({ key }) => key === `relations`)
                    .map(({ stringValue }) => relationsChangeSchema.parse(JSON.parse(stringValue))),
                ] as const
            )
            .filter(([, v]) => v.length > 0)
            .map(([taskId, v]) => [taskId, v])
        ),
      }));

      const allScalarValues = sortBy(
        preparedGroups.flatMap(group =>
          group.scalarValues
            .toArray((updates, taskId) =>
              updates.map(update => ({
                taskId,
                group,
                ...update,
              }))
            )
            .flat()
        ),
        e => e.group.createdAt.getTime()
      );

      const allParticipantsValues = sortBy(
        preparedGroups.flatMap(group =>
          group.participantsUpdates
            .toArray((updates, taskId) =>
              updates.map(update => ({
                taskId,
                group,
                ...update,
              }))
            )
            .flat()
        ),
        e => e.group.createdAt.getTime()
      );
      const allRelationsValues = sortBy(
        preparedGroups.flatMap(group =>
          group.relationsUpdates
            .toArray((updates, taskId) =>
              updates.map(update => ({
                taskId,
                group,
                ...update,
              }))
            )
            .flat()
        ),
        e => e.group.createdAt.getTime()
      );

      console.log(`allRelationsValues`, allRelationsValues);

      const updatesByTaskId = ExMap.groupedBy(allScalarValues, value => value.taskId);

      const participantsChanges: ExMap<string, { value: ParticipantsChange; createdAt: Date }[]> =
        ExMap.groupedBy(allParticipantsValues, value => value.taskId).mapEntries(v =>
          v.map(v => ({ value: v, createdAt: v.group.createdAt }))
        );

      const relationsChanges: ExMap<string, { value: RelationsChange; createdAt: Date }[]> = ExMap.groupedBy(
        allRelationsValues,
        value => value.taskId
      ).mapEntries(v => v.map(v => ({ value: v, createdAt: v.group.createdAt })));

      const newLastByTaskId = updatesByTaskId.mapEntries(values => {
        const u = new ExMap<TaskHistoryKey, { part: ReturnType<typeof getTypedChange>; createdAt: Date }>();
        for (const value of values) {
          u.set(value.key, { part: value, createdAt: value.group.createdAt });
        }
        return u;
      });

      for (const taskId of participantsChanges.keys()) {
        newLastByTaskId.getOrCreate(taskId, () => new ExMap());
      }

      for (const taskId of relationsChanges.keys()) {
        newLastByTaskId.getOrCreate(taskId, () => new ExMap());
      }

      const curLastByTaskId = await this.getLastFieldsValuesFromHistory(existingIds);

      const user = currentUserCtx.get();

      console.log(newIds, newIdsReplacements);

      {
        const needUpdateUpdatedAt = new ExSet<string>();
        const didUpdateUpdatedAt = new ExSet<string>();

        await Promise.all([
          ...newLastByTaskId.toArray(async (newFields, taskId) => {
            const curFields = curLastByTaskId.get(taskId);
            const collector = taskUpdateCollector(taskId, this.db);

            const add = (
              isOlderThanLastExisting: boolean,
              part: ReturnType<typeof getTypedChange>,
              cur:
                | {
                    value: JsonValue;
                    createdAt: Date;
                  }
                | undefined,
              createdAt: Date
            ) => {
              if (part.key === `participants`) {
                throw new Error(`Unexpected participants change`);
                // collector.addParticipantsChange(part, isOlderThanLastExisting, cur, createdAt);
              } else if (part.key === `relations`) {
                throw new Error(`Unexpected relations change`);
              } else if (isOlderThanLastExisting) {
                collector.addPart(part);
              }
            };

            if (curFields) {
              for (const [field, { createdAt, part }] of newFields.entries()) {
                const cur = curFields?.get(field);
                const isOlderThanLastExisting = cur == null || cur.createdAt.getTime() < createdAt.getTime();
                add(isOlderThanLastExisting, part, cur, createdAt);
              }
            } else {
              for (const { part, createdAt } of newFields.values()) {
                add(true, part, undefined, createdAt);
              }
            }

            for (const p of participantsChanges.get(taskId) ?? []) {
              collector.addParticipantsChange(p.value, true, undefined, p.createdAt);
            }

            for (const p of relationsChanges.get(taskId) ?? []) {
              collector.addRelationsChange(p.value, true, undefined, p.createdAt);
            }

            if (newIds.has(taskId)) {
              const dd = collector.create(
                await this.popNnInProject(
                  notNull(collector.update.projectId, () => `projectId missing on create`)
                )
              );
              console.log(`create`, dd);
              await this.db.transaction.task.create({
                data: {
                  ...dd,
                  updatedAt: new Date(),
                },
              });
              didUpdateUpdatedAt.add(taskId);
            } else if (collector.hasChanges) {
              await this.db.transaction.task.update({
                where: { id: taskId },
                data: {
                  ...collector.update,
                  updatedAt: new Date(),
                },
              });
              didUpdateUpdatedAt.add(taskId);
            }

            await collector.writeParticipantsChanges();
            needUpdateUpdatedAt.join(await collector.writeRelationsChanges());
          }),
        ]);

        needUpdateUpdatedAt.subtract(didUpdateUpdatedAt);
        await this.db.transaction.task.updateMany({
          where: { id: { in: [...needUpdateUpdatedAt] } },
          data: { updatedAt: new Date() },
        });
      }

      await Promise.all([
        ...preparedGroups.flatMap(group =>
          this.db.transaction.taskHistoryGroup.create({
            data: {
              author: { connect: { id: user.id } },
              localCreatedAt: group.localCreatedAt,
              createdAt: group.createdAt,
              createdAtFixReason: group.createdAtFixReason,
              values: {
                createMany: {
                  data: [
                    ...group.scalarValues.toArray((values, taskId) =>
                      values.map(value => ({
                        taskId,
                        key: value.key,
                        value: value.value != null ? value.value : JsonNull,
                      }))
                    ),
                    ...group.participantsUpdates.toArray((values, taskId) =>
                      values.map(value => ({
                        taskId,
                        key: TaskHistoryKey.participants,
                        value: value,
                      }))
                    ),
                    ...group.relationsUpdates.toArray((values, taskId) =>
                      values.map(value => ({
                        taskId,
                        key: TaskHistoryKey.relations,
                        value: value,
                      }))
                    ),
                  ].flat(),
                },
              },
            },
          })
        ),
      ]);

      return { newIdsReplacements, existingIds };
    });
  }

  async updateTasks(changes: TasksChangesGroup[]) {
    const { newIdsReplacements } = await this.applyChanges(
      changes.map(
        group =>
          ({
            createdAt: group.createdAt,
            localCreatedAt: group.localCreatedAt,
            createdAtFixReason: group.createdAtFixReason,
            valuesByTask: ExMap.groupedBy(group.updates, u => u.taskId).mapEntries(updates =>
              updates.map(update => ({ key: update.field, stringValue: update.stringValue }) as const)
            ),
          }) as const
      )
    );
    return {
      changedIds: newIdsReplacements.toArray((persistent, temp) => ({ src: temp, dst: persistent })),
    };
  }
}
