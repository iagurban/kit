import { Field, Float, InputType, Int } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskState } from '../prisma/task-state.enum';
import { ProjectCreateNestedOneWithoutTasksInput } from '../project/project-create-nested-one-without-tasks.input';
import { TaskHistoryValueCreateNestedManyWithoutTaskInput } from '../task-history-value/task-history-value-create-nested-many-without-task.input';
import { TaskToTaskRelationCreateNestedManyWithoutDstInput } from '../task-to-task-relation/task-to-task-relation-create-nested-many-without-dst.input';
import { TaskToTaskRelationCreateNestedManyWithoutSrcInput } from '../task-to-task-relation/task-to-task-relation-create-nested-many-without-src.input';
import { UserCreateNestedOneWithoutAssignedTasksInput } from '../user/user-create-nested-one-without-assigned-tasks.input';
import { UserCreateNestedOneWithoutAuthoredTasksInput } from '../user/user-create-nested-one-without-authored-tasks.input';
import { UserInTaskCreateNestedManyWithoutTaskInput } from '../user-in-task/user-in-task-create-nested-many-without-task.input';
import { TaskCreateNestedManyWithoutParentInput } from './task-create-nested-many-without-parent.input';

@InputType()
export class TaskCreateWithoutParentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { nullable: true })
  state?: `${TaskState}`;

  @Field(() => Boolean, { nullable: true })
  archived?: boolean;

  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  startAfterDate?: Date | string;

  @Field(() => Int, { nullable: true })
  startAfterOffset?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  plannedStartDate?: Date | string;

  @Field(() => Int, { nullable: true })
  plannedStartOffset?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  dueToDate?: Date | string;

  @Field(() => Int, { nullable: true })
  dueToOffset?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => GraphQLJSON, { nullable: true })
  description?: any;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => String, { nullable: false })
  nnInProject!: bigint | number;

  @Field(() => UserCreateNestedOneWithoutAuthoredTasksInput, { nullable: false })
  author!: UserCreateNestedOneWithoutAuthoredTasksInput;

  @Field(() => UserCreateNestedOneWithoutAssignedTasksInput, { nullable: true })
  responsible?: UserCreateNestedOneWithoutAssignedTasksInput;

  @Field(() => TaskCreateNestedManyWithoutParentInput, { nullable: true })
  children?: TaskCreateNestedManyWithoutParentInput;

  @Field(() => UserInTaskCreateNestedManyWithoutTaskInput, { nullable: true })
  participants?: UserInTaskCreateNestedManyWithoutTaskInput;

  @Field(() => TaskHistoryValueCreateNestedManyWithoutTaskInput, { nullable: true })
  historyValues?: TaskHistoryValueCreateNestedManyWithoutTaskInput;

  @Field(() => TaskToTaskRelationCreateNestedManyWithoutSrcInput, { nullable: true })
  relationsSrc?: TaskToTaskRelationCreateNestedManyWithoutSrcInput;

  @Field(() => TaskToTaskRelationCreateNestedManyWithoutDstInput, { nullable: true })
  relationsDst?: TaskToTaskRelationCreateNestedManyWithoutDstInput;

  @Field(() => ProjectCreateNestedOneWithoutTasksInput, { nullable: false })
  project!: ProjectCreateNestedOneWithoutTasksInput;
}
