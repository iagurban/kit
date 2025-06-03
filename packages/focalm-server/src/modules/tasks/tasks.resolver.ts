import { UseGuards } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/current-user';
import { PrismaSelection } from '../../decorators/prisma-selection';
import { Prisma } from '../../generated/db-client';
import { Task } from '../../generated/nestgraphql/task/task.model';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
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

@Resolver(() => Task)
export class TasksResolver {
  static readonly dynamicFields = [] as const;

  constructor(
    readonly tasksService: TasksService,
    readonly usersService: UsersService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Task])
  async tasks(
    @CurrentUser() user: CurrentUser,
    @PrismaSelection({ skip: TasksResolver.dynamicFields }) select?: Prisma.TaskSelect,
    @Args({ type: () => FetchAllTasksOptionsInput, nullable: true })
    fetchOptions?: FetchAllTasksOptionsInput
  ): Promise<Task[]> {
    return this.usersService.withContextUser(user, () => this.tasksService.getTasks(select, fetchOptions));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TasksUpdateResult)
  async updateTasks(
    @CurrentUser() user: CurrentUser,
    @Args(`changes`, { type: () => [TasksChangesGroup] }) changes: TasksChangesGroup[]
  ): Promise<TasksUpdateResult> {
    return this.usersService.withContextUser(user, () => this.tasksService.updateTasks(changes));
  }
}

@Resolver(() => TasksUpdateResult)
export class TasksUpdateResultResolver {
  constructor(
    readonly tasksService: TasksService,
    readonly usersService: UsersService
  ) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => [Task])
  async tasks(
    @CurrentUser() user: CurrentUser,
    @PrismaSelection({ skip: TasksResolver.dynamicFields }) select?: Prisma.TaskSelect,
    @Args({ type: () => FetchAllTasksOptionsInput, nullable: true })
    fetchOptions?: FetchAllTasksOptionsInput
  ): Promise<Task[]> {
    return this.usersService.withContextUser(user, () => this.tasksService.getTasks(select, fetchOptions));
  }
}
