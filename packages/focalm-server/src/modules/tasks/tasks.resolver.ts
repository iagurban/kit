import { ExSet, isDefined } from '@freyja/kit/src';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/current-user';
import { PrismaSelection } from '../../decorators/prisma-selection';
import { Prisma } from '../../generated/db-client';
import { Task } from '../../generated/nestgraphql/task/task.model';
import { User } from '../../generated/nestgraphql/user/user.model';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { ContextualCurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { currentUserCtx } from '../../interceptors/current-user-context';
import { UsersService } from '../users/users.service';
import { FetchAllTasksOptionsInput } from './fetch-all-tasks-options-input';
import { TasksService } from './tasks.service';
import { TasksChangesGroup } from './tasks-changes-group';

@ObjectType()
class IDMapping {
  @Field(() => String)
  src!: string;

  @Field(() => String)
  dst!: string;
}

@ObjectType()
class TasksUpdateResult {
  @Field(() => [IDMapping])
  changedIds!: IDMapping[];
}

@ObjectType()
class TasksWithRelatedStuff {
  @Field(() => [Task])
  tasks!: Task[];
}

@Resolver(() => TasksWithRelatedStuff)
export class TasksWithRelatedStuffResolver {
  constructor(
    // readonly tasksService: TasksService,
    readonly usersService: UsersService
  ) {}

  @ResolveField(() => [User])
  async relatedUsers(
    @Root() self: TasksWithRelatedStuff,
    @CurrentUser() user: CurrentUser,
    @PrismaSelection({
      skip: [
        /* UserResolver.dynamicFields */
      ],
    })
    select?: Prisma.UserSelect
  ): Promise<User[]> {
    const ids = new ExSet(
      self.tasks.flatMap(t =>
        [
          t.responsibleId,
          t.responsible?.id,
          t.authorId,
          t.author?.id,
          ...(t.participants?.flatMap(p => [p.userId, p.user?.id]) || []),
        ].filter(isDefined)
      )
    );
    return this.usersService.getUsers({ where: { id: { in: [...ids] } }, select });
  }
}

@Resolver(() => Task)
export class TasksResolver {
  static readonly dynamicFields = [] as const;

  constructor(
    readonly tasksService: TasksService
    // readonly usersService: UsersService
  ) {}

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ContextualCurrentUserInterceptor)
  @Mutation(() => TasksUpdateResult)
  async updateTasks(
    @Args(`changes`, { type: () => [TasksChangesGroup] }) changes: TasksChangesGroup[]
  ): Promise<TasksUpdateResult> {
    // console.log(`updateTasks: ${changes.length} changes, user:`, currentUserCtx.get());
    return this.tasksService.updateTasks(changes);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ContextualCurrentUserInterceptor)
  @Query(() => TasksWithRelatedStuff)
  async tasks(
    @PrismaSelection({ path: [`tasks`], skip: TasksResolver.dynamicFields }) select?: Prisma.TaskSelect,
    @Args({ type: () => FetchAllTasksOptionsInput, nullable: true })
    fetchOptions?: FetchAllTasksOptionsInput
  ): Promise<TasksWithRelatedStuff> {
    return {
      tasks: await this.tasksService.getTasks(select, fetchOptions),
    };
  }
}

@Resolver(() => TasksUpdateResult)
export class TasksUpdateResultResolver {
  constructor(
    readonly tasksService: TasksService
    // readonly usersService: UsersService
  ) {}

  @ResolveField(() => TasksWithRelatedStuff)
  async tasks(
    @CurrentUser() user: CurrentUser,

    @PrismaSelection({ path: [`tasks`], skip: TasksResolver.dynamicFields }) select?: Prisma.TaskSelect,
    @Args({ type: () => FetchAllTasksOptionsInput, nullable: true })
    fetchOptions?: FetchAllTasksOptionsInput
  ): Promise<TasksWithRelatedStuff> {
    return currentUserCtx.run(user, async () => {
      return {
        tasks: await this.tasksService.getTasks(select, fetchOptions),
      };
    });
  }
}
