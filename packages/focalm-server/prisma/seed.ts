import { Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { $Enums, Task, TaskState } from '../src/generated/db-client';
import { currentUserCtx } from '../src/interceptors/current-user-context';
import { manualSort } from '../src/manual-sort';
import { hashing } from '../src/modules/auth/auth.service';
import { DbModule } from '../src/modules/db/db.module';
import { DbService } from '../src/modules/db/db.service';
import { TasksModule } from '../src/modules/tasks/tasks.module';
import { PreparedTaskChangesGroup, TasksService } from '../src/modules/tasks/tasks.service';
import TaskHistoryKey = $Enums.TaskHistoryKey;
import { generateNewTaskId } from '@focalm/core/src/const';
import { ExMap } from '@gurban/kit/collections/ex-map';
import { isDefined } from '@gurban/kit/core/checks';
import { samplesBy } from '@gurban/kit/utils/array-utils';
import { notNull } from '@gurban/kit/utils/flow-utils';

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
    user: {
      id: string;
      name: string;
      email: string;
      passwordHash: string;
      ownProjectId: string;
    }
  ) {
    return currentUserCtx.run(user, async () => {
      const keys = manualSort.getNewKeys(data.length);
      const tmpIds = samplesBy(data.length, () => generateNewTaskId());
      const updates: PreparedTaskChangesGroup[] = [];
      const f = (key: TaskHistoryKey, value: unknown) => ({
        key,
        stringValue: JSON.stringify(value),
      });
      for (const [idx, { title, state, responsibleId }] of data.entries()) {
        const taskId = tmpIds[idx];
        updates.push({
          createdAt: new Date(),
          localCreatedAt: new Date(),
          valuesByTask: new ExMap<string, readonly { key: TaskHistoryKey; stringValue: string }[]>([
            [
              taskId,
              [
                f(TaskHistoryKey.authorId, user.id),
                f(TaskHistoryKey.projectId, user.ownProjectId),
                f(TaskHistoryKey.responsibleId, user.id),
                f(TaskHistoryKey.title, title),
                f(TaskHistoryKey.orderKey, keys[idx]),
                f(TaskHistoryKey.startAfterDate, new Date().toISOString().split('T')[0]),
                state !== undefined ? f(TaskHistoryKey.state, state) : undefined,
                responsibleId !== undefined ? f(TaskHistoryKey.responsibleId, responsibleId) : undefined,
              ].filter(isDefined),
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

  async createUsers() {
    const entries = await Promise.all(
      (
        [
          { name: `admin`, email: `admin@google.com`, abbrev: `[A]` },
          { name: `John Locke`, email: `john.locke@google.com`, abbrev: `JL` },
          { name: `Jack Shephard`, email: `jack.shephard@google.com`, abbrev: `JS` },
          { name: `Kate Austen`, email: `kate.austen@google.com`, abbrev: `KA` },
          { name: `James "Sawyer" Ford`, email: `james.ford@google.com`, abbrev: `JF` },
          { name: `Sayid Jarrah`, email: `sayid.jarrah@google.com`, abbrev: `SJ` },
          { name: `Hurley Reyes`, email: `hurley.reyes@google.com`, abbrev: `HR` },
          { name: `Charlie Pace`, email: `charlie.pace@google.com`, abbrev: `CP` },
          { name: `Claire Littleton`, email: `claire.littleton@google.com`, abbrev: `CL` },
          { name: `Jin-Soo Kwon`, email: `jin.kwon@google.com`, abbrev: `JK` },
          { name: `Sun-Hwa Kwon`, email: `sun.kwon@google.com`, abbrev: `SK` },
          { name: `Michael Dawson`, email: `michael.dawson@google.com`, abbrev: `MD` },
          { name: `Walt Lloyd`, email: `walt.lloyd@google.com`, abbrev: `WL` },
          { name: `Boone Carlyle`, email: `boone.carlyle@google.com`, abbrev: `BC` },
          { name: `Shannon Rutherford`, email: `shannon.rutherford@google.com`, abbrev: `SR` },
          { name: `Desmond Hume`, email: `desmond.hume@google.com`, abbrev: `DH` },
          { name: `Juliet Burke`, email: `juliet.burke@google.com`, abbrev: `JB` },
          { name: `Benjamin Linus`, email: `benjamin.linus@google.com`, abbrev: `BL` },
          { name: `Richard Alpert`, email: `richard.alpert@google.com`, abbrev: `RA` },
        ] as const
      ).map(async u => ({ ...u, passwordHash: await hashing.hash(`pass`) }))
    );

    return Promise.all(
      entries.map(data =>
        this.db.transaction.user.upsert({
          where: { email: data.email },
          create: { ...data, ownProject: { create: { name: `@personal` } } },
          update: data,
          select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            ownProjectId: true,
          },
        })
      )
    );
  }

  async seed() {
    const [me] = await this.createUsers();

    for (const v of [
      { name: `programmer`, color: `#070` },
      { name: `designer`, color: `#500` },
      { name: `tester`, color: `#008` },
    ]) {
      if (
        !(await this.db.transaction.participantRole.findFirst({
          where: { name: v.name },
        }))
      ) {
        await this.db.transaction.participantRole.create({
          data: v,
          select: { id: true },
        });
      }
    }

    await this.db.transaction.task.deleteMany({ where: { authorId: me.id } });

    const createdIds = await this.createTasks(
      [
        { title: `Time tracking` },
        { title: `Focus mode` },
        { title: `Adding new tasks`, state: TaskState.Done },
        { title: `Expanding tabs on hover`, state: TaskState.Done },
        { title: `Projects`, state: TaskState.Done },
        { title: `Saving to indexed db` },
        { title: `SW` },
        { title: `Fix refreshing token`, state: TaskState.Done },
        {
          title: `'ready'-flag for updating packages - if update has temp-ids for not persisted new tasks, it's not ready until id exchanged to persitent`,
        },
        { title: `fix tags->roles moving (now its not saving)` },
        { title: `Entering other parameters from command line` },
        { title: `Use mantine control center (by double shift) (or going bottom by double shift)` },
        { title: `Use mobx stuff for selectors instead of hooks` },
        { title: `Disappearing on the front of tasks, an access to which has been lost` },
      ],
      me
    );

    await currentUserCtx.run(me, async () => {
      const relationsTypes = await Promise.all(
        [{ forward: `releases`, inverse: `released in` }].map(
          async d =>
            (await this.db.transaction.taskToTaskRelationType.findFirst({
              where: { projectId: me.ownProjectId, forward: d.forward },
            })) ||
            (await this.db.transaction.taskToTaskRelationType.create({
              data: { ...d, projectId: me.ownProjectId },
            }))
        )
      );

      await this.tasks.applyChanges([
        {
          createdAt: new Date(),
          localCreatedAt: new Date(),
          valuesByTask: new ExMap<string, readonly { key: TaskHistoryKey; stringValue: string }[]>([
            [
              createdIds[0],
              [
                {
                  key: TaskHistoryKey.relations,
                  stringValue: JSON.stringify({
                    action: `+`,
                    srcId: createdIds[0],
                    dstId: createdIds[1],
                    typeId: relationsTypes[0].id,
                  }),
                },
              ],
            ],
          ]),
        },
      ]);
    });

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
