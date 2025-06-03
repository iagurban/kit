import { Field, Float, InputType } from '@nestjs/graphql';

import { TaskState } from '../prisma/task-state.enum';
import { TaskHistoryGroupCreateNestedManyWithoutTaskInput } from '../task-history-group/task-history-group-create-nested-many-without-task.input';
import { UserCreateNestedOneWithoutAssignedTasksInput } from '../user/user-create-nested-one-without-assigned-tasks.input';
import { UserCreateNestedOneWithoutAuthoredTasksInput } from '../user/user-create-nested-one-without-authored-tasks.input';
import { TaskCreateNestedManyWithoutParentInput } from './task-create-nested-many-without-parent.input';
import { TaskCreateNestedOneWithoutChildrenInput } from './task-create-nested-one-without-children.input';

@InputType()
export class TaskCreateInput {
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

  @Field(() => Date, { nullable: true })
  startAfter?: Date | string;

  @Field(() => Date, { nullable: true })
  plannedStart?: Date | string;

  @Field(() => Date, { nullable: true })
  dueTo?: Date | string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => UserCreateNestedOneWithoutAuthoredTasksInput, { nullable: false })
  author!: UserCreateNestedOneWithoutAuthoredTasksInput;

  @Field(() => UserCreateNestedOneWithoutAssignedTasksInput, { nullable: true })
  responsible?: UserCreateNestedOneWithoutAssignedTasksInput;

  @Field(() => TaskCreateNestedOneWithoutChildrenInput, { nullable: true })
  parent?: TaskCreateNestedOneWithoutChildrenInput;

  @Field(() => TaskCreateNestedManyWithoutParentInput, { nullable: true })
  children?: TaskCreateNestedManyWithoutParentInput;

  @Field(() => TaskHistoryGroupCreateNestedManyWithoutTaskInput, { nullable: true })
  historyGroups?: TaskHistoryGroupCreateNestedManyWithoutTaskInput;
}
