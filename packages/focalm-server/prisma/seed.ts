import { ExMap, isDefined, notNull, samplesBy, uidGenerator } from '@freyja/kit/src';
import { Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { $Enums, Task } from '../src/generated/db-client';
import { manualSort } from '../src/manual-sort';
import { hashing } from '../src/modules/auth/auth.service';
import { DbModule } from '../src/modules/db/db.module';
import { DbService } from '../src/modules/db/db.service';
import { TasksModule } from '../src/modules/tasks/tasks.module';
import { PreparedTaskChangesGroup, TasksService } from '../src/modules/tasks/tasks.service';
import TaskHistoryKey = $Enums.TaskHistoryKey;

import { CurrentUser } from '../src/decorators/current-user';
import { currentUserCtx } from '../src/interceptors/current-user-context';

console.log(`[started]`);

const enchanceWithOrder = <T>(o: readonly T[]): (T & { orderKey: string })[] => {
  const keys = manualSort.getNewKeys(o.length);
  return o.map((v, i) => ({ ...v, orderKey: keys[i] }) as const);
};

@Injectable()
export class AppService {
  constructor(
    readonly db: DbService,
    readonly tasks: TasksService
  ) {}

  async createTasks(
    data: ({ title: string } & Partial<Pick<Task, `state` | `responsibleId`>>)[],
    user: CurrentUser
  ) {
    return currentUserCtx.run(user, async () => {
      const keys = manualSort.getNewKeys(data.length);
      const tmpIds = samplesBy(data.length, () => `!!NEW:${uidGenerator()}`);
      const updates: PreparedTaskChangesGroup[] = [];
      const f = (key: TaskHistoryKey, value: unknown): [TaskHistoryKey, string] => [
        key,
        JSON.stringify(value),
      ];
      for (const [idx, { title, state, responsibleId }] of data.entries()) {
        const taskId = tmpIds[idx];
        updates.push({
          createdAt: new Date(),
          localCreatedAt: new Date(),
          valuesByTask: new ExMap<string, ExMap<TaskHistoryKey, string>>([
            [
              taskId,
              new ExMap(
                [
                  f(TaskHistoryKey.authorId, user.id),
                  f(TaskHistoryKey.responsibleId, user.id),
                  f(TaskHistoryKey.title, title),
                  f(TaskHistoryKey.orderKey, keys[idx]),
                  f(TaskHistoryKey.startAfterDate, new Date().toISOString().split('T')[0]),
                  state !== undefined ? f(TaskHistoryKey.state, state) : undefined,
                  responsibleId !== undefined ? f(TaskHistoryKey.responsibleId, responsibleId) : undefined,
                ].filter(isDefined)
              ),
            ],
          ]),
        });
      }
      const { newIdsReplacements } = await this.tasks.applyChanges(updates);
      return tmpIds.map(tmpId =>
        notNull(newIdsReplacements.get(tmpId), () => `created id not found: ${tmpId}`)
      );
    });
  }

  async createAdmin() {
    const data = {
      name: `admin`,
      email: `admin@google.com`,
      passwordHash: await hashing.hash(`pass`),
    } as const;

    return this.db.transaction.user.upsert({
      where: { email: data.email },
      create: data,
      update: data,
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
      },
    });
  }

  async seed() {
    const me = await this.createAdmin();

    await this.db.transaction.task.deleteMany({ where: { authorId: me.id } });

    const createdIds = await this.createTasks(
      [
        { title: `Time tracking` },
        { title: `Focus mode` },
        { title: `Adding new tasks` },
        { title: `Expanding tabs on hover` },
        { title: `Projects` },
        { title: `Saving to indexed db` },
        { title: `SW` },
        { title: `Fix refreshing token` },
        {
          title: `'ready'-flag for updating packages - if update has temp-ids for not persisted new tasks, it's not ready until id exchanged to persitent`,
        },
      ],
      me
    );

    console.log(createdIds);
    console.log(await this.db.client.task.findMany({}));
  }
}

@Module({
  imports: [DbModule, TasksModule],
  providers: [AppService, TasksService],
})
export class AppModule {}

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.get(AppService).seed();
})()
  .finally(async () => {
    console.log(`[finished]`);
  })
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(255);
  });
