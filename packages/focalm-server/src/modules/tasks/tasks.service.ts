import { randomUUID } from 'node:crypto';

import {
  checked,
  compileIsAny,
  ExMap,
  ExSet,
  isNull,
  isNumber,
  isString,
  isTruthy,
  samplesBy,
} from '@freyja/kit/src';
import { Injectable } from '@nestjs/common';
import { sortBy } from 'lodash';

import { $Enums, Prisma, TaskHistoryKey, TaskState } from '../../generated/db-client';
import { DbService } from '../db/db.service';

import JsonValue = Prisma.JsonValue;
import TaskUpdateArgs = Prisma.TaskUpdateArgs;
import TaskCreateArgs = Prisma.TaskCreateArgs;
import JsonNull = Prisma.JsonNull;
import TransactionIsolationLevel = Prisma.TransactionIsolationLevel;
import CreatedAtFixReason = $Enums.CreatedAtFixReason;
import { Task } from '../../generated/nestgraphql/task/task.model';
import { currentUserCtx } from '../../interceptors/current-user-context';
import { FetchAllTasksOptionsInput } from './fetch-all-tasks-options-input';
import { TasksChangesGroup } from './tasks-changes-group';

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
    case 'dueToDate':
      return {
        key,
        value: new Date(
          checked(
            checked(value, isString, () => `Invalid ${key}: ${value}`),
            s => /^\d{4}-\d{2}-\d{2}$/.test(s),
            () => `Invalid date format: ${value}`
          )
        ),
      };
    case 'startAfterOffset':
    case 'plannedStartOffset':
    case 'dueToOffset':
      return {
        key,
        value: checked(
          checked(value, isNumber, () => `Invalid ${key}: ${value}`),
          v => v >= 0 && v < secondsIn24h,
          () => `Invalid offset: ${value}; expected 0..${secondsIn24h - 1}`
        ),
      };
    default:
      throw new Error(`Unknown update field ${key}`);
  }
};

const taskUpdateCollector = (id: string) => {
  let changed = false;
  let update: Partial<{
    title: string;
    ease: number;
    impact: number;
    state: TaskState;
    archived: boolean;
    orderKey: string;
    authorId: string;
    responsibleId: string | null;
    parentId: string | null;
    startAfterDate: Date;
    startAfterOffset?: number | null;
    plannedStartDate: Date;
    plannedStartOffset?: number | null;
    dueToDate: Date;
    dueToOffset?: number | null;
  }> = {};
  return {
    addPart(typed: ReturnType<typeof getTypedChange>) {
      update = { ...update, [typed.key]: typed.value };
      changed = true;
    },
    get hasChanges() {
      return changed;
    },
    get update(): TaskUpdateArgs[`data`] {
      return update;
    },
    get create(): TaskCreateArgs[`data`] {
      return {
        ...update,
        id,
        authorId: checked(update.authorId, isString, () => `authorId missing on create`),
        title: update.title ?? ``,
        orderKey: update.orderKey ?? ``,
      };
    },
  };
};

export type PreparedTaskChangesGroup = {
  localCreatedAt: Date;
  createdAt: Date;
  createdAtFixReason?: CreatedAtFixReason;
  valuesByTask: ExMap<string /* taskId */, ExMap<TaskHistoryKey, string /* JSON */>>;
};

@Injectable()
export class TasksService {
  constructor(
    readonly db: DbService
    // readonly usersService: UsersService
  ) {}

  async getTasks(select?: Prisma.TaskSelect, fetchOptions?: FetchAllTasksOptionsInput): Promise<Task[]> {
    return this.db.client.task.findMany({
      where: {
        responsibleId: currentUserCtx.get().id,
        updatedAt: fetchOptions?.updatedAfter != null ? { gt: fetchOptions.updatedAfter } : undefined,
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
        values: new ExMap(
          group.valuesByTask.toArray(
            (k2v, taskId) =>
              [
                newIdsReplacements.get(taskId) ?? taskId,
                k2v.toArray((value, key) => getTypedChange(key, JSON.parse(value), newIdsReplacements)),
              ] as const
          )
        ),
      }));

      const allValues = sortBy(
        preparedGroups.flatMap(group =>
          group.values
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

      const updatesByTaskId = ExMap.groupedBy(allValues, value => value.taskId);

      const newLastByTaskId = updatesByTaskId.mapEntries(values => {
        const u = new ExMap<TaskHistoryKey, { part: ReturnType<typeof getTypedChange>; createdAt: Date }>();
        for (const value of values) {
          u.set(value.key, { part: value, createdAt: value.group.createdAt });
        }
        return u;
      });

      const curLastByTaskId = await this.getLastFieldsValuesFromHistory(existingIds);

      const user = currentUserCtx.get();

      await Promise.all([
        ...newLastByTaskId
          .toArray((newFields, taskId) => {
            const curFields = curLastByTaskId.get(taskId);
            const collector = taskUpdateCollector(taskId);
            if (curFields) {
              for (const [field, { createdAt, part }] of newFields.entries()) {
                const cur = curFields?.get(field);
                if (cur == null || cur.createdAt.getTime() < createdAt.getTime()) {
                  collector.addPart(part);
                }
              }
            } else {
              for (const { part } of newFields.values()) {
                collector.addPart(part);
              }
            }
            if (newIds.has(taskId)) {
              return this.db.transaction.task.create({
                data: { ...collector.create, updatedAt: new Date() },
              });
            }
            if (collector.hasChanges) {
              return this.db.transaction.task.update({
                where: { id: taskId },
                data: { ...collector.update, updatedAt: new Date() },
              });
            }
            return undefined;
          })
          .filter(isTruthy),

        ...preparedGroups
          .map(group =>
            this.db.transaction.taskHistoryGroup.create({
              data: {
                author: { connect: { id: user.id } },
                localCreatedAt: group.localCreatedAt,
                createdAt: group.createdAt,
                createdAtFixReason: group.createdAtFixReason,
                values: {
                  createMany: {
                    data: group.values
                      .toArray((values, taskId) =>
                        values.map(value => ({
                          taskId,
                          key: value.key,
                          value: value.value != null ? value.value : JsonNull,
                        }))
                      )
                      .flat(),
                  },
                },
              },
            })
          )
          .flat(),
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
            valuesByTask: ExMap.groupedBy(group.updates, u => u.taskId).mapEntries(
              updates => new ExMap(updates.map(update => [update.field, update.stringValue] as const))
            ),
          }) as const
      )
    );
    return {
      changedIds: newIdsReplacements.toArray((persistent, temp) => ({ src: temp, dst: persistent })),
    };
  }
}
