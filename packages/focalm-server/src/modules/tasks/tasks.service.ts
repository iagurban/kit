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
import { reverse, sortBy } from 'lodash';

import { $Enums, Prisma, TaskHistoryKey, TaskState } from '../../generated/db-client';
import { DbService } from '../db/db.service';

import JsonValue = Prisma.JsonValue;
import TaskUpdateArgs = Prisma.TaskUpdateArgs;
import TaskCreateArgs = Prisma.TaskCreateArgs;
import JsonNull = Prisma.JsonNull;
import TransactionIsolationLevel = Prisma.TransactionIsolationLevel;
import CreatedAtFixReason = $Enums.CreatedAtFixReason;
import { Task } from '../../generated/nestgraphql/task/task.model';
import { UsersService } from '../users/users.service';
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
  values: ExMap<TaskHistoryKey, string /* JSON */>;
};

@Injectable()
export class TasksService {
  constructor(
    readonly db: DbService,
    readonly usersService: UsersService
  ) {}

  async getTasks(select?: Prisma.TaskSelect, fetchOptions?: FetchAllTasksOptionsInput): Promise<Task[]> {
    return this.db.client.task.findMany({
      where: {
        responsibleId: this.usersService.contextUser.id,
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
        where: { group: { task: { id: { in: ids } } } },
        select: { key: true, value: true, group: { select: { taskId: true, createdAt: true } } },
        orderBy: [{ taskId: `asc` }, { key: `asc` }, { group: { createdAt: 'desc' } }],
        distinct: [`taskId`, `key`],
      }),
      v => v.group.taskId
    ).mapEntries(e =>
      ExMap.mappedBy(e, e => e.key).mapEntries(e => ({
        value: e.value,
        createdAt: e.group.createdAt,
      }))
    );
  }

  async getNewIdsReplacements(changes: ExMap<string, unknown>) {
    const allIds = [...new Set(changes.keys())];
    const split = ExMap.groupedBy(allIds, id => id.startsWith(`!!NEW:`));
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
   * @param user
   */
  async applyChanges(changes: ExMap<string /* task id */, readonly PreparedTaskChangesGroup[]>) {
    return this.db.inAnyTransaction({ isolationLevel: TransactionIsolationLevel.Serializable }, async () => {
      const { newIdsReplacements, existingIds, newIds } = await this.getNewIdsReplacements(changes);

      const updatesByTaskId = new ExMap(
        Array.from(
          changes.entries(),
          ([id, groups]) =>
            [
              newIdsReplacements.get(id) ?? id,
              reverse(
                sortBy(
                  groups.map(g => ({
                    localCreatedAt: g.localCreatedAt,
                    ...trimCreatedAt(g.createdAt, g.createdAtFixReason),
                    values: g.values.toArray((value, key) =>
                      getTypedChange(key, JSON.parse(value), newIdsReplacements)
                    ),
                  })),
                  e => e.createdAt.getTime()
                )
              ),
            ] as const
        )
      );

      const newLastByTaskId = updatesByTaskId.mapEntries(groups => {
        const u = new ExMap<TaskHistoryKey, { part: ReturnType<typeof getTypedChange>; createdAt: Date }>();
        for (const group of groups) {
          for (const value of group.values) {
            u.set(value.key, { part: value, createdAt: group.createdAt });
          }
        }
        return u;
      });

      const curLastByTaskId = await this.getLastFieldsValuesFromHistory(existingIds);

      const user = this.usersService.contextUser;

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

        ...updatesByTaskId
          .toArray((groups, taskId) =>
            groups.map(group =>
              this.db.transaction.taskHistoryGroup.create({
                data: {
                  task: { connect: { id: taskId } },
                  author: { connect: { id: user.id } },
                  localCreatedAt: group.localCreatedAt,
                  createdAt: group.createdAt,
                  createdAtFixReason: group.createdAtFixReason,
                  values: {
                    createMany: {
                      data: group.values.map(value => ({
                        taskId,
                        key: value.key,
                        value: value.value != null ? value.value : JsonNull,
                      })),
                    },
                  },
                },
              })
            )
          )
          .flat(),
      ]);
      return { newIdsReplacements, existingIds };
    });
  }

  async updateTasks(changes: TasksChangesGroup[]) {
    const { newIdsReplacements } = await this.applyChanges(
      ExMap.groupedBy(changes, c => c.id).mapEntries(groups =>
        groups.map(
          group =>
            ({
              createdAt: group.createdAt,
              localCreatedAt: group.localCreatedAt,
              createdAtFixReason: group.createdAtFixReason,
              values: new ExMap(group.updates.map(update => [update.field, update.stringValue])),
            }) as const
        )
      )
    );
    return {
      changedIds: newIdsReplacements.toArray((persistent, temp) => ({ src: temp, dst: persistent })),
    };
  }
}
